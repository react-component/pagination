'use strict';

let React = require('react');
let KEYCODE = require('./KeyCode');

class Options extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: props.current,
      _current: props.current
    };

    ['_handleChange', '_changeSize', '_go'].forEach((method) => this[method] = this[method].bind(this));
  }
  render() {
    let props = this.props;
    let state = this.state;
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
        <div title="Quick jump to page" className={`${prefixCls}-quick-jumper`}>
          跳至
          <input type="text" value={state._current} onChange={this._handleChange.bind(this)} onKeyUp={this._go.bind(this)}/>
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

  _handleChange(evt) {
    let _val = evt.target.value;
    let val;

    if (_val === '') {
      val = this.state.current;
    } else {
      val = Number(_val);
      if (isNaN(val)) {
        val = this.state.current;
      }
    }

    this.setState({
      current: val,
      _current: _val
    });

  }

  _go (e) {
    if (e.keyCode === KEYCODE.ENTER) {
      this.setState({
        _current: this.props.quickGo(this.state.current) || this.state.current
      });
    }
  }

  _checkValid(evt) {
    let keyCode = evt.keyCode;
    let valid = (
      (keyCode >= KEYCODE.ZERO && keyCode <= KEYCODE.NINE) ||
      (keyCode >= KEYCODE.NUMPAD_ZERO && keyCode <= KEYCODE.NUMPAD_NINE) ||
      keyCode === KEYCODE.DELETE || keyCode === KEYCODE.BACKSPACE || keyCode === KEYCODE.ENTER) ||
      KEYCODE.validKeyBinding(evt);

    if (!valid) {
      evt.preventDefault();
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
