/* eslint react/prop-types: 0 */
import React from 'react';
import KEYCODE from './KeyCode';

class Options extends React.Component {
  static defaultProps = {
    pageSizeOptions: ['10', '20', '30', '40'],
  };

  state = {
    goInputText: '',
  };

  getValidValue() {
    const { goInputText, current } = this.state;
    return !goInputText || isNaN(goInputText) ? current : Number(goInputText);
  }

  buildOptionText = value => `${value} ${this.props.locale.items_per_page}`;

  changeSize = value => {
    this.props.changeSize(Number(value));
  };

  handleChange = e => {
    this.setState({
      goInputText: e.target.value,
    });
  };

  handleBlur = e => {
    const { goButton, quickGo, rootPrefixCls } = this.props;
    if (goButton) {
      return;
    }
    if (
      e.relatedTarget &&
      (e.relatedTarget.className.indexOf(`${rootPrefixCls}-prev`) >= 0 ||
        e.relatedTarget.className.indexOf(`${rootPrefixCls}-next`) >= 0)
    ) {
      return;
    }
    quickGo(this.getValidValue());
  };

  go = e => {
    const { goInputText } = this.state;
    if (goInputText === '') {
      return;
    }
    if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
      this.setState({
        goInputText: '',
      });
      this.props.quickGo(this.getValidValue());
    }
  };

  render() {
    const {
      pageSize,
      pageSizeOptions,
      locale,
      rootPrefixCls,
      changeSize,
      quickGo,
      goButton,
      selectComponentClass,
      buildOptionText,
      selectPrefixCls,
      disabled,
    } = this.props;
    const { goInputText } = this.state;
    const prefixCls = `${rootPrefixCls}-options`;
    const Select = selectComponentClass;
    let changeSelect = null;
    let goInput = null;
    let gotoButton = null;

    if (!changeSize && !quickGo) {
      return null;
    }

    if (changeSize && Select) {
      const options = pageSizeOptions.map((opt, i) => (
        <Select.Option key={i} value={opt}>
          {(buildOptionText || this.buildOptionText)(opt)}
        </Select.Option>
      ));

      changeSelect = (
        <Select
          disabled={disabled}
          prefixCls={selectPrefixCls}
          showSearch={false}
          className={`${prefixCls}-size-changer`}
          optionLabelProp="children"
          dropdownMatchSelectWidth={false}
          value={(pageSize || pageSizeOptions[0]).toString()}
          onChange={this.changeSize}
          getPopupContainer={triggerNode => triggerNode.parentNode}
        >
          {options}
        </Select>
      );
    }

    if (quickGo) {
      if (goButton) {
        gotoButton =
          typeof goButton === 'boolean' ? (
            <button
              type="button"
              onClick={this.go}
              onKeyUp={this.go}
              disabled={disabled}
            >
              {locale.jump_to_confirm}
            </button>
          ) : (
            <span onClick={this.go} onKeyUp={this.go}>
              {goButton}
            </span>
          );
      }
      goInput = (
        <div className={`${prefixCls}-quick-jumper`}>
          {locale.jump_to}
          <input
            disabled={disabled}
            type="text"
            value={goInputText}
            onChange={this.handleChange}
            onKeyUp={this.go}
            onBlur={this.handleBlur}
          />
          {locale.page}
          {gotoButton}
        </div>
      );
    }

    return (
      <li className={`${prefixCls}`}>
        {changeSelect}
        {goInput}
      </li>
    );
  }
}

export default Options;
