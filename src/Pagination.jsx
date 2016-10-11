const React = require('react');
const Pager = require('./Pager');
const Options = require('./Options');
const KEYCODE = require('./KeyCode');
const LOCALE = require('./locale/zh_CN');

function noop() {
}

class Pagination extends React.Component {
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
      current: current,
      _current: current,
      pageSize: pageSize,
    };

    [
      'render',
      '_handleChange',
      '_handleKeyUp',
      '_handleKeyDown',
      '_changePageSize',
      '_isValid',
      '_prev',
      '_next',
      '_hasPrev',
      '_hasNext',
      '_jumpPrev',
      '_jumpNext',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if ('current' in nextProps) {
      this.setState({
        current: nextProps.current,
        _current: nextProps.current,
      });
    }

    if ('pageSize' in nextProps) {
      const newState = {};
      let current = this.state.current;
      const newCurrent = this._calcPage(nextProps.pageSize);
      current = current > newCurrent ? newCurrent : current;
      if (!('current' in nextProps)) {
        newState.current = current;
        newState._current = current;
      }
      newState.pageSize = nextProps.pageSize;
      this.setState(newState);
    }
  }

  // private methods

  _calcPage(p) {
    let pageSize = p;
    if (typeof pageSize === 'undefined') {
      pageSize = this.state.pageSize;
    }
    return Math.floor((this.props.total - 1) / pageSize) + 1;
  }

  _isValid(page) {
    return typeof page === 'number' && page >= 1 && page !== this.state.current;
  }

  _handleKeyDown(evt) {
    if (evt.keyCode === KEYCODE.ARROW_UP || evt.keyCode === KEYCODE.ARROW_DOWN) {
      evt.preventDefault();
    }
  }

  _handleKeyUp(evt) {
    const _val = evt.target.value;
    let val;

    if (_val === '') {
      val = _val;
    } else if (isNaN(Number(_val))) {
      val = this.state._current;
    } else {
      val = Number(_val);
    }

    this.setState({
      _current: val,
    });

    if (evt.keyCode === KEYCODE.ENTER) {
      this._handleChange(val);
    } else if (evt.keyCode === KEYCODE.ARROW_UP) {
      this._handleChange(val - 1);
    } else if (evt.keyCode === KEYCODE.ARROW_DOWN) {
      this._handleChange(val + 1);
    }
  }

  _changePageSize(size) {
    let current = this.state.current;
    const newCurrent = this._calcPage(size);
    current = current > newCurrent ? newCurrent : current;
    if (typeof size === 'number') {
      if (!('pageSize' in this.props)) {
        this.setState({
          pageSize: size,
        });
      }
      if (!('current' in this.props)) {
        this.setState({
          current: current,
          _current: current,
        });
      }
    }
    this.props.onShowSizeChange(current, size);
  }

  _handleChange(p) {
    let page = p;
    if (this._isValid(page)) {
      if (page > this._calcPage()) {
        page = this._calcPage();
      }

      if (!('current' in this.props)) {
        this.setState({
          current: page,
          _current: page,
        });
      }

      this.props.onChange(page);

      return page;
    }

    return this.state.current;
  }

  _prev() {
    if (this._hasPrev()) {
      this._handleChange(this.state.current - 1);
    }
  }

  _next() {
    if (this._hasNext()) {
      this._handleChange(this.state.current + 1);
    }
  }

  _jumpPrev() {
    this._handleChange(Math.max(1, this.state.current - 5));
  }

  _jumpNext() {
    this._handleChange(Math.min(this._calcPage(), this.state.current + 5));
  }

  _hasPrev() {
    return this.state.current > 1;
  }

  _hasNext() {
    return this.state.current < this._calcPage();
  }

  render() {
    const props = this.props;
    const locale = props.locale;

    const prefixCls = props.prefixCls;
    const allPages = this._calcPage();
    const pagerList = [];
    let jumpPrev = null;
    let jumpNext = null;
    let firstPager = null;
    let lastPager = null;

    if (props.simple) {
      return (
        <ul className={`${prefixCls} ${prefixCls}-simple ${props.className}`}>
          <li title={locale.prev_page} onClick={this._prev} className={(this._hasPrev() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-prev`}>
            <a></a>
          </li>
          <div title={`${this.state.current}/${allPages}`} className={`${prefixCls}-simple-pager`}>
            <input type="text" value={this.state._current} onKeyDown={this._handleKeyDown} onKeyUp={this._handleKeyUp} onChange={this._handleKeyUp} />
            <span className={`${prefixCls}-slash`}>／</span>
            {allPages}
          </div>
          <li title={locale.next_page} onClick={this._next} className={(this._hasNext() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-next`}>
            <a></a>
          </li>
        </ul>
      );
    }

    if (allPages <= 9) {
      for (let i = 1; i <= allPages; i++) {
        const active = this.state.current === i;
        pagerList.push(<Pager locale={locale} rootPrefixCls={prefixCls} onClick={this._handleChange.bind(this, i)} key={i} page={i} active={active} />);
      }
    } else {
      jumpPrev = (<li title={locale.prev_5} key="prev" onClick={this._jumpPrev} className={`${prefixCls}-jump-prev`}>
        <a></a>
      </li>);
      jumpNext = (<li title={locale.next_5} key="next" onClick={this._jumpNext} className={`${prefixCls}-jump-next`}>
        <a></a>
      </li>);
      lastPager = (<Pager
        locale={props.locale}
        last rootPrefixCls={prefixCls} onClick={this._handleChange.bind(this, allPages)} key={allPages} page={allPages} active={false} />);
      firstPager = (<Pager
        locale={props.locale}
        rootPrefixCls={prefixCls} onClick={this._handleChange.bind(this, 1)} key={1} page={1} active={false} />);

      const current = this.state.current;

      let left = Math.max(1, current - 2);
      let right = Math.min(current + 2, allPages);

      if (current - 1 <= 2) {
        right = 1 + 4;
      }

      if (allPages - current <= 2) {
        left = allPages - 4;
      }

      for (let i = left; i <= right; i++) {
        const active = current === i;
        pagerList.push(<Pager
          locale={props.locale}
          rootPrefixCls={prefixCls} onClick={this._handleChange.bind(this, i)} key={i} page={i} active={active} />);
      }

      if (current - 1 >= 4) {
        pagerList.unshift(jumpPrev);
      }
      if (allPages - current >= 4) {
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
      totalText = <span className={`${prefixCls}-total-text`}>{props.showTotal(props.total)}</span>;
    }

    return (
      <ul
        className={`${prefixCls} ${props.className}`}
        style={props.style}
        unselectable="unselectable"
      >
        {totalText}
        <li title={locale.prev_page} onClick={this._prev} className={(this._hasPrev() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-prev`}>
          <a></a>
        </li>
        {pagerList}
        <li title={locale.next_page} onClick={this._next} className={(this._hasNext() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-next`}>
          <a></a>
        </li>
        <Options
          locale={props.locale}
          rootPrefixCls={prefixCls}
          selectComponentClass={props.selectComponentClass}
          selectPrefixCls={props.selectPrefixCls}
          changeSize={this.props.showSizeChanger ? this._changePageSize.bind(this) : null}
          current={this.state.current}
          pageSize={this.state.pageSize}
          pageSizeOptions={this.props.pageSizeOptions}
          quickGo={this.props.showQuickJumper ? this._handleChange.bind(this) : null}
        />
      </ul>
    );
  }

}

Pagination.propTypes = {
  current: React.PropTypes.number,
  defaultCurrent: React.PropTypes.number,
  total: React.PropTypes.number,
  pageSize: React.PropTypes.number,
  defaultPageSize: React.PropTypes.number,
  onChange: React.PropTypes.func,
  showSizeChanger: React.PropTypes.bool,
  onShowSizeChange: React.PropTypes.func,
  selectComponentClass: React.PropTypes.func,
  showQuickJumper: React.PropTypes.bool,
  pageSizeOptions: React.PropTypes.arrayOf(React.PropTypes.string),
  showTotal: React.PropTypes.func,
  locale: React.PropTypes.object,
  style: React.PropTypes.object,
};

Pagination.defaultProps = {
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
  onShowSizeChange: noop,
  locale: LOCALE,
  style: {},
};

module.exports = Pagination;
