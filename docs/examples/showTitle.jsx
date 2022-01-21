/* eslint func-names: 0, no-console: 0 */
import React from 'react';
import Select from 'rc-select';
import Pagination from 'rc-pagination';
import '../../assets/index.less';
import 'rc-select/assets/index.less';

class App extends React.Component {
  state = {
    current: 3,
    pageSize: 10,
  };

  onShowSizeChange = (current, pageSize) => {
    this.setState({ pageSize });
  };

  onChange = page => {
    console.log(page);
    this.setState({
      current: page,
    });
  };

  render() {
    const { pageSize } = this.state;
    return (
      <div>
        <Pagination
          onChange={this.onChange}
          current={this.state.current}
          total={80}
          showLessItems
          showTitle={false}
          pageSize={pageSize}
          showSizeChanger
          selectComponentClass={Select}
          onShowSizeChange={this.onShowSizeChange}
        />
        <Pagination
          showLessItems
          defaultCurrent={1}
          total={60}
          showTitle={false}
        />
      </div>
    );
  }
}

export default App;
