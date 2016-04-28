const React = require('react');
const KEYCODE = require('./KeyCode');

class Options extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: props.current,
      _current: props.current,
    };

    ['_handleChange', '_changeSize', '_go', '_buildOptionText'].forEach((method) => this[method] = this[method].bind(this));
  }
  _buildOptionText(value) {
    return `${value} ${this.props.locale.items_per_page}`;
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

  render() {
    const props = this.props;
    const state = this.state;
    const locale = props.locale;
    const prefixCls = `${props.rootPrefixCls}-options`;
    const changeSize = props.changeSize;
    const quickGo = props.quickGo;
    const buildOptionText = props.buildOptionText || this._buildOptionText;
    const Select = props.selectComponentClass;
    let changeSelect = null;
    let goInput = null;

    if (!(changeSize || quickGo)) {
      return null;
    }

    if (changeSize && Select) {
      const Option = Select.Option;
      const pageSize = props.pageSize || props.pageSizeOptions[0];
      const options = props.pageSizeOptions.map((opt, i) => (
        <Option key={i} value={opt}>{buildOptionText(opt)}</Option>
      ));

      changeSelect = (
        <Select
          prefixCls={props.selectPrefixCls} showSearch={false}
          className={`${prefixCls}-size-changer`}
          optionLabelProp="children"
          dropdownMatchSelectWidth={false}
          value={pageSize + ''} onChange={this._changeSize}>
          {options}
       </Select>
      );
    }

    if (quickGo) {
      goInput = (
        <div className={`${prefixCls}-quick-jumper`}>
          {locale.jump_to}
          <input type="text" value={state._current} onChange={this._handleChange.bind(this)} onKeyUp={this._go.bind(this)}/>
          {locale.page}
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
}

Options.propTypes = {
  changeSize: React.PropTypes.func,
  quickGo: React.PropTypes.func,
  selectComponentClass: React.PropTypes.func,
  current: React.PropTypes.number,
  pageSizeOptions: React.PropTypes.arrayOf(React.PropTypes.string),
  pageSize: React.PropTypes.number,
  buildOptionText: React.PropTypes.func,
  locale: React.PropTypes.object,
};

Options.defaultProps = {
  pageSizeOptions: ['10', '20', '30', '40'],
};

module.exports = Options;
