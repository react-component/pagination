/* eslint func-names: 0, no-console: 0 */
import React from 'react';
import Select from 'rc-select';
import Pagination from 'rc-pagination';
import '../../assets/index.less';
import 'rc-select/assets/index.less';

class App extends React.Component {
  onShowSizeChange = (current, pageSize) => {
    console.log(current);
    console.log(pageSize);
  };

  onChange = (current, pageSize) => {
    console.log('onChange:current=', current);
    console.log('onChange:pageSize=', pageSize);
  };

  render() {
    return (
      <>
        <p> customize node </p>
        <Pagination
          selectComponentClass={Select}
          showSizeChanger
          showQuickJumper={{ goButton: <button type="button">确定</button> }}
          defaultPageSize={20}
          defaultCurrent={5}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onChange}
          total={450}
        />
        <p> default node </p>
        <Pagination
          simple
          showQuickJumper={{ goButton: true }}
          defaultCurrent={1}
          total={50}
        />
      </>
    );
  }
}

export default App;
