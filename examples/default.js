// use jsx to render html, do not modify simple.html

require('rc-pagination/assets/index.less');
const Pagination = require('rc-pagination');
const React = require('react');


const Container = React.createClass({
  getInitialState() {
    return {
      current: 3,
    };
  },
  onChange(page) {
    console.log(page);
    this.setState({
      current: page,
    });
  },
  render() {
    return <Pagination onChange={this.onChange} current={this.state.current} total={25} />;
  },
});

React.render(
  <Container />,
  document.getElementById('__react-content')
);
