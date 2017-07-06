import React from 'react';
import PropTypes from 'prop-types';
import Pager from './Pager';
import Options from './Options';
import KEYCODE from './KeyCode';
import LOCALE from './locale/zh_CN';

function noop() {
}

function isInteger(value) {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
}

function defaultItemRender(page, type) {
  return <a>{type === 'page' ? page : ''}</a>;
}

export default class Pagination extends React.Component {
  static propTypes = {
    current: PropTypes.number,
    defaultCurrent: PropTypes.number,
    total: PropTypes.number,
    pageSize: PropTypes.number,
    defaultPageSize: PropTypes.number,
    onChange: PropTypes.func,
    showSizeChanger: PropTypes.bool,
    showLessItems: PropTypes.bool,
    onShowSizeChange: PropTypes.func,
    selectComponentClass: PropTypes.func,
    showQuickJumper: PropTypes.bool,
    showTitle: PropTypes.bool,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.string),
    showTotal: PropTypes.func,
    locale: PropTypes.object,
    style: PropTypes.object,
    itemRender: PropTypes.func,
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
    showQuickJumper: false,
    showSizeChanger: false,
    showLessItems: false,
    showTitle: true,
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

  componentWillReceiveProps(nextProps) {
    if ('current' in nextProps) {
      this.setState({
        current: nextProps.current,
        currentInputValue: nextProps.current,
      });
    }

    if ('pageSize' in nextProps) {
      const newState = {};
      let current = this.state.current;
      const newCurrent = this.calculatePage(nextProps.pageSize);
      current = current > newCurrent ? newCurrent : current;
      if (!('current' in nextProps)) {
        newState.current = current;
        newState.currentInputValue = current;
      }
      newState.pageSize = nextProps.pageSize;
      this.setState(newState);
    }
  }

  getJumpPrevPage() {
    return Math.max(1, this.state.current - (this.props.showLessItems ? 3 : 5));
  }

  getJumpNextPage() {
    return Math.min(this.calculatePage(), this.state.current + (this.props.showLessItems ? 3 : 5));
  }

  calculatePage = (p) => {
    let pageSize = p;
    if (typeof pageSize === 'undefined') {
      pageSize = this.state.pageSize;
    }
    return Math.floor((this.props.total - 1) / pageSize) + 1;
  }

  isValid = (page) => {
    return isInteger(page) && page >= 1 && page !== this.state.current;
  }

  handleKeyDown = (e) => {
    if (e.keyCode === KEYCODE.ARROW_UP || e.keyCode === KEYCODE.ARROW_DOWN) {
      e.preventDefault();
    }
  }

  handleKeyUp = (e) => {
    const inputValue = e.target.value;
    let value;

    if (inputValue === '') {
      value = inputValue;
    } else if (isNaN(Number(inputValue))) {
      value = this.state.currentInputValue;
    } else {
      value = Number(inputValue);
    }

    this.setState({
      currentInputValue: value,
    });

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
    const newCurrent = this.calculatePage(size);
    current = current > newCurrent ? newCurrent : current;
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
    let page = p;
    if (this.isValid(page)) {
      if (page > this.calculatePage()) {
        page = this.calculatePage();
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

  getJumpPrevPage() {
    return Math.max(1, this.state.current - (this.props.showLessItems ? 3 : 5));
  }

  getJumpNextPage() {
    return Math.min(this.calculatePage(), this.state.current + (this.props.showLessItems ? 3 : 5));
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
    return this.state.current < this.calculatePage();
  }

  runIfEnter = (event, callback, ...restParams) => {
    if (event.key === 'Enter' || event.charCode === 13) {
      callback(...restParams);
    }
  }

  render() {
    const props = this.props;
    const locale = props.locale;

    const prefixCls = props.prefixCls;
    const allPages = this.calculatePage();
    const pagerList = [];
    let jumpPrev = null;
    let jumpNext = null;
    let firstPager = null;
    let lastPager = null;

    const pageBufferSize = props.showLessItems ? 1 : 2;
    const { current, pageSize } = this.state;

    if (props.simple) {
      return (
        <ul className={`${prefixCls} ${prefixCls}-simple ${props.className}`}>
          <li
            title={props.showTitle ? locale.prev_page : null}
            onClick={this.prev}
            tabIndex="0"
            onKeyPress={(e) => this.runIfEnter(e, this.prev)}
            className={`${this.hasPrev() ? '' : `${prefixCls}-disabled`} ${prefixCls}-prev`}
            aria-disabled={!this.hasPrev()}
          >
            <a />
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
            tabIndex="0"
            onKeyPress={(e) => this.runIfEnter(e, this.next)}
            className={`${this.hasNext() ? '' : `${prefixCls}-disabled`} ${prefixCls}-next`}
            aria-disabled={!this.hasNext()}
          >
            <a />
          </li>
        </ul>
      );
    }

    if (allPages <= 5 + pageBufferSize * 2) {
      for (let i = 1; i <= allPages; i++) {
        const active = this.state.current === i;
        pagerList.push(
          <Pager
            locale={locale}
            rootPrefixCls={prefixCls}
            onClick={() => { this.handleChange(i); }}
            onKeyPress={ (e) => { this.runIfEnter(e, this.handleChange, i);} }
            key={i}
            page={i}
            active={active}
            showTitle={props.showTitle}
            itemRender={props.itemRender}
          />
        );
      }
    } else {
      const prevItemTitle = props.showLessItems ? locale.prev_3 : locale.prev_5;
      const nextItemTitle = props.showLessItems ? locale.next_3 : locale.next_5;
      jumpPrev = (
        <li
          title={props.showTitle ? prevItemTitle : null}
          key="prev"
          onClick={this.jumpPrev}
          tabIndex="0"
          onKeyPress={(e) => this.runIfEnter(e, this.jumpPrev)}
          className={`${prefixCls}-jump-prev`}
        >
          {props.itemRender(this.getJumpPrevPage(), 'jump-prev')}
        </li>
      );
      jumpNext = (
        <li
          title={props.showTitle ? nextItemTitle : null}
          key="next"
          tabIndex="0"
          onClick={this.jumpNext}
          onKeyPress={(e) => this.runIfEnter(e, this.jumpNext)}
          className={`${prefixCls}-jump-next`}
        >
          {props.itemRender(this.getJumpNextPage(), 'jump-next')}
        </li>
      );
      lastPager = (
        <Pager
          locale={props.locale}
          last
          rootPrefixCls={prefixCls}
          onClick={() => this.handleChange(allPages)}
          onKeyPress={(e) => { this.runIfEnter(e, this.handleChange, allPages); }}
          key={allPages}
          page={allPages}
          active={false}
          showTitle={props.showTitle}
          itemRender={props.itemRender}
        />
      );
      firstPager = (
        <Pager
          locale={props.locale}
          rootPrefixCls={prefixCls}
          onClick={() => this.handleChange(1)}
          onKeyPress={(e) => { this.runIfEnter(e, this.handleChange, 1); }}
          key={1}
          page={1}
          active={false}
          showTitle={props.showTitle}
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
            onClick={() => this.handleChange(i)}
            onKeyPress={(e) => { this.runIfEnter(e, this.handleChange, i); }}
            key={i}
            page={i}
            active={active}
            showTitle={props.showTitle}
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
              (current - 1) * pageSize + 1,
              current * pageSize > props.total ? props.total : current * pageSize,
            ]
          )}
        </li>
      );
    }
    const prevDisabled = !this.hasPrev();
    const nextDisabled = !this.hasNext();
    const prevPage = this.state.current - 1 > 0 ? this.state.current - 1 : 0;
    const nextPage = this.state.current + 1 < allPages ? this.state.current + 1 : allPages;
    return (
      <ul
        className={`${prefixCls} ${props.className}`}
        style={props.style}
        unselectable="unselectable"
      >
        {totalText}
        <li
          title={props.showTitle ? locale.prev_page : null}
          onClick={this.prev}
          tabIndex="0"
          onKeyPress={(e) => this.runIfEnter(e, this.prev)}
          className={`${!prevDisabled ? '' : `${prefixCls}-disabled`} ${prefixCls}-prev`}
          aria-disabled={prevDisabled}
        >
          {props.itemRender(prevPage, 'prev')}
        </li>
        {pagerList}
        <li
          title={props.showTitle ? locale.next_page : null}
          onClick={this.next}
          tabIndex="0"
          onKeyPress={(e) => this.runIfEnter(e, this.next)}
          className={`${!nextDisabled ? '' : `${prefixCls}-disabled`} ${prefixCls}-next`}
          aria-disabled={nextDisabled}
        >
          {props.itemRender(nextPage, 'next')}
        </li>
        <Options
          locale={props.locale}
          rootPrefixCls={prefixCls}
          selectComponentClass={props.selectComponentClass}
          selectPrefixCls={props.selectPrefixCls}
          changeSize={this.props.showSizeChanger ? this.changePageSize : null}
          current={this.state.current}
          pageSize={this.state.pageSize}
          pageSizeOptions={this.props.pageSizeOptions}
          quickGo={this.props.showQuickJumper ? this.handleChange : null}
        />
      </ul>
    );
  }
}
