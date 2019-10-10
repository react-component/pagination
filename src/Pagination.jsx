import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Pager from './Pager';
import Options from './Options';
import KEYCODE from './KeyCode';
import LOCALE from './locale/zh_CN';
import { polyfill } from 'react-lifecycles-compat';

function noop() {
}

function isInteger(value) {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
}

function defaultItemRender(page, type, element) {
  return element;
}

function calculatePage(p, state, props) {
  let pageSize = p;
  if (typeof pageSize === 'undefined') {
    pageSize = state.pageSize;
  }
  return Math.floor((props.total - 1) / pageSize) + 1;
}

class Pagination extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    current: PropTypes.number,
    defaultCurrent: PropTypes.number,
    total: PropTypes.number,
    pageSize: PropTypes.number,
    defaultPageSize: PropTypes.number,
    onChange: PropTypes.func,
    hideOnSinglePage: PropTypes.bool,
    showSizeChanger: PropTypes.bool,
    showLessItems: PropTypes.bool,
    onShowSizeChange: PropTypes.func,
    selectComponentClass: PropTypes.func,
    showPrevNextJumpers: PropTypes.bool,
    showQuickJumper: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    showTitle: PropTypes.bool,
    focusOnListItem: PropTypes.bool,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.string),
    showTotal: PropTypes.func,
    locale: PropTypes.object,
    style: PropTypes.object,
    itemRender: PropTypes.func,
    prevIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    nextIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    jumpPrevIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    jumpNextIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  };

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
    showSizeChanger: false,
    showLessItems: false,
    showTitle: true,
    focusOnListItem: true,
    onShowSizeChange: noop,
    locale: LOCALE,
    style: {},
    itemRender: defaultItemRender,
  };

  constructor(props) {
    super(props);

    const hasOnChange = props.onChange !== noop;
    const hasCurrent = ('current' in props);
    if (hasCurrent && !hasOnChange) {
      console.warn('Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.'); // eslint-disable-line
    }

    let current = props.defaultCurrent;
    if ('current' in props) {
      current = props.current;
    }

    let pageSize = props.defaultPageSize;
    if ('pageSize' in props) {
      pageSize = props.pageSize;
    }

    this.state = {
      current,
      currentInputValue: current,
      pageSize,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // When current page change, fix focused style of prev item
    // A hacky solution of https://github.com/ant-design/ant-design/issues/8948
    const { prefixCls } = this.props;
    if (prevState.current !== this.state.current && this.paginationNode) {
      const lastCurrentNode = this.paginationNode.querySelector(
        `.${prefixCls}-item-${prevState.current}`
      );
      if (lastCurrentNode && document.activeElement === lastCurrentNode) {
        lastCurrentNode.blur();
      }
    }
  }

  static getDerivedStateFromProps(props, prevState) {
    const newState = {};

    if ('current' in props) {
      newState.current = props.current;

      if (props.current !== prevState.current) {
        newState.currentInputValue = newState.current;
      }
    }

    if ('pageSize' in props && props.pageSize !== prevState.pageSize) {
      let current = prevState.current;
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

  getJumpPrevPage = () => {
    return Math.max(1, this.state.current - (this.props.showLessItems ? 3 : 5));
  }

  getJumpNextPage = () => {
    return Math.min(
      calculatePage(undefined, this.state, this.props),
      this.state.current + (this.props.showLessItems ? 3 : 5)
    );
  }

  /**
   * computed icon node that need to be rendered.
   * @param {React.ReactNode | React.ComponentType<PaginationProps>} icon received icon.
   * @returns {React.ReactNode}
   */
  getItemIcon = (icon) => {
    const { prefixCls } = this.props;
    let iconNode = icon
      || <a className={`${prefixCls}-item-link`} />;
    if (typeof icon === 'function') {
      iconNode = React.createElement(icon, { ...this.props });
    }
    return iconNode;
  }

  getValidValue(e) {
    const inputValue = e.target.value;
    const { currentInputValue } = this.state;
    let value;
    if (inputValue === '') {
      value = inputValue;
    } else if (isNaN(Number(inputValue))) {
      value = currentInputValue;
    } else {
      value = Number(inputValue);
    }
    return value;
  }

  savePaginationNode = (node) => {
    this.paginationNode = node;
  }

  isValid = (page) => {
    return isInteger(page) && page !== this.state.current;
  }

  shouldDisplayQuickJumper = () => {
    const { showQuickJumper, pageSize, total } = this.props;
    if (total <= pageSize) {
      return false;
    }
    return showQuickJumper;
  }

  handleKeyDown = (e) => {
    if (e.keyCode === KEYCODE.ARROW_UP || e.keyCode === KEYCODE.ARROW_DOWN) {
      e.preventDefault();
    }
  }

  handleKeyUp = (e) => {
    const value = this.getValidValue(e);
    const { currentInputValue } = this.state;
    if (value !== currentInputValue) {
      this.setState({
        currentInputValue: value,
      });
    }
    if (e.keyCode === KEYCODE.ENTER) {
      this.handleChange(value);
    } else if (e.keyCode === KEYCODE.ARROW_UP) {
      this.handleChange(value - 1);
    } else if (e.keyCode === KEYCODE.ARROW_DOWN) {
      this.handleChange(value + 1);
    }
  }

  changePageSize = (size) => {
    let current = this.state.current;
    const newCurrent = calculatePage(size, this.state, this.props);
    current = current > newCurrent ? newCurrent : current;
    // fix the issue:
    // Once 'total' is 0, 'current' in 'onShowSizeChange' is 0, which is not correct.
    if (newCurrent === 0) {
      current = this.state.current;
    }

    if (typeof size === 'number') {
      if (!('pageSize' in this.props)) {
        this.setState({
          pageSize: size,
        });
      }
      if (!('current' in this.props)) {
        this.setState({
          current,
          currentInputValue: current,
        });
      }
    }
    this.props.onShowSizeChange(current, size);
  }

  handleChange = (p) => {
    const { disabled } = this.props;

    let page = p;
    if (this.isValid(page) && !disabled) {
      const currentPage = calculatePage(undefined, this.state, this.props);
      if (page > currentPage) {
        page = currentPage;
      } else if (page < 1) {
        page = 1;
      }

      if (!('current' in this.props)) {
        this.setState({
          current: page,
          currentInputValue: page,
        });
      }

      const pageSize = this.state.pageSize;
      this.props.onChange(page, pageSize);

      return page;
    }

    return this.state.current;
  }

  prev = () => {
    if (this.hasPrev()) {
      this.handleChange(this.state.current - 1);
    }
  }

  next = () => {
    if (this.hasNext()) {
      this.handleChange(this.state.current + 1);
    }
  }

  jumpPrev = () => {
    this.handleChange(this.getJumpPrevPage());
  }

  jumpNext = () => {
    this.handleChange(this.getJumpNextPage());
  }

  hasPrev = () => {
    return this.state.current > 1;
  }

  hasNext = () => {
    return this.state.current < calculatePage(undefined, this.state, this.props);
  }

  runIfEnter = (event, callback, ...restParams) => {
    if (event.key === 'Enter' || event.charCode === 13) {
      callback(...restParams);
    }
  }

  runIfEnterPrev = e => {
    this.runIfEnter(e, this.prev);
  }

  runIfEnterNext = e => {
    this.runIfEnter(e, this.next);
  }

  runIfEnterJumpPrev = e => {
    this.runIfEnter(e, this.jumpPrev);
  }

  runIfEnterJumpNext = e => {
    this.runIfEnter(e, this.jumpNext);
  }

  handleGoTO = e => {
    if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
      this.handleChange(this.state.currentInputValue);
    }
  }

  render() {
    const { prefixCls, className, disabled } = this.props;

    // When hideOnSinglePage is true and there is only 1 page, hide the pager
    if (this.props.hideOnSinglePage === true && this.props.total <= this.state.pageSize) {
      return null;
    }

    const props = this.props;
    const locale = props.locale;

    const allPages = calculatePage(undefined, this.state, this.props);
    const pagerList = [];
    let jumpPrev = null;
    let jumpNext = null;
    let firstPager = null;
    let lastPager = null;
    let gotoButton = null;

    const goButton = (props.showQuickJumper && props.showQuickJumper.goButton);
    const pageBufferSize = props.showLessItems ? 1 : 2;
    const { current, pageSize } = this.state;

    const prevPage = current - 1 > 0 ? current - 1 : 0;
    const nextPage = current + 1 < allPages ? current + 1 : allPages;

    const dataOrAriaAttributeProps = Object.keys(props).reduce((prev, key) => {
      if ((key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role')) {
        prev[key] = props[key];
      }
      return prev;
    }, {});

    if (props.simple) {
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
            <span
              onClick={this.handleGoTO}
              onKeyUp={this.handleGoTO}
            >{goButton}</span>
          );
        }
        gotoButton = (
          <li
            title={props.showTitle ? `${locale.jump_to}${this.state.current}/${allPages}` : null}
            className={`${prefixCls}-simple-pager`}
          >
            {gotoButton}
          </li>
        );
      }

      return (
        <ul
          className={`${prefixCls} ${prefixCls}-simple ${props.className}`}
          style={props.style}
          ref={this.savePaginationNode}
          {...dataOrAriaAttributeProps}
        >
          <li
            title={props.showTitle ? locale.prev_page : null}
            onClick={this.prev}
            tabIndex={this.hasPrev() ? 0 : null}
            onKeyPress={this.runIfEnterPrev}
            className={`${this.hasPrev() ? '' : `${prefixCls}-disabled`} ${prefixCls}-prev`}
            aria-disabled={!this.hasPrev()}
          >
            {props.itemRender(prevPage, 'prev', this.getItemIcon(props.prevIcon))}
          </li>
          <li
            title={props.showTitle ? `${this.state.current}/${allPages}` : null}
            className={`${prefixCls}-simple-pager`}
          >
            <input
              type="text"
              value={this.state.currentInputValue}
              onKeyDown={this.handleKeyDown}
              onKeyUp={this.handleKeyUp}
              onChange={this.handleKeyUp}
              size="3"
            />
            <span className={`${prefixCls}-slash`}>／</span>
            {allPages}
          </li>
          <li
            title={props.showTitle ? locale.next_page : null}
            onClick={this.next}
            tabIndex={this.hasPrev() ? 0 : null}
            onKeyPress={this.runIfEnterNext}
            className={`${this.hasNext() ? '' : `${prefixCls}-disabled`} ${prefixCls}-next`}
            aria-disabled={!this.hasNext()}
          >
            {props.itemRender(nextPage, 'next', this.getItemIcon(props.nextIcon))}
          </li>
          {gotoButton}
        </ul>
      );
    }

    if (allPages <= 5 + pageBufferSize * 2) {
      const pagerProps = {
        locale,
        rootPrefixCls: prefixCls,
        onClick: this.handleChange,
        onKeyPress: this.runIfEnter,
        showTitle: props.showTitle,
        focusOnListItem: props.focusOnListItem,
        itemRender: props.itemRender,
      };
      if (!allPages) {
        pagerList.push(
          <Pager
            {...pagerProps}
            key="noPager"
            page={allPages}
            className={`${prefixCls}-disabled`}
          />
        );
      }
      for (let i = 1; i <= allPages; i++) {
        const active = this.state.current === i;
        pagerList.push(
          <Pager
            {...pagerProps}
            key={i}
            page={i}
            active={active}
          />
        );
      }
    } else {
      const prevItemTitle = props.showLessItems ? locale.prev_3 : locale.prev_5;
      const nextItemTitle = props.showLessItems ? locale.next_3 : locale.next_5;
      if (props.showPrevNextJumpers) {
        let jumpPrevClassString = `${prefixCls}-jump-prev`;
        if (props.jumpPrevIcon) {
          jumpPrevClassString += ` ${prefixCls}-jump-prev-custom-icon`;
        }
        jumpPrev = (
          <li
            title={props.showTitle ? prevItemTitle : null}
            key="prev"
            onClick={this.jumpPrev}
            tabIndex="0"
            onKeyPress={this.runIfEnterJumpPrev}
            className={jumpPrevClassString}
          >
            {props.itemRender(
              this.getJumpPrevPage(),
              'jump-prev',
              this.getItemIcon(props.jumpPrevIcon)
            )}
          </li>
        );
        let jumpNextClassString = `${prefixCls}-jump-next`;
        if (props.jumpNextIcon) {
          jumpNextClassString += ` ${prefixCls}-jump-next-custom-icon`;
        }
        jumpNext = (
          <li
            title={props.showTitle ? nextItemTitle : null}
            key="next"
            tabIndex="0"
            onClick={this.jumpNext}
            onKeyPress={this.runIfEnterJumpNext}
            className={jumpNextClassString}
          >
            {props.itemRender(
              this.getJumpNextPage(),
              'jump-next',
              this.getItemIcon(props.jumpNextIcon)
            )}
          </li>
        );
      }
      lastPager = (
        <Pager
          locale={props.locale}
          last
          rootPrefixCls={prefixCls}
          onClick={this.handleChange}
          onKeyPress={this.runIfEnter}
          key={allPages}
          page={allPages}
          active={false}
          showTitle={props.showTitle}
          focusOnListItem={props.focusOnListItem}
          itemRender={props.itemRender}
        />
      );
      firstPager = (
        <Pager
          locale={props.locale}
          rootPrefixCls={prefixCls}
          onClick={this.handleChange}
          onKeyPress={this.runIfEnter}
          key={1}
          page={1}
          active={false}
          showTitle={props.showTitle}
          focusOnListItem={props.focusOnListItem}
          itemRender={props.itemRender}
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

      for (let i = left; i <= right; i++) {
        const active = current === i;
        pagerList.push(
          <Pager
            locale={props.locale}
            rootPrefixCls={prefixCls}
            onClick={this.handleChange}
            onKeyPress={this.runIfEnter}
            key={i}
            page={i}
            active={active}
            showTitle={props.showTitle}
            focusOnListItem={props.focusOnListItem}
            itemRender={props.itemRender}
          />
        );
      }

      if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
        pagerList[0] = React.cloneElement(pagerList[0], {
          className: `${prefixCls}-item-after-jump-prev`,
        });
        pagerList.unshift(jumpPrev);
      }
      if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
        pagerList[pagerList.length - 1] = React.cloneElement(pagerList[pagerList.length - 1], {
          className: `${prefixCls}-item-before-jump-next`,
        });
        pagerList.push(jumpNext);
      }

      if (left !== 1) {
        pagerList.unshift(firstPager);
      }
      if (right !== allPages) {
        pagerList.push(lastPager);
      }
    }

    let totalText = null;

    if (props.showTotal) {
      totalText = (
        <li className={`${prefixCls}-total-text`}>
          {props.showTotal(
            props.total,
            [
              props.total === 0 ? 0 : (current - 1) * pageSize + 1,
              current * pageSize > props.total ? props.total : current * pageSize,
            ]
          )}
        </li>
      );
    }
    const prevDisabled = !this.hasPrev() || !allPages;
    const nextDisabled = !this.hasNext() || !allPages;
    return (
      <ul
        className={classNames(prefixCls, className, {
          [`${prefixCls}-disabled`]: disabled,
        })}
        style={props.style}
        unselectable="unselectable"
        ref={this.savePaginationNode}
        {...dataOrAriaAttributeProps}
      >
        {totalText}
        <li
          title={props.showTitle ? locale.prev_page : null}
          onClick={this.prev}
          tabIndex={prevDisabled ? null : 0}
          onKeyPress={this.runIfEnterPrev}
          className={`${!prevDisabled ? '' : `${prefixCls}-disabled`} ${prefixCls}-prev`}
          aria-disabled={prevDisabled}
        >
          {props.itemRender(
            prevPage,
            'prev',
            this.getItemIcon(props.prevIcon)
          )}
        </li>
        {pagerList}
        <li
          title={props.showTitle ? locale.next_page : null}
          onClick={this.next}
          tabIndex={nextDisabled ? null : 0}
          onKeyPress={this.runIfEnterNext}
          className={`${!nextDisabled ? '' : `${prefixCls}-disabled`} ${prefixCls}-next`}
          aria-disabled={nextDisabled}
        >
          {props.itemRender(
            nextPage,
            'next',
            this.getItemIcon(props.nextIcon)
          )}
        </li>
        <Options
          disabled={disabled}
          locale={props.locale}
          rootPrefixCls={prefixCls}
          selectComponentClass={props.selectComponentClass}
          selectPrefixCls={props.selectPrefixCls}
          changeSize={this.props.showSizeChanger ? this.changePageSize : null}
          current={this.state.current}
          pageSize={this.state.pageSize}
          pageSizeOptions={this.props.pageSizeOptions}
          quickGo={this.shouldDisplayQuickJumper() ? this.handleChange : null}
          goButton={goButton}
        />
      </ul>
    );
  }
}

polyfill(Pagination);

export default Pagination;
