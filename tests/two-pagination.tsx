// import 'rc-select/assets/index.less';
import React from 'react';
import Pagination from '../src';
import { sizeChangerRender } from './commonUtil';

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
          sizeChangerRender={sizeChangerRender}
          showSizeChanger
          pageSize={this.state.pageSize}
          onShowSizeChange={this.onShowSizeChange}
          defaultCurrent={3}
          total={500}
        />
        <Pagination
          className="p2"
          sizeChangerRender={sizeChangerRender}
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
