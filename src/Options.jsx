

const React = require('react');
const KEYCODE = require('./KeyCode');

class Options extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: props.current,
      _current: props.current,
    };

    ['_handleChange', '_changeSize', '_go'].forEach((method) => this[method] = this[method].bind(this));
  }
  render() {
    const props = this.props;
    const state = this.state;
    const prefixCls = `${props.rootPrefixCls}-options`;
    const changeSize = props.changeSize;
    const quickGo = props.quickGo;
    const Select = props.selectComponentClass;
    let changeSelect = null;
    let goInput = null;

    if (!(changeSize || quickGo)) {
      return null;
    }

    if (changeSize && Select) {
      const Option = Select.Option;
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
    const _val = evt.target.value;

    this.setState({
      _current: _val,
    });
  }

  _go(e) {
    const _val = e.target.value;
    if (_val === '') {
      return;
    }
    let val = Number(this.state._current);
    if (isNaN(val)) {
      val = this.state.current;
    }
    if (e.keyCode === KEYCODE.ENTER) {
      const c = this.props.quickGo(val);
      this.setState({
        _current: c,
        current: c,
      });
    }
  }
}

Options.propTypes = {
  changeSize: React.PropTypes.func,
  quickGo: React.PropTypes.func,
  selectComponentClass: React.PropTypes.func,
  current: React.PropTypes.number,
};

module.exports = Options;
