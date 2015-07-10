'use strict';

let React = require('react');
let Pager = require('./Pager');


function noop() {}

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: props.current
    };

    ['_prev', '_next', '_hasPrev', '_hasNext', '_jumpPrev', '_jumpNext', '_canJumpPrev', '_canJumpNext'].map((method) => this[method] = this[method].bind(this));
  }


  render() {
    let prefixCls = 'rc-pagination';

    let allPages = this._calcPage();
    let pagerList = [];
    let jumpPrev = null;
    let jumpNext = null;

    if (allPages <= 9) {
      for (let i = 1; i <= allPages; i++) {
        let active = this.state.current === i;
        pagerList.push(<Pager onClick={this._handleClick.bind(this, i)} key={i} page={i} active={active} />);
      }
    } else {
      jumpPrev = <li key="prev" onClick={this._jumpPrev} className="jump-prev"><a>&middot;&middot;&middot;</a></li>;
      jumpNext = <li key="next" onClick={this._jumpNext} className="jump-next"><a>&middot;&middot;&middot;</a></li>;

      let current = this.state.current;

      if (current <= 5) {
        for (let i = 1; i <= 5; i++) {
          let active = current === i;
          pagerList.push(<Pager onClick={this._handleClick.bind(this, i)} key={i} page={i} active={active} />);
        }
        pagerList.push(jumpNext);
        pagerList.push(<Pager onClick={this._handleClick.bind(this, allPages)} key={allPages} page={allPages} active={false} />);
      } else if (allPages - current < 5) {
        pagerList.push(<Pager onClick={this._handleClick.bind(this, 1)} key={1} page={1} active={false} />);
        pagerList.push(jumpPrev);
        for (let i = allPages - 4; i <= allPages; i++) {
          let active = current === i;
          pagerList.push(<Pager onClick={this._handleClick.bind(this, i)} key={i} page={i} active={active} />);
        }
      } else {
        pagerList.push(<Pager onClick={this._handleClick.bind(this, 1)} key={1} page={1} active={false} />);
        pagerList.push(jumpPrev);
        for (let i = current - 2; i <= current + 2; i++) {
          let active = current === i;
          pagerList.push(<Pager onClick={this._handleClick.bind(this, i)} key={i} page={i} active={active} />);
        }
        pagerList.push(jumpNext);
        pagerList.push(<Pager onClick={this._handleClick.bind(this, allPages)} key={allPages} page={allPages} active={false} />);
      }

    }

    return (
      <ul className={prefixCls}>
        <li onClick={this._prev} className={(this._hasPrev() ? '' : 'disabled ') + 'prev'}><a>&lt;</a></li>
        {pagerList}
        <li onClick={this._next} className={(this._hasNext() ? '' : 'disabled ') + 'next'}><a>&gt;</a></li>
      </ul>
    );
  }

  // private methods

  _calcPage() {
    let props = this.props;
    let total = props.total;

    return Math.floor((total - 1) / props.pageSize);
  }

  _handleClick(page) {
    this.setState({current: page});
    this.props.onChange(page);
  }

  _prev() {
    if (!this._hasPrev()) {
      this._handleClick(this.state.current - 1);
    }
  }

  _next() {
    if (this._hasNext()) {
      this._handleClick(this.state.current + 1);
    }
  }

  _jumpPrev() {
    if (this._canJumpPrev()) {
      this._handleClick(this.state.current - 5);
    }
  }

  _jumpNext() {
    if (this._canJumpNext()) {
      this._handleClick(this.state.current + 5);
    }
  }

  _hasPrev() {
    return this.state.current > 1;
  }

  _hasNext() {
    return this.state.current < this._calcPage();
  }

  _canJumpPrev() {
    return this.state.current > 5;
  }

  _canJumpNext() {
    return this._calcPage() - this.state.current > 5;
  }

}

Pagination.propTypes = {
  current: React.PropTypes.number,
  total: React.PropTypes.number,
  pageSize: React.PropTypes.number,
  onChange: React.PropTypes.func
};

Pagination.defaultProps = {
  current: 1,
  pageSize: 10,
  onChange: noop
};

module.exports = Pagination;
