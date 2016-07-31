/* eslint func-names: 0, no-console: 0 */
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
