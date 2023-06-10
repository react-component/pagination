import classNames from 'classnames';
import pickAttrs from 'rc-util/lib/pickAttrs';
import React, { cloneElement, isValidElement } from 'react';
import KEYCODE from './KeyCode';
import LOCALE from './locale/zh_CN';
import Options from './Options';
import Pager from './Pager';

export interface PaginationLocale {
  // Options.jsx
  items_per_page?: string;
  jump_to?: string;
  jump_to_confirm?: string;
  page?: string;

  // Pagination.jsx
  prev_page?: string;
  next_page?: string;
  prev_5?: string;
  next_5?: string;
  prev_3?: string;
  next_3?: string;
}

export interface PaginationData {
  className: string;
  selectPrefixCls: string;
  prefixCls: string;
  pageSizeOptions: string[] | number[];

  current: number;
  defaultCurrent: number;
  total: number;
  totalBoundaryShowSizeChanger?: number;
  pageSize: number;
  defaultPageSize: number;

  hideOnSinglePage: boolean;
  showSizeChanger: boolean;
  showLessItems: boolean;
  showPrevNextJumpers: boolean;
  showQuickJumper: boolean | object;
  showTitle: boolean;
  simple: boolean;
  disabled: boolean;

  locale: PaginationLocale;

  style: React.CSSProperties;

  selectComponentClass: React.ComponentType;
  prevIcon: React.ComponentType | React.ReactNode;
  nextIcon: React.ComponentType | React.ReactNode;
  jumpPrevIcon: React.ComponentType | React.ReactNode;
  jumpNextIcon: React.ComponentType | React.ReactNode;
}

export interface PaginationProps extends Partial<PaginationData> {
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  itemRender?: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    element: React.ReactNode,
  ) => React.ReactNode;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
}

interface PaginationState {
  current: number;
  currentInputValue: number;
  pageSize: number;
}

function noop() {
}

function isInteger(v: number) {
  const value = Number(v);
  return (
    // eslint-disable-next-line no-restricted-globals
    typeof value === 'number' &&
    !Number.isNaN(value) &&
    isFinite(value) &&
    Math.floor(value) === value
  );
}

const defaultItemRender: PaginationProps['itemRender'] = (
  page,
  type,
  element,
) => {
  return element;
};

function calculatePage(
  p: number | undefined,
  state: PaginationState,
  props: PaginationProps,
) {
  const pageSize = typeof p === 'undefined' ? state.pageSize : p;
  return Math.floor((props.total - 1) / pageSize) + 1;
}

class Pagination extends React.Component<PaginationProps, PaginationState> {
  static defaultProps = {
    defaultCurrent: 1,
    total: 0,
    defaultPageSize: 10,
    onChange: noop,
    className: '',
    selectPrefixCls: 'rc-select',
    prefixCls: 'rc-pagination',
    selectComponentClass: null,
    hideOnSinglePage: false,
    showPrevNextJumpers: true,
    showQuickJumper: false,
    showLessItems: false,
    showTitle: true,
    onShowSizeChange: noop,
    locale: LOCALE,
    style: {},
    itemRender: defaultItemRender,
    totalBoundaryShowSizeChanger: 50,
  };
  paginationNode = React.createRef<HTMLUListElement>();

  constructor(props: PaginationProps) {
    super(props);

    const hasOnChange = props.onChange !== noop;
    const hasCurrent = 'current' in props;
    if (hasCurrent && !hasOnChange) {
      // eslint-disable-next-line no-console
      console.warn(
        'Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.',
      );
    }

    let current = props.defaultCurrent;
    if ('current' in props) {
      // eslint-disable-next-line prefer-destructuring
      current = props.current;
    }

    let pageSize = props.defaultPageSize;
    if ('pageSize' in props) {
      // eslint-disable-next-line prefer-destructuring
      pageSize = props.pageSize;
    }

    current = Math.min(current, calculatePage(pageSize, undefined, props));

    this.state = {
      current,
      currentInputValue: current,
      pageSize,
    };
  }

  componentDidUpdate(_: PaginationProps, prevState: PaginationState) {
    // When current page change, fix focused style of prev item
    // A hacky solution of https://github.com/ant-design/ant-design/issues/8948
    const { prefixCls } = this.props;
    if (
      prevState.current !== this.state.current &&
      this.paginationNode.current
    ) {
      const lastCurrentNode =
        this.paginationNode.current.querySelector<HTMLInputElement>(
          `.${prefixCls}-item-${prevState.current}`,
        );
      if (lastCurrentNode && document.activeElement === lastCurrentNode) {
        lastCurrentNode?.blur?.();
      }
    }
  }

  static getDerivedStateFromProps(
    props: PaginationProps,
    prevState: PaginationState,
  ) {
    const newState: Partial<PaginationState> = {};

    if ('current' in props) {
      newState.current = props.current;

      if (props.current !== prevState.current) {
        newState.currentInputValue = newState.current;
      }
    }

    if ('pageSize' in props && props.pageSize !== prevState.pageSize) {
      let { current } = prevState;
      const newCurrent = calculatePage(props.pageSize, prevState, props);
      current = current > newCurrent ? newCurrent : current;

      if (!('current' in props)) {
        newState.current = current;
        newState.currentInputValue = current;
      }
      newState.pageSize = props.pageSize;
    }

    return newState;
  }

  getJumpPrevPage = () =>
    Math.max(1, this.state.current - (this.props.showLessItems ? 3 : 5));

  getJumpNextPage = () =>
    Math.min(
      calculatePage(undefined, this.state, this.props),
      this.state.current + (this.props.showLessItems ? 3 : 5),
    );

  getItemIcon = (
    icon: React.ReactNode | React.ComponentType<PaginationProps>,
    label: string,
  ) => {
    const { prefixCls } = this.props;
    let iconNode = icon || (
      <button
        type="button"
        aria-label={label}
        className={`${prefixCls}-item-link`}
      />
    );
    if (typeof icon === 'function') {
      iconNode = React.createElement(icon, { ...this.props });
    }
    return iconNode as React.ReactNode;
  };

  getValidValue(e: any): number {
    const inputValue = e.target.value;
    const allPages = calculatePage(undefined, this.state, this.props);
    const { currentInputValue } = this.state;
    let value: number;
    if (inputValue === '') {
      value = inputValue;
      // eslint-disable-next-line no-restricted-globals
    } else if (Number.isNaN(Number(inputValue))) {
      value = currentInputValue;
    } else if (inputValue >= allPages) {
      value = allPages;
    } else {
      value = Number(inputValue);
    }
    return value;
  }

  isValid = (page: number) => {
    const { total } = this.props;
    return (
      isInteger(page) &&
      page !== this.state.current &&
      isInteger(total) &&
      total > 0
    );
  };

  shouldDisplayQuickJumper = () => {
    const { showQuickJumper, total } = this.props;
    const { pageSize } = this.state;
    if (total <= pageSize) {
      return false;
    }
    return showQuickJumper;
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === KEYCODE.ARROW_UP || e.keyCode === KEYCODE.ARROW_DOWN) {
      e.preventDefault();
    }
  };

  handleKeyUp = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = this.getValidValue(e);
    const { currentInputValue } = this.state;
    if (value !== currentInputValue) {
      this.setState({ currentInputValue: value });
    }
    if (
      (e as React.KeyboardEvent<HTMLInputElement>).keyCode === KEYCODE.ENTER
    ) {
      this.handleChange(value);
    } else if (
      (e as React.KeyboardEvent<HTMLInputElement>).keyCode === KEYCODE.ARROW_UP
    ) {
      this.handleChange(value - 1);
    } else if (
      (e as React.KeyboardEvent<HTMLInputElement>).keyCode ===
      KEYCODE.ARROW_DOWN
    ) {
      this.handleChange(value + 1);
    }
  };

  handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = this.getValidValue(e);
    this.handleChange(value);
  };

  changePageSize = (size: number) => {
    let { current } = this.state;
    const newCurrent = calculatePage(size, this.state, this.props);
    current = current > newCurrent ? newCurrent : current;
    // fix the issue:
    // Once 'total' is 0, 'current' in 'onShowSizeChange' is 0, which is not correct.
    if (newCurrent === 0) {
      // eslint-disable-next-line prefer-destructuring
      current = this.state.current;
    }

    if (typeof size === 'number') {
      if (!('pageSize' in this.props)) {
        this.setState({ pageSize: size });
      }
      if (!('current' in this.props)) {
        this.setState({ current, currentInputValue: current });
      }
    }

    this.props.onShowSizeChange(current, size);

    if ('onChange' in this.props && this.props.onChange) {
      this.props.onChange(current, size);
    }
  };

  handleChange = (page: number) => {
    const { disabled, onChange } = this.props;
    const { pageSize, current, currentInputValue } = this.state;
    if (this.isValid(page) && !disabled) {
      const currentPage = calculatePage(undefined, this.state, this.props);
      let newPage = page;
      if (page > currentPage) {
        newPage = currentPage;
      } else if (page < 1) {
        newPage = 1;
      }
      if (!('current' in this.props)) {
        this.setState({ current: newPage });
      }
      if (newPage !== currentInputValue) {
        this.setState({ currentInputValue: newPage });
      }
      onChange(newPage, pageSize);
      return newPage;
    }
    return current;
  };

  prev = () => {
    if (this.hasPrev()) {
      this.handleChange(this.state.current - 1);
    }
  };

  next = () => {
    if (this.hasNext()) {
      this.handleChange(this.state.current + 1);
    }
  };

  jumpPrev = () => {
    this.handleChange(this.getJumpPrevPage());
  };

  jumpNext = () => {
    this.handleChange(this.getJumpNextPage());
  };

  hasPrev = () => this.state.current > 1;

  hasNext = () =>
    this.state.current < calculatePage(undefined, this.state, this.props);

  getShowSizeChanger() {
    const { showSizeChanger, total, totalBoundaryShowSizeChanger } = this.props;
    if (typeof showSizeChanger !== 'undefined') {
      return showSizeChanger;
    }
    return total > totalBoundaryShowSizeChanger;
  }

  runIfEnter = (event, callback, ...restParams) => {
    if (event.key === 'Enter' || event.charCode === 13) {
      callback(...restParams);
    }
  };

  runIfEnterPrev = (e: React.KeyboardEvent<HTMLLIElement>) => {
    this.runIfEnter(e, this.prev);
  };

  runIfEnterNext = (e: React.KeyboardEvent<HTMLLIElement>) => {
    this.runIfEnter(e, this.next);
  };

  runIfEnterJumpPrev = (e: React.KeyboardEvent<HTMLLIElement>) => {
    this.runIfEnter(e, this.jumpPrev);
  };

  runIfEnterJumpNext = (e: React.KeyboardEvent<HTMLLIElement>) => {
    this.runIfEnter(e, this.jumpNext);
  };

  handleGoTO = (e: any) => {
    if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
      this.handleChange(this.state.currentInputValue);
    }
  };

  renderPrev = (prevPage: number) => {
    const { prevIcon, itemRender } = this.props;
    const prevButton = itemRender(
      prevPage,
      'prev',
      this.getItemIcon(prevIcon, 'prev page'),
    );
    const disabled = !this.hasPrev();
    return isValidElement(prevButton)
      ? cloneElement<any>(prevButton, { disabled })
      : prevButton;
  };

  renderNext = (nextPage: number) => {
    const { nextIcon, itemRender } = this.props;
    const nextButton = itemRender(
      nextPage,
      'next',
      this.getItemIcon(nextIcon, 'next page'),
    );
    const disabled = !this.hasNext();
    return isValidElement(nextButton)
      ? cloneElement<any>(nextButton, { disabled })
      : nextButton;
  };

  render() {
    const {
      prefixCls,
      className,
      style,
      disabled,
      hideOnSinglePage,
      total,
      locale,
      showQuickJumper,
      showLessItems,
      showTitle,
      showTotal,
      simple,
      itemRender,
      showPrevNextJumpers,
      jumpPrevIcon,
      jumpNextIcon,
      selectComponentClass,
      selectPrefixCls,
      pageSizeOptions,
    } = this.props;

    const { current, pageSize, currentInputValue } = this.state;

    // When hideOnSinglePage is true and there is only 1 page, hide the pager
    if (hideOnSinglePage === true && total <= pageSize) {
      return null;
    }

    const allPages = calculatePage(undefined, this.state, this.props);
    const pagerList = [];
    let jumpPrev = null;
    let jumpNext = null;
    let firstPager = null;
    let lastPager = null;
    let gotoButton = null;

    const goButton = showQuickJumper && (showQuickJumper as any).goButton;
    const pageBufferSize = showLessItems ? 1 : 2;

    const prevPage = current - 1 > 0 ? current - 1 : 0;
    const nextPage = current + 1 < allPages ? current + 1 : allPages;

    const dataOrAriaAttributeProps = pickAttrs(this.props, {
      aria: true,
      data: true,
    });

    const totalText = showTotal && (
      <li className={`${prefixCls}-total-text`}>
        {showTotal(total, [
          total === 0 ? 0 : (current - 1) * pageSize + 1,
          current * pageSize > total ? total : current * pageSize,
        ])}
      </li>
    );

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

      const prev = this.renderPrev(prevPage);
      return (
        <ul
          className={classNames(
            prefixCls,
            `${prefixCls}-simple`,
            { [`${prefixCls}-disabled`]: disabled },
            className,
          )}
          style={style}
          ref={this.paginationNode}
          {...dataOrAriaAttributeProps}
        >
          {totalText}
          {
            prev ? <li
              title={showTitle ? locale.prev_page : null}
              onClick={this.prev}
              tabIndex={this.hasPrev() ? 0 : null}
              onKeyPress={this.runIfEnterPrev}
              className={classNames(`${prefixCls}-prev`, {
                [`${prefixCls}-disabled`]: !this.hasPrev(),
              })}
              aria-disabled={!this.hasPrev()}
            >
              {prev}
            </li> : null
          }
          <li
            title={showTitle ? `${current}/${allPages}` : null}
            className={`${prefixCls}-simple-pager`}
          >
            <input
              type="text"
              value={currentInputValue}
              disabled={disabled}
              onKeyDown={this.handleKeyDown}
              onKeyUp={this.handleKeyUp}
              onChange={this.handleKeyUp}
              onBlur={this.handleBlur}
              size={3}
            />
            <span className={`${prefixCls}-slash`}>/</span>
            {allPages}
          </li>
          <li
            title={showTitle ? locale.next_page : null}
            onClick={this.next}
            tabIndex={this.hasPrev() ? 0 : null}
            onKeyPress={this.runIfEnterNext}
            className={classNames(`${prefixCls}-next`, {
              [`${prefixCls}-disabled`]: !this.hasNext(),
            })}
            aria-disabled={!this.hasNext()}
          >
            {this.renderNext(nextPage)}
          </li>
          {gotoButton}
        </ul>
      );
    }

    if (allPages <= 3 + pageBufferSize * 2) {
      const pagerProps = {
        locale,
        rootPrefixCls: prefixCls,
        onClick: this.handleChange,
        onKeyPress: this.runIfEnter,
        showTitle,
        itemRender,
      };
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
        const active = current === i;
        pagerList.push(
          <Pager {...pagerProps} key={i} page={i} active={active}/>,
        );
      }
    } else {
      const prevItemTitle = showLessItems ? locale.prev_3 : locale.prev_5;
      const nextItemTitle = showLessItems ? locale.next_3 : locale.next_5;
      if (showPrevNextJumpers) {
        jumpPrev = (
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
            {itemRender(
              this.getJumpPrevPage(),
              'jump-prev',
              this.getItemIcon(jumpPrevIcon, 'prev page'),
            )}
          </li>
        );
        jumpNext = (
          <li
            title={showTitle ? nextItemTitle : null}
            key="next"
            tabIndex={0}
            onClick={this.jumpNext}
            onKeyPress={this.runIfEnterJumpNext}
            className={classNames(`${prefixCls}-jump-next`, {
              [`${prefixCls}-jump-next-custom-icon`]: !!jumpNextIcon,
            })}
          >
            {itemRender(
              this.getJumpNextPage(),
              'jump-next',
              this.getItemIcon(jumpNextIcon, 'next page'),
            )}
          </li>
        );
      }
      lastPager = (
        <Pager
          locale={locale}
          last
          rootPrefixCls={prefixCls}
          onClick={this.handleChange}
          onKeyPress={this.runIfEnter}
          key={allPages}
          page={allPages}
          active={false}
          showTitle={showTitle}
          itemRender={itemRender}
        />
      );
      firstPager = (
        <Pager
          locale={locale}
          rootPrefixCls={prefixCls}
          onClick={this.handleChange}
          onKeyPress={this.runIfEnter}
          key={1}
          page={1}
          active={false}
          showTitle={showTitle}
          itemRender={itemRender}
        />
      );

      let left = Math.max(1, current - pageBufferSize);
      let right = Math.min(current + pageBufferSize, allPages);

      if (current - 1 <= pageBufferSize) {
        right = 1 + pageBufferSize * 2;
      }

      if (allPages - current <= pageBufferSize) {
        left = allPages - pageBufferSize * 2;
      }

      for (let i = left; i <= right; i += 1) {
        const active = current === i;
        pagerList.push(
          <Pager
            locale={locale}
            rootPrefixCls={prefixCls}
            onClick={this.handleChange}
            onKeyPress={this.runIfEnter}
            key={i}
            page={i}
            active={active}
            showTitle={showTitle}
            itemRender={itemRender}
          />,
        );
      }

      if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
        pagerList[0] = cloneElement(pagerList[0], {
          className: `${prefixCls}-item-after-jump-prev`,
        });
        pagerList.unshift(jumpPrev);
      }
      if (
        allPages - current >= pageBufferSize * 2 &&
        current !== allPages - 2
      ) {
        pagerList[pagerList.length - 1] = cloneElement(
          pagerList[pagerList.length - 1],
          {
            className: `${prefixCls}-item-before-jump-next`,
          },
        );
        pagerList.push(jumpNext);
      }

      if (left !== 1) {
        pagerList.unshift(firstPager);
      }
      if (right !== allPages) {
        pagerList.push(lastPager);
      }
    }

    const prevDisabled = !this.hasPrev() || !allPages;
    const nextDisabled = !this.hasNext() || !allPages;

    const prev = this.renderPrev(prevPage);
    const next = this.renderNext(nextPage);
    return (
      <ul
        className={classNames(prefixCls, className, {
          [`${prefixCls}-disabled`]: disabled,
        })}
        style={style}
        ref={this.paginationNode}
        {...dataOrAriaAttributeProps}
      >
        {totalText}
        {
          prev ? <li
            title={showTitle ? locale.prev_page : null}
            onClick={this.prev}
            tabIndex={prevDisabled ? null : 0}
            onKeyPress={this.runIfEnterPrev}
            className={classNames(`${prefixCls}-prev`, {
              [`${prefixCls}-disabled`]: prevDisabled,
            })}
            aria-disabled={prevDisabled}
          >
            {prev}
          </li> : null
        }
        {pagerList}
        {
          next ? <li
            title={showTitle ? locale.next_page : null}
            onClick={this.next}
            tabIndex={nextDisabled ? null : 0}
            onKeyPress={this.runIfEnterNext}
            className={classNames(`${prefixCls}-next`, {
              [`${prefixCls}-disabled`]: nextDisabled,
            })}
            aria-disabled={nextDisabled}
          >
            {next}
          </li> : null
        }
        <Options
          disabled={disabled}
          locale={locale}
          rootPrefixCls={prefixCls}
          selectComponentClass={selectComponentClass}
          selectPrefixCls={selectPrefixCls}
          changeSize={this.getShowSizeChanger() ? this.changePageSize : null}
          current={current}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          quickGo={this.shouldDisplayQuickJumper() ? this.handleChange : null}
          goButton={goButton}
        />
      </ul>
    );
  }
}

export default Pagination;
