/* eslint func-names: 0, no-console: 0 */
import React from 'react';
import '../../assets/index.less';
import 'rc-select/assets/index.less';
import PaginationWithSizeChanger from './utils/commonUtil';

class App extends React.Component {
  state = {
    pageSize: 15,
  };

  onShowSizeChange = (current, pageSize) => {
    console.log(current);
    this.setState({ pageSize });
  };

  render() {
    const { pageSize } = this.state;
    return (
      <div style={{ margin: 10 }}>
        <PaginationWithSizeChanger
          showSizeChanger
          pageSize={pageSize}
          onShowSizeChange={this.onShowSizeChange}
          defaultCurrent={3}
          total={40}
        />
        <PaginationWithSizeChanger
          pageSize={pageSize}
          onShowSizeChange={this.onShowSizeChange}
          defaultCurrent={3}
          total={50}
        />
        <PaginationWithSizeChanger
          pageSize={pageSize}
          onShowSizeChange={this.onShowSizeChange}
          defaultCurrent={3}
          total={60}
        />
        <PaginationWithSizeChanger
          showSizeChanger={false}
          pageSize={pageSize}
          onShowSizeChange={this.onShowSizeChange}
          defaultCurrent={3}
          total={60}
        />
      </div>
    );
  }
}

export default App;
