import type { SelectProps } from 'rc-select';
import type { OptionProps } from 'rc-select/es/Option';
import KEYCODE from 'rc-util/lib/KeyCode';
import classNames from 'classnames';
import React, { useState } from 'react';
import type { PaginationLocale, PaginationProps } from './interface';

interface InternalSelectProps extends SelectProps {
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
  showSizeChanger: PaginationProps['showSizeChanger'];
}

const defaultPageSizeOptions = ['10', '20', '50', '100'];

const Options: React.FC<OptionsProps> = ({
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
  showSizeChanger,
}) => {
  const [goInputText, setGoInputText] = useState('');

  const getValidValue = () => {
    return !goInputText || isNaN(Number(goInputText))
      ? undefined
      : Number(goInputText);
  };

  const mergeBuildOptionText =
    typeof buildOptionText === 'function'
      ? buildOptionText
      : (value: string) => `${value} ${locale.items_per_page}`;

  const changeSizeHandle = (value: number, option) => {
    changeSize?.(Number(value));
    if (typeof showSizeChanger === 'object') {
      showSizeChanger.onChange?.(value, option);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoInputText(e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (goButton || goInputText === '') {
      return;
    }
    setGoInputText('');
    if (
      e.relatedTarget &&
      (e.relatedTarget.className.includes(`${rootPrefixCls}-item-link`) ||
        e.relatedTarget.className.includes(`${rootPrefixCls}-item`))
    )
      return;
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
    return [...pageSizeOptions, pageSize.toString()].sort(
      (a, b) => Number(a) - Number(b),
    );
  };

  const prefixCls = `${rootPrefixCls}-options`;

  if (!showSizeChanger && !quickGo) return null;

  let changeSelect: React.ReactNode = null;
  let goInput: React.ReactNode = null;
  let gotoButton: React.ReactNode = null;

  if (showSizeChanger && Select) {
    const {
      options: showSizeChangerOptions,
      className: showSizeChangerClassName,
    } = typeof showSizeChanger === 'object' ? showSizeChanger : {};
    const options = showSizeChangerOptions
      ? undefined
      : getPageSizeOptions().map((opt, i) => (
          <Select.Option key={i} value={opt.toString()}>
            {mergeBuildOptionText(opt)}
          </Select.Option>
        ));

    changeSelect = (
      <Select
        disabled={disabled}
        prefixCls={selectPrefixCls}
        showSearch={false}
        optionLabelProp={showSizeChangerOptions ? 'label' : 'children'}
        popupMatchSelectWidth={false}
        value={(pageSize || pageSizeOptions[0]).toString()}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
        aria-label={locale.page_size}
        defaultOpen={false}
        {...(typeof showSizeChanger === 'object' ? showSizeChanger : null)}
        className={classNames(
          `${prefixCls}-size-changer`,
          showSizeChangerClassName,
        )}
        options={showSizeChangerOptions}
        onChange={changeSizeHandle}
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
