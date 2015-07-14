'use strict';

let React = require('react');
let Select = require('rc-select');
let Option = Select.Option;

class Options extends React.Component {
  constructor(props) {
    super(props);
    ['_quickGo', '_changeSize'].map((method) => this[method] = this[method].bind(this));
  }
  render() {
    let props = this.props;
    var prefixCls = `${props.rootPrefixCls}-options`;
    let changeSize = props.changeSize;
    let quickGo = props.quickGo;

    let changeSelect = null;
    let goInput = null;

    if (!(changeSize || quickGo)) {
      return null;
    }

    if (changeSize) {
      changeSelect = (
       <Select prefixCls={props.selectPrefixCls} showSearch={false}
         className={`${prefixCls}-size-changer`}
         defaultValue="10" onChange={this._changeSize}>
        <Option value="10">10 条/页</Option>
        <Option value="20">20 条/页</Option>
        <Option value="30">30 条/页</Option>
        <Option value="40">40 条/页</Option>
       </Select>
      );
    }

    if (quickGo) {
      goInput = (
        <div className={`${prefixCls}-quick-jumper`}>
          跳至
          <input type="text" value={props.current} onChange={this._quickGo} />
          页
        </div>
      );
    }

    return (
      <div className={`${prefixCls}`}>
        {changeSelect}
        {goInput}
      </div>
    );
  }

  _changeSize(value) {
    this.props.changeSize(Number(value));
  }
  _quickGo(evt) {
    this.props.quickGo(Number(evt.target.value));
  }
}

Options.propTypes = {
  changeSize: React.PropTypes.func,
  quickGo: React.PropTypes.func,

  sizeChangerClass: React.PropTypes.bool,
  current: React.PropTypes.number
};

module.exports = Options;
