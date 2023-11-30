// import 'rc-select/assets/index.less';
import Select from 'rc-select';
import React from 'react';
import Pagination from '../src';

class Hello extends React.Component {
  state = {
    pageSize: 20,
  };

  changeSize = () => {
    this.setState({ pageSize: 50 });
  };

  onShowSizeChange = () => {};

  render() {
    return (
      <>
        <button type="button" className="hook" onClick={this.changeSize}>
          ChaneSize
        </button>
        <Pagination
          className="p1"
          selectComponentClass={Select}
          showSizeChanger
          pageSize={this.state.pageSize}
          onShowSizeChange={this.onShowSizeChange}
          defaultCurrent={3}
          total={500}
        />
        <Pagination
          className="p2"
          selectComponentClass={Select}
          showSizeChanger
          pageSize={this.state.pageSize}
          onShowSizeChange={this.onShowSizeChange}
          defaultCurrent={3}
          total={500}
        />
      </>
    );
  }
}

export default Hello;
