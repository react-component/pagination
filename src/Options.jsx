'use strict';

let React = require('react');
let KEYCODE = require('./KeyCode');

class Options extends React.Component {
  constructor(props) {
    super(props);
    ['_quickGo', '_changeSize'].map((method) => this[method] = this[method].bind(this));
  }
  render() {
    let props = this.props;
    let prefixCls = `${props.rootPrefixCls}-options`;
    let changeSize = props.changeSize;
    let quickGo = props.quickGo;
    let Select = props.selectComponentClass;
    let changeSelect = null;
    let goInput = null;

    if (!(changeSize || quickGo)) {
      return null;
    }

    if (changeSize && Select) {
      let Option = Select.Option;
      changeSelect = (
        <Select
          prefixCls={props.selectPrefixCls} showSearch={false}
          className={`${prefixCls}-size-changer`}
          optionLabelProp="children"
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
          <input type="text" defaultValue={props.current} onKeyDown={this._checkValid} onChange={this._quickGo} onKeyUp={this._quickGo} />
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

  _checkValid(evt) {
    let keyCode = evt.keyCode;
    let valid = (
      (keyCode >= KEYCODE.ZERO && keyCode <= KEYCODE.NINE) ||
      (keyCode >= KEYCODE.NUMPAD_ZERO && keyCode <= KEYCODE.NUMPAD_NINE) ||
      keyCode === KEYCODE.DELETE || keyCode === KEYCODE.BACKSPACE || keyCode === KEYCODE.ENTER);

    if (!valid) {
      evt.preventDefault();
    }
  }

  _quickGo(evt) {
    let ENTER_KEY = 13;
    let val = Number(evt.target.value);


    if (evt.keyCode === ENTER_KEY) {
      this.props.quickGo(val);
    }
  }
}

Options.propTypes = {
  changeSize: React.PropTypes.func,
  quickGo: React.PropTypes.func,

  selectComponentClass: React.PropTypes.func,
  current: React.PropTypes.number
};

module.exports = Options;
