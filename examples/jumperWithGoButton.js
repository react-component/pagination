/* eslint func-names: 0, no-console: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'rc-select';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.less';
import 'rc-select/assets/index.css';

class App extends React.Component {

  onShowSizeChange = (current, pageSize) => {
    console.log(current);
    console.log(pageSize);
  }

  onChange = (current, pageSize) => {
    console.log('onChange:current=', current);
    console.log('onChange:pageSize=', pageSize);
  }

  render() {
    const quickJumper = {
      goButton: true,
    };
    return (
      <div>
        <Pagination
          selectComponentClass={Select}
          showQuickJumper={quickJumper}
          showSizeChanger
          defaultPageSize={20}
          defaultCurrent={5}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onChange}
          total={450}
        />
        <Pagination simple goButton defaultCurrent={1} total={50} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('__react-content'));
