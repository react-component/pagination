/* eslint func-names: 0, no-console: 0 */
require('rc-pagination/assets/index.less');
require('rc-select/assets/index.css');
const Pagination = require('rc-pagination');
const React = require('react');
const ReactDOM = require('react-dom');
import Select from 'rc-select';

const Hello = React.createClass({
  getInitialState: function() {
    return {
      pageSize: 20,
    };
  },
  onShowSizeChange(current, pageSize) {
    console.log(current);
    this.setState({ pageSize });
  },
  render() {
    return (
      <div style={{margin: 10}}>
        <Pagination
          selectComponentClass={Select}
          showSizeChanger pageSize={this.state.pageSize} onShowSizeChange={this.onShowSizeChange} defaultCurrent={3} total={500} />
        <Pagination
          selectComponentClass={Select}
          showSizeChanger pageSize={this.state.pageSize} onShowSizeChange={this.onShowSizeChange} defaultCurrent={3} total={500} />
      </div>
    );
  },
});

ReactDOM.render(<Hello />, document.getElementById('__react-content'));
