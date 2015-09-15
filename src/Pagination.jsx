'use strict';

let React = require('react');
let Pager = require('./Pager');
let Options = require('./Options');
let KEYCODE = require('./KeyCode');


function noop() {
}

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: props.current,
      _current: props.current,
      pageSize: props.pageSize
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
      '_jumpNext'
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if ('current' in nextProps) {
      this.setState({
        current: nextProps.current
      });
    }

    if ('pageSize' in nextProps) {
      this.setState({
        pageSize: nextProps.pageSize
      });
    }
  }

  render() {
    let props = this.props;

    let prefixCls = props.prefixCls;
    let allPages = this._calcPage();
    let pagerList = [];
    let jumpPrev = null;
    let jumpNext = null;
    let firstPager = null;
    let lastPager = null;

    if (props.simple) {
      return (
        <ul className={`${prefixCls} ${prefixCls}-simple ${props.className}`}>
          <li title="Previous Page" onClick={this._prev} className={(this._hasPrev() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-prev`}>
            <a></a>
          </li>
          <div title={`Page ${this.state.current} of ${allPages}`} className={`${prefixCls}-simple-pager`}>
            <input type="text" value={this.state._current} onKeyDown={this._handleKeyDown} onKeyUp={this._handleKeyUp} onChange={this._handleKeyUp} />
            <span className={`${prefixCls}-slash`}>／</span>
            {allPages}
          </div>
          <li title="Next Page" onClick={this._next} className={(this._hasNext() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-next`}>
            <a></a>
          </li>
        </ul>
      );
    }

    if (allPages <= 9) {
      for (let i = 1; i <= allPages; i++) {
        let active = this.state.current === i;
        pagerList.push(<Pager rootPrefixCls={prefixCls} onClick={this._handleChange.bind(this, i)} key={i} page={i} active={active} />);
      }
    } else {
      jumpPrev = <li title="Previous 5 Page" key="prev" onClick={this._jumpPrev} className={`${prefixCls}-jump-prev`}>
        <a></a>
      </li>;
      jumpNext = <li title="Next 5 Page" key="next" onClick={this._jumpNext} className={`${prefixCls}-jump-next`}>
        <a></a>
      </li>;
      lastPager = <Pager last={true} rootPrefixCls={prefixCls} onClick={this._handleChange.bind(this, allPages)} key={allPages} page={allPages} active={false} />;
      firstPager = <Pager rootPrefixCls={prefixCls} onClick={this._handleChange.bind(this, 1)} key={1} page={1} active={false} />;

      let current = this.state.current;

      let left = Math.max(1, current - 2), right = Math.min(current + 2, allPages);

      if (current - 1 <= 2) {
        right = 1 + 4;
      }

      if (allPages - current <= 2) {
        left = allPages - 4;
      }

      for (let i = left; i <= right; i++) {
        let active = current === i;
        pagerList.push(<Pager rootPrefixCls={prefixCls} onClick={this._handleChange.bind(this, i)} key={i} page={i} active={active} />);
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

    return (
      <ul className={`${prefixCls} ${props.className}`}
        unselectable="unselectable">
        <li title="Previous Page" onClick={this._prev} className={(this._hasPrev() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-prev`}>
          <a></a>
        </li>
        {pagerList}
        <li title="Next Page" onClick={this._next} className={(this._hasNext() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-next`}>
          <a></a>
        </li>
        <Options rootPrefixCls={prefixCls}
          selectComponentClass={props.selectComponentClass}
          selectPrefixCls={props.selectPrefixCls}
          changeSize={this.props.showSizeChanger ? this._changePageSize.bind(this) : null}
          current={this.state.current}
          quickGo={this.props.showQuickJumper ? this._handleChange.bind(this) : null} />
      </ul>
    );
  }

  // private methods

  _calcPage() {
    return Math.floor((this.props.total - 1) / this.state.pageSize) + 1;
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
    let _val = evt.target.value;
    let val;

    if (_val === '') {
      val = _val;
    } else if (isNaN(Number(_val))) {
      val = this.state._current;
    } else {
      val = Number(_val);
    }

    this.setState({
      _current: val
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
    if (typeof size === 'number') {
      this.setState({
        pageSize: size
      });
    }
  }

  _handleChange(page) {
    if (this._isValid(page)) {
      if (page > this._calcPage()) {
        page = this._calcPage();
      }
      this.setState({
        current: page,
        _current: page
      });
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
}

Pagination.propTypes = {
  current: React.PropTypes.number,
  total: React.PropTypes.number,
  pageSize: React.PropTypes.number,
  onChange: React.PropTypes.func,
  showSizeChanger: React.PropTypes.bool,
  selectComponentClass:React.PropTypes.func,
  showQuickJumper: React.PropTypes.bool
};

Pagination.defaultProps = {
  current: 1,
  total: 0,
  pageSize: 10,
  onChange: noop,
  className: '',
  selectPrefixCls: 'rc-select',
  prefixCls: 'rc-pagination',
  selectComponentClass:null,
  showQuickJumper: false,
  showSizeChanger: false
};

module.exports = Pagination;
