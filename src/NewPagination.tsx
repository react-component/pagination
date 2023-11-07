import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import pickAttrs from 'rc-util/lib/pickAttrs';
import warning from 'rc-util/lib/warning';
import React from 'react';
import type { PaginationProps } from './interface';
import zhCN from './locale/zh_CN';

const defaultItemRender: PaginationProps['itemRender'] = (
  page,
  type,
  element,
) => element;

function noop() {}

function calculatePage(p: number | undefined, pageSize: number, total: number) {
  const _pageSize = typeof p === 'undefined' ? pageSize : p;
  return Math.floor((total - 1) / _pageSize) + 1;
}
function Pagination(props: PaginationProps) {
  const {
    prefixCls = 'rc-pagination',
    selectPrefixCls = 'rc-select',
    className,
    current: currentProp,
    defaultCurrent = 1,
    total = 0,
    pageSize: pageSizeProp,
    defaultPageSize = 10,
    onChange = noop,
    selectComponentClass,
    hideOnSinglePage,
    showPrevNextJumpers = true,
    showQuickJumper,
    showLessItems,
    showTitle = true,
    onShowSizeChange = noop,
    locale = zhCN,
    style,
    itemRender = defaultItemRender,
    totalBoundaryShowSizeChanger = 50,
    disabled,
    simple,
    showTotal,
    // render
    jumpPrevIcon,
    prevIcon,
    nextIcon,
  } = props;

  const paginationRef = React.useRef<HTMLUListElement>(null);

  const [pageSize, setPageSize] = useMergedState<number>(10, {
    value: pageSizeProp,
    defaultValue: defaultPageSize,
  });

  const [current, setCurrent] = useMergedState<number>(1, {
    value: currentProp,
    defaultValue: defaultCurrent,
    postState: (c) => Math.min(c, calculatePage(pageSize, undefined, total)),
  });

  const hasOnChange = onChange !== noop;
  const hasCurrent = 'current' in props;

  if (process.env.NODE_ENV !== 'production') {
    warning(
      hasCurrent && hasOnChange,
      'Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.',
    );
  }

  // TODO: Should be deleted. assign: @Wuxh<wxh1220@gmail.com>
  globalThis.console.log('%c<Pagination />', 'color:lightBlue;', {
    total,
    hasOnChange,
    hasCurrent,
    current,
    pageSize,
  });

  const getJumpPrevPage = () => Math.max(1, current - (showLessItems ? 3 : 5));

  const getJumpNextPage = () =>
    Math.min(
      calculatePage(undefined, pageSize, total),
      this.state.current + (this.props.showLessItems ? 3 : 5),
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
      iconNode = React.createElement(icon, { ...props });
    }
    return iconNode as React.ReactNode;
  };

  function getValidValue(e: any): number {
    const inputValue = e.target.value;
    const allPages = calculatePage(undefined, pageSize, total);
    let value: number;
    if (inputValue === '') {
      value = inputValue;
      // eslint-disable-next-line no-restricted-globals
    } else if (Number.isNaN(Number(inputValue))) {
      value = current;
    } else if (inputValue >= allPages) {
      value = allPages;
    } else {
      value = Number(inputValue);
    }
    return value;
  }

  const runIfEnter = (event, callback, ...restParams) => {
    if (event.key === 'Enter' || event.charCode === 13) {
      callback(...restParams);
    }
  };

  const hasPrev = () => current > 1;
  const hasNext = () => current < calculatePage(undefined, current, total);

  const renderPrev = (prevPage: number) => {
    const prevButton = itemRender(
      prevPage,
      'prev',
      this.getItemIcon(prevIcon, 'prev page'),
    );
    return React.isValidElement(prevButton)
      ? React.cloneElement<any>(prevButton, { disabled: !hasPrev() })
      : prevButton;
  };

  const renderNext = (nextPage: number) => {
    const nextButton = itemRender(
      nextPage,
      'next',
      getItemIcon(nextIcon, 'next page'),
    );
    return React.isValidElement(nextButton)
      ? React.cloneElement<any>(nextButton, { disabled: hasNext() })
      : nextButton;
  };

  const prevHandle = () => {
    if (hasPrev()) {
      // this.handleChange(this.state.current - 1);
    }
  };

  let jumpPrev: React.ReactNode = null;

  const jumpPrevContent = itemRender(
    getJumpPrevPage(),
    'jump-prev',
    getItemIcon(jumpPrevIcon, 'prev page'),
  );

  const prevItemTitle = showLessItems ? locale.prev_3 : locale.prev_5;
  const nextItemTitle = showLessItems ? locale.next_3 : locale.next_5;

  const dataOrAriaAttributeProps = pickAttrs(props, {
    aria: true,
    data: true,
  });

  jumpPrev = jumpPrevContent ? (
    <li
      title={showTitle ? prevItemTitle : null}
      key="prev"
      onClick={this.jumpPrev}
      tabIndex={0}
      onKeyPress={this.runIfEnterJumpPrev}
      className={classNames(`${prefixCls}-jump-prev`, {
        [`${prefixCls}-jump-prev-custom-icon`]: !!jumpPrevIcon,
      })}
    >
      {jumpPrevContent}
    </li>
  ) : null;

  const totalText: React.ReactNode = showTotal ? (
    <li className={`${prefixCls}-total-text`}>
      {showTotal(total, [
        total === 0 ? 0 : (current - 1) * pageSize + 1,
        current * pageSize > total ? total : current * pageSize,
      ])}
    </li>
  ) : null;

  const jumpNext: React.ReactNode = null;
  const firstPager: React.ReactNode = null;
  const lastPager: React.ReactNode = null;

  const allPages = calculatePage(undefined, pageSize, total);

  // ================== Render ==================
  // When hideOnSinglePage is true and there is only 1 page, hide the pager
  if (hideOnSinglePage && total <= pageSize) {
    return null;
  }

  // ================== Simple ==================
  let gotoButton: React.ReactNode = null;
  const goButton = showQuickJumper && (showQuickJumper as any).goButton;
  const prevPage = current - 1 > 0 ? current - 1 : 0;
  const nextPage = current + 1 < allPages ? current + 1 : allPages;

  if (simple) {
    if (goButton) {
      if (typeof goButton === 'boolean') {
        gotoButton = (
          <button
            type="button"
            onClick={this.handleGoTO}
            onKeyUp={this.handleGoTO}
          >
            {locale.jump_to_confirm}
          </button>
        );
      } else {
        gotoButton = (
          <span onClick={this.handleGoTO} onKeyUp={this.handleGoTO}>
            {goButton}
          </span>
        );
      }
      gotoButton = (
        <li
          title={showTitle ? `${locale.jump_to}${current}/${allPages}` : null}
          className={`${prefixCls}-simple-pager`}
        >
          {gotoButton}
        </li>
      );
    }

    const prevNode = renderPrev(prevPage);
    return (
      <ul
        className={classNames(
          prefixCls,
          `${prefixCls}-simple`,
          { [`${prefixCls}-disabled`]: disabled },
          className,
        )}
        style={style}
        ref={paginationRef}
        {...dataOrAriaAttributeProps}
      >
        {totalText}
        {prevNode ? (
          <li
            title={showTitle ? locale.prev_page : null}
            onClick={prevHandle}
            tabIndex={hasPrev() ? 0 : null}
            // onKeyPress={this.runIfEnterPrev}
            className={classNames(`${prefixCls}-prev`, {
              [`${prefixCls}-disabled`]: !hasPrev(),
            })}
            aria-disabled={!hasPrev()}
          >
            {prevNode}
          </li>
        ) : null}
        <li
          title={showTitle ? `${current}/${allPages}` : null}
          className={`${prefixCls}-simple-pager`}
        >
          <input
            type="text"
            value={current}
            disabled={disabled}
            // onKeyDown={this.handleKeyDown}
            // onKeyUp={this.handleKeyUp}
            // onChange={this.handleKeyUp}
            // onBlur={this.handleBlur}
            size={3}
          />
          <span className={`${prefixCls}-slash`}>/</span>
          {allPages}
        </li>
        <li
          title={showTitle ? locale.next_page : null}
          onClick={this.next}
          tabIndex={hasPrev() ? 0 : null}
          // onKeyPress={this.runIfEnterNext}
          className={classNames(`${prefixCls}-next`, {
            [`${prefixCls}-disabled`]: !this.hasNext(),
          })}
          aria-disabled={!this.hasNext()}
        >
          {renderNext(nextPage)}
        </li>
      </ul>
    );
  }

  return (
    <div>
      <h1>NEW Pagination</h1>
    </div>
  );
}

export default Pagination;
