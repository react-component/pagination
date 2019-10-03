/* eslint func-names: 0, no-console: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.less';

class App extends React.Component {
  state = {
    current: 3,
  };
  onChange = (page) => {
    console.log(page);
    this.setState({
      current: page,
    });
  }
  render() {
    return (
      <Pagination
        focusOnListItem={false}
        onChange={this.onChange}
        current={this.state.current}
        total={25}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('__react-content'));
