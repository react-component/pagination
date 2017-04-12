import 'rc-select/assets/index.css';
import Pagination from 'rc-pagination';
import React from 'react';
import Select from 'rc-select';

class Hello extends React.Component {
  state = {
    pageSize: 20,
  };
  changeSize = () => {
    this.setState({
      pageSize: 50,
    });
  }
  render() {
    return (
      <div style={{ margin: 10 }}>
        <button className="hook" onClick={this.changeSize}>
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
      </div>
    );
  }
}

export default Hello;
