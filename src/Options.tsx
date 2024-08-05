import type { SelectProps } from 'rc-select';
import type { OptionProps } from 'rc-select/es/Option';
import KEYCODE from 'rc-util/lib/KeyCode';
import React from 'react';
import type { PaginationLocale } from './interface';

interface InternalSelectProps extends SelectProps {
  /**
   * form antd v5.5.0, popupMatchSelectWidth default is true
   */
  popupMatchSelectWidth?: boolean;
}

interface OptionsProps {
  disabled?: boolean;
  locale: PaginationLocale;
  rootPrefixCls: string;
  selectPrefixCls?: string;
  pageSize: number;
  pageSizeOptions?: (string | number)[];
  goButton?: boolean | string;
  changeSize?: (size: number) => void;
  quickGo?: (value: number) => void;
  buildOptionText?: (value: string | number) => string;
  selectComponentClass: React.ComponentType<Partial<InternalSelectProps>> & {
    Option?: React.ComponentType<Partial<OptionProps>>;
  };
  showSearch: boolean;
  onChange: (size: number) => void;
}

const defaultPageSizeOptions = ['10', '20', '50', '100'];

const Options: React.FC<OptionsProps> = (props) => {
  const {
    pageSizeOptions = defaultPageSizeOptions,
    locale,
    changeSize,
    pageSize,
    goButton,
    quickGo,
    rootPrefixCls,
    selectComponentClass: Select,
    selectPrefixCls,
    disabled,
    buildOptionText,
    showSearch = false,
    onChange,
  } = props;

  const [goInputText, setGoInputText] = React.useState('');

  const getValidValue = () => {
    return !goInputText || Number.isNaN(goInputText)
      ? undefined
      : Number(goInputText);
  };

  const mergeBuildOptionText =
    typeof buildOptionText === 'function'
      ? buildOptionText
      : (value: string) => `${value} ${locale.items_per_page}`;

  const changeSizeHandle = (value: number) => {
    changeSize?.(Number(value));
    if (onChange && typeof onChange === 'function') {
      onChange?.(Number(value));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoInputText(e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (goButton || goInputText === '') {
      return;
    }
    setGoInputText('');
    if (
      e.relatedTarget &&
      (e.relatedTarget.className.indexOf(`${rootPrefixCls}-item-link`) >= 0 ||
        e.relatedTarget.className.indexOf(`${rootPrefixCls}-item`) >= 0)
    ) {
      return;
    }
    quickGo?.(getValidValue());
  };

  const go = (e: any) => {
    if (goInputText === '') {
      return;
    }
    if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
      setGoInputText('');
      quickGo?.(getValidValue());
    }
  };

  const getPageSizeOptions = () => {
    if (
      pageSizeOptions.some(
        (option) => option.toString() === pageSize.toString(),
      )
    ) {
      return pageSizeOptions;
    }
    return pageSizeOptions.concat([pageSize.toString()]).sort((a, b) => {
      const numberA = Number.isNaN(Number(a)) ? 0 : Number(a);
      const numberB = Number.isNaN(Number(b)) ? 0 : Number(b);
      return numberA - numberB;
    });
  };
  // ============== cls ==============
  const prefixCls = `${rootPrefixCls}-options`;

  // ============== render ==============

  if (!changeSize && !quickGo) {
    return null;
  }

  let changeSelect: React.ReactNode = null;
  let goInput: React.ReactNode = null;
  let gotoButton: React.ReactNode = null;

  if (changeSize && Select) {
    const options = getPageSizeOptions().map<React.ReactNode>((opt, i) => (
      <Select.Option key={i} value={opt.toString()}>
        {mergeBuildOptionText(opt)}
      </Select.Option>
    ));

    changeSelect = (
      <Select
        disabled={disabled}
        prefixCls={selectPrefixCls}
        showSearch={showSearch}
        className={`${prefixCls}-size-changer`}
        optionLabelProp="children"
        popupMatchSelectWidth={false}
        value={(pageSize || pageSizeOptions[0]).toString()}
        onChange={changeSizeHandle}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
        aria-label={locale.page_size}
        defaultOpen={false}
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
            onClick={go}
            onKeyUp={go}
            disabled={disabled}
            className={`${prefixCls}-quick-jumper-button`}
          >
            {locale.jump_to_confirm}
          </button>
        ) : (
          <span onClick={go} onKeyUp={go}>
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
          onChange={handleChange}
          onKeyUp={go}
          onBlur={handleBlur}
          aria-label={locale.page}
        />
        {locale.page}
        {gotoButton}
      </div>
    );
  }

  return (
    <li className={prefixCls}>
      {changeSelect}
      {goInput}
    </li>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Options.displayName = 'Options';
}

export default Options;
