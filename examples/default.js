// use jsx to render html, do not modify simple.html
'use strict';

require('rc-pagination/assets/index.less');
var Pagination = require('rc-pagination');
var React = require('react');


var Container = React.createClass({
  getInitialState(){
    return {
      current: 3
    }
  },
  onChange(page) {
    console.log(page)
    this.setState({
      current: page
    })
  },
  render() {
    return <Pagination onChange={this.onChange} current={this.state.current} total={25} />
  }
});

React.render(
  <Container />,
  document.getElementById('__react-content')
);
