/* eslint func-names: 0, no-console: 0 */
import React from 'react';
import Pagination from 'rc-pagination';
import '../../assets/index.less';
import 'rc-select/assets/index.less';

export default class App extends React.Component {
  state = {
    current: 3,
  };

  onChange = page => {
    // console.log(page);
    this.setState({
      current: page,
    });
  };

  render() {
    return (
      <Pagination
        onChange={this.onChange}
        current={1}
        total={25}
      />
    );
  }
}
