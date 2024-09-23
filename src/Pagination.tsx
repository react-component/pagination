import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import KeyCode from 'rc-util/lib/KeyCode';
import pickAttrs from 'rc-util/lib/pickAttrs';
import warning from 'rc-util/lib/warning';
import React, { useEffect, useRef, useState } from 'react';
import type { PaginationProps } from './interface';
import zhCN from './locale/zh_CN';
import Options from './Options';
import type { PagerProps } from './Pager';
import Pager from './Pager';

const defaultItemRender: PaginationProps['itemRender'] = (
  page,
  type,
  element,
) => element;

const noop = () => {};

const isInteger = (v: number) => {
  const value = Number(v);
  return !Number.isNaN(value) && isFinite(value) && Math.floor(value) === value;
};

const calculatePage = (
  p: number | undefined,
  pageSize: number,
  total: number,
) => {
  const _pageSize = p ?? pageSize;
  return Math.floor((total - 1) / _pageSize) + 1;
};

const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    prefixCls = 'rc-pagination',
    selectPrefixCls = 'rc-select',
    className,
    selectComponentClass,
    current: currentProp,
    defaultCurrent = 1,
    total = 0,
    pageSize: pageSizeProp,
    defaultPageSize = 10,
    onChange = noop,
    hideOnSinglePage,
    align,
    showPrevNextJumpers = true,
    showQuickJumper,
    showLessItems,
    showTitle = true,
    onShowSizeChange = noop,
    locale = zhCN,
    style,
    totalBoundaryShowSizeChanger = 50,
    disabled,
    simple,
    showTotal,
    showSizeChanger = total > totalBoundaryShowSizeChanger,
    pageSizeOptions,
    itemRender = defaultItemRender,
    jumpPrevIcon,
    jumpNextIcon,
    prevIcon,
    nextIcon,
  } = props;

  const paginationRef = useRef<HTMLUListElement>(null);
  const [pageSize, setPageSize] = useMergedState<number>(defaultPageSize, {
    value: pageSizeProp,
    defaultValue: defaultPageSize,
  });

  const [current, setCurrent] = useMergedState<number>(defaultCurrent, {
    value: currentProp,
    defaultValue: defaultCurrent,
    postState: (c) =>
      Math.max(1, Math.min(c, calculatePage(undefined, pageSize, total))),
  });

  const [internalInputVal, setInternalInputVal] = useState(current);

  useEffect(() => {
    setInternalInputVal(current);
  }, [current]);

  const hasOnChange = onChange !== noop;
  const hasCurrent = 'current' in props;

  if (process.env.NODE_ENV !== 'production') {
    warning(
      hasCurrent ? hasOnChange : true,
      'You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.',
    );
  }

  const jumpPrevPage = Math.max(1, current - (showLessItems ? 3 : 5));
  const jumpNextPage = Math.min(
    calculatePage(undefined, pageSize, total),
    current + (showLessItems ? 3 : 5),
  );

  const getItemIcon = (
    icon: React.ReactNode | React.ComponentType<PaginationProps>,
    label: string,
  ) => {
    let iconNode = icon || (
      <button
        type="button"
        aria-label={label}
        className={`${prefixCls}-item-link`}
      />
    );
    if (typeof icon === 'function') {
      iconNode = React.createElement<PaginationProps>(icon, { ...props });
    }
    return iconNode as React.ReactNode;
  };

  const getValidValue = (e: React.ChangeEvent<HTMLInputElement>): number => {
    const inputValue = e.target.value;
    const allPages = calculatePage(undefined, pageSize, total);

    if (inputValue === '') {
      return 1; // 返回1作为默认值
    }

    const parsedValue = Number(inputValue);

    if (isNaN(parsedValue)) {
      return internalInputVal; // 返回内部值
    }

    return Math.min(Math.max(parsedValue, 1), allPages); // 限制在有效范围内
  };

  const isValid = (page: number) =>
    isInteger(page) && page !== current && isInteger(total) && total > 0;

  const handleChange = (page: number) => {
    if (isValid(page) && !disabled) {
      const currentPage = calculatePage(undefined, pageSize, total);
      const newPage = Math.max(1, Math.min(page, currentPage));

      if (newPage !== internalInputVal) {
        setInternalInputVal(newPage);
      }

      setCurrent(newPage);
      onChange?.(newPage, pageSize);

      return newPage;
    }

    return current;
  };

  const shouldDisplayQuickJumper = total > pageSize ? showQuickJumper : false;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === KeyCode.UP || event.keyCode === KeyCode.DOWN) {
      event.preventDefault();
    }
  };

  const handleKeyUp = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = getValidValue(event);
    if (value !== internalInputVal) {
      setInternalInputVal(value);
    }

    const keyActions: { [key: number]: () => void } = {
      [KeyCode.ENTER]: () => handleChange(value),
      [KeyCode.UP]: () => handleChange(value - 1),
      [KeyCode.DOWN]: () => handleChange(value + 1),
    };

    (
      keyActions[(event as React.KeyboardEvent<HTMLInputElement>).keyCode] ||
      (() => {})
    )();
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    handleChange(getValidValue(event));
  };

  const changePageSize = (size: number) => {
    const newCurrent = calculatePage(size, pageSize, total);
    const nextCurrent =
      current > newCurrent && newCurrent !== 0 ? newCurrent : current;

    setPageSize(size);
    setInternalInputVal(nextCurrent);
    onShowSizeChange?.(current, size);
    setCurrent(nextCurrent);
    onChange?.(nextCurrent, size);
  };

  const hasPrev = current > 1;
  const hasNext = current < calculatePage(undefined, pageSize, total);

  const prevHandle = () => hasPrev && handleChange(current - 1);
  const nextHandle = () => hasNext && handleChange(current + 1);
  const jumpPrevHandle = () => handleChange(jumpPrevPage);
  const jumpNextHandle = () => handleChange(jumpNextPage);

  const runIfEnter = (
    event: React.KeyboardEvent<HTMLLIElement>,
    callback: () => void,
    ...restParams: any[]
  ) => {
    if (
      event.key === 'Enter' ||
      event.charCode === KeyCode.ENTER ||
      event.keyCode === KeyCode.ENTER
    ) {
      callback(...restParams);
    }
  };

  const runIfEnterPrev = (event: React.KeyboardEvent<HTMLLIElement>) =>
    runIfEnter(event, prevHandle);
  const runIfEnterNext = (event: React.KeyboardEvent<HTMLLIElement>) =>
    runIfEnter(event, nextHandle);
  const runIfEnterJumpPrev = (event: React.KeyboardEvent<HTMLLIElement>) =>
    runIfEnter(event, jumpPrevHandle);
  const runIfEnterJumpNext = (event: React.KeyboardEvent<HTMLLIElement>) =>
    runIfEnter(event, jumpNextHandle);

  const renderPrev = (prevPage: number) => {
    const prevButton = itemRender(
      prevPage,
      'prev',
      getItemIcon(prevIcon, 'prev page'),
    );
    return React.isValidElement(prevButton)
      ? React.cloneElement(prevButton, { disabled: !hasPrev })
      : prevButton;
  };

  const renderNext = (nextPage: number) => {
    const nextButton = itemRender(
      nextPage,
      'next',
      getItemIcon(nextIcon, 'next page'),
    );
    return React.isValidElement(nextButton)
      ? React.cloneElement(nextButton, { disabled: !hasNext })
      : nextButton;
  };

  const handleGoTO = (event: any) => {
    if (event.type === 'click' || event.keyCode === KeyCode.ENTER) {
      handleChange(internalInputVal);
    }
  };

  let jumpPrev: React.ReactElement | null = null;
  let jumpNext: React.ReactElement | null = null;

  const dataOrAriaAttributeProps = pickAttrs(props, { aria: true, data: true });

  const totalText = showTotal && (
    <li className={`${prefixCls}-total-text`}>
      {showTotal(total, [
        total === 0 ? 0 : (current - 1) * pageSize + 1,
        current * pageSize > total ? total : current * pageSize,
      ])}
    </li>
  );

  const allPages = calculatePage(undefined, pageSize, total);

  if (hideOnSinglePage && total <= pageSize) {
    return null;
  }

  const pagerList: React.ReactElement<PagerProps>[] = [];
  const pagerProps: PagerProps = {
    rootPrefixCls: prefixCls,
    onClick: handleChange,
    onKeyPress: runIfEnter,
    showTitle,
    itemRender,
    page: -1,
  };

  const prevPage = current - 1 > 0 ? current - 1 : 0;
  const nextPage = current + 1 < allPages ? current + 1 : allPages;
  const goButton = showQuickJumper && (showQuickJumper as any).goButton;

  const isReadOnly = typeof simple === 'object' ? simple.readOnly : !simple;
  let gotoButton: any = goButton;
  let simplePager: React.ReactNode = null;

  if (simple) {
    gotoButton = goButton ? (
      typeof goButton === 'boolean' ? (
        <button type="button" onClick={handleGoTO} onKeyUp={handleGoTO}>
          {locale.jump_to_confirm}
        </button>
      ) : (
        <span onClick={handleGoTO} onKeyUp={handleGoTO}>
          {goButton}
        </span>
      )
    ) : null;

    gotoButton = (
      <li
        title={showTitle ? `${locale.jump_to}${current}/${allPages}` : null}
        className={`${prefixCls}-simple-pager`}
      >
        {gotoButton}
      </li>
    );

    simplePager = (
      <li
        title={showTitle ? `${current}/${allPages}` : null}
        className={`${prefixCls}-simple-pager`}
      >
        {isReadOnly ? (
          internalInputVal
        ) : (
          <input
            type="text"
            value={internalInputVal}
            disabled={disabled}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onChange={handleKeyUp}
            onBlur={handleBlur}
            size={3}
          />
        )}
        <span className={`${prefixCls}-slash`}>/</span>
        {allPages}
      </li>
    );
  }

  const pageBufferSize = showLessItems ? 1 : 2;
  if (allPages <= 3 + pageBufferSize * 2) {
    if (!allPages) {
      pagerList.push(
        <Pager
          {...pagerProps}
          key="noPager"
          page={1}
          className={`${prefixCls}-item-disabled`}
        />,
      );
    }

    for (let i = 1; i <= allPages; i += 1) {
      pagerList.push(
        <Pager {...pagerProps} key={i} page={i} active={current === i} />,
      );
    }
  } else {
    const prevItemTitle = showLessItems ? locale.prev_3 : locale.prev_5;
    const nextItemTitle = showLessItems ? locale.next_3 : locale.next_5;

    const jumpPrevContent = itemRender(
      jumpPrevPage,
      'jump-prev',
      getItemIcon(jumpPrevIcon, 'prev page'),
    );
    const jumpNextContent = itemRender(
      jumpNextPage,
      'jump-next',
      getItemIcon(jumpNextIcon, 'next page'),
    );

    if (showPrevNextJumpers) {
      jumpPrev = jumpPrevContent ? (
        <li
          title={showTitle ? prevItemTitle : null}
          key="prev"
          onClick={jumpPrevHandle}
          tabIndex={0}
          onKeyDown={runIfEnterJumpPrev}
          className={classNames(`${prefixCls}-jump-prev`, {
            [`${prefixCls}-jump-prev-custom-icon`]: !!jumpPrevIcon,
          })}
        >
          {jumpPrevContent}
        </li>
      ) : null;

      jumpNext = jumpNextContent ? (
        <li
          title={showTitle ? nextItemTitle : null}
          key="next"
          onClick={jumpNextHandle}
          tabIndex={0}
          onKeyDown={runIfEnterJumpNext}
          className={classNames(`${prefixCls}-jump-next`, {
            [`${prefixCls}-jump-next-custom-icon`]: !!jumpNextIcon,
          })}
        >
          {jumpNextContent}
        </li>
      ) : null;
    }

    let left = Math.max(1, current - pageBufferSize);
    let right = Math.min(current + pageBufferSize, allPages);

    if (current - 1 <= pageBufferSize) {
      right = 1 + pageBufferSize * 2;
    }
    if (allPages - current <= pageBufferSize) {
      left = allPages - pageBufferSize * 2;
    }

    for (let i = left; i <= right; i += 1) {
      pagerList.push(
        <Pager {...pagerProps} key={i} page={i} active={current === i} />,
      );
    }

    if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
      pagerList[0] = React.cloneElement<PagerProps>(pagerList[0], {
        className: classNames(
          `${prefixCls}-item-after-jump-prev`,
          pagerList[0].props.className,
        ),
      });

      pagerList.unshift(jumpPrev);
    }

    if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
      const lastOne = pagerList[pagerList.length - 1];
      pagerList[pagerList.length - 1] = React.cloneElement(lastOne, {
        className: classNames(
          `${prefixCls}-item-before-jump-next`,
          lastOne.props.className,
        ),
      });

      pagerList.push(jumpNext);
    }

    if (left !== 1) {
      pagerList.unshift(<Pager {...pagerProps} key={1} page={1} />);
    }
    if (right !== allPages) {
      pagerList.push(<Pager {...pagerProps} key={allPages} page={allPages} />);
    }
  }

  const prev = renderPrev(prevPage);
  const prevElement = prev && (
    <li
      title={showTitle ? locale.prev_page : null}
      onClick={prevHandle}
      tabIndex={!hasPrev || !allPages ? null : 0}
      onKeyDown={runIfEnterPrev}
      className={classNames(`${prefixCls}-prev`, {
        [`${prefixCls}-disabled`]: !hasPrev || !allPages,
      })}
      aria-disabled={!hasPrev || !allPages}
    >
      {prev}
    </li>
  );

  const next = renderNext(nextPage);
  const nextElement = next && (
    <li
      title={showTitle ? locale.next_page : null}
      onClick={nextHandle}
      tabIndex={
        simple ? (hasNext ? 0 : null) : !hasNext || !allPages ? null : 0
      }
      onKeyDown={
        simple ? (hasNext ? runIfEnterNext : undefined) : runIfEnterNext
      }
      className={classNames(`${prefixCls}-next`, {
        [`${prefixCls}-disabled`]: !hasNext || !allPages,
      })}
      aria-disabled={!hasNext || !allPages}
    >
      {next}
    </li>
  );

  const cls = classNames(prefixCls, className, {
    [`${prefixCls}-start`]: align === 'start',
    [`${prefixCls}-center`]: align === 'center',
    [`${prefixCls}-end`]: align === 'end',
    [`${prefixCls}-simple`]: simple,
    [`${prefixCls}-disabled`]: disabled,
  });

  return (
    <ul
      className={cls}
      style={style}
      ref={paginationRef}
      {...dataOrAriaAttributeProps}
    >
      {totalText}
      {prevElement}
      {simple ? simplePager : pagerList}
      {nextElement}
      <Options
        locale={locale}
        rootPrefixCls={prefixCls}
        disabled={disabled}
        selectComponentClass={selectComponentClass}
        selectPrefixCls={selectPrefixCls}
        changeSize={changePageSize}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        quickGo={shouldDisplayQuickJumper ? handleChange : null}
        goButton={gotoButton}
        showSizeChanger={showSizeChanger}
      />
    </ul>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Pagination.displayName = 'Pagination';
}

export default Pagination;
