'use strict';

let React = require('react');
let Pager = require('./Pager')

class Pagination extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: props.current
    }

    ;['_prev', '_next', '_hasPrev', '_hasNext'].map((method) => this[method] = this[method].bind(this))
  }


  render() {
    let prefixCls = 'rc-pagination'

    let allPages = this._calcPage()
    let pagerList = []

    if (allPages <= 9) {
      for (let i = 1; i <= allPages; i++) {
        let active = this.state.current === i
        pagerList.push(<Pager onClick={this._handleClick.bind(this, i)} key={i} page={i} active={active} />)
      }
    } else {
      pagerList = [<Pager page={1} />]
    }

    return (
      <ul className={prefixCls}>
        <li onClick={this._prev} className={(this._hasPrev() ? '' : 'disabled ') + 'prev'}><a>&lt;</a></li>
        {pagerList}
        <li onClick={this._next} className={(this._hasNext() ? '' : 'disabled ') + 'next'}><a>&gt;</a></li>
      </ul>
    )
  }

  // private methods

  _calcPage() {
    let props = this.props
    let total = props.total

    return Math.floor((total - 1) / props.pageSize)
  }

  _handleClick(page) {
    this.setState({current: page})
    this.props.onChange(page)
  }

  _prev() {
    let state = this.state
    if (!this._hasPrev()) {
      return
    }

    this._handleClick(state.current - 1)
  }

  _next() {
    let state = this.state
    if (!this._hasNext()) {
      return
    }

    this._handleClick(state.current + 1)
  }

  _hasPrev() {
    return this.state.current > 1
  }

  _hasNext() {
    return this.state.current < this._calcPage()
  }

}

Pagination.propTypes = {
  current: React.PropTypes.number,
  total: React.PropTypes.number,
  pageSize: React.PropTypes.number,
  onChange: React.PropTypes.func
}

Pagination.defaultProps = {
  current: 1,
  pageSize: 10,
  onChange: noop,
}

module.exports = Pagination;

function noop() {}
