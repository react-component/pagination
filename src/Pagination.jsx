'use strict';

let React = require('react');
let Pager = require('./Pager')

class Pagination extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currnt: props.current
    }

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
        {pagerList}
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
}

Pagination.propTypes = {
  currnt: React.PropTypes.number,
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
