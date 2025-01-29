import KEYCODE from '@rc-component/util/lib/KeyCode';
import React from 'react';
import type { PaginationLocale } from './interface';

export type SizeChangerRender = (info: {
  disabled: boolean;
  size: number;
  onSizeChange: (value: string | number) => void;
  'aria-label': string;
  className: string;
  options: {
    label: string;
    value: string | number;
  }[];
}) => React.ReactNode;

interface OptionsProps {
  disabled?: boolean;
  locale: PaginationLocale;
  rootPrefixCls: string;
  selectPrefixCls?: string;
  pageSize: number;
  pageSizeOptions?: number[];
  goButton?: boolean | string;
  changeSize?: (size: number) => void;
  quickGo?: (value: number) => void;
  buildOptionText?: (value: number | string) => string;
  showSizeChanger: boolean;
  sizeChangerRender?: SizeChangerRender;
}

const defaultPageSizeOptions = [10, 20, 50, 100];

const Options: React.FC<OptionsProps> = (props) => {
  const {
    pageSizeOptions = defaultPageSizeOptions,
    locale,
    changeSize,
    pageSize,
    goButton,
    quickGo,
    rootPrefixCls,
    disabled,
    buildOptionText,
    showSizeChanger,
    sizeChangerRender,
  } = props;

  const [goInputText, setGoInputText] = React.useState('');

  const getValidValue = React.useMemo<number>(() => {
    return !goInputText || Number.isNaN(goInputText)
      ? undefined
      : Number(goInputText);
  }, [goInputText]);

  const mergeBuildOptionText =
    typeof buildOptionText === 'function'
      ? buildOptionText
      : (value: string | number) => `${value} ${locale.items_per_page}`;

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
      (e.relatedTarget.className.includes(`${rootPrefixCls}-item-link`) ||
        e.relatedTarget.className.includes(`${rootPrefixCls}-item`))
    ) {
      return;
    }
    quickGo?.(getValidValue);
  };

  const go = (e: any) => {
    if (goInputText === '') {
      return;
    }
    if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
      setGoInputText('');
      quickGo?.(getValidValue);
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
    return pageSizeOptions.concat([pageSize]).sort((a, b) => {
      const numberA = Number.isNaN(Number(a)) ? 0 : Number(a);
      const numberB = Number.isNaN(Number(b)) ? 0 : Number(b);
      return numberA - numberB;
    });
  };
  // ============== cls ==============
  const prefixCls = `${rootPrefixCls}-options`;

  // ============== render ==============

  if (!showSizeChanger && !quickGo) {
    return null;
  }

  let changeSelect: React.ReactNode = null;
  let goInput: React.ReactNode = null;
  let gotoButton: React.ReactNode = null;

  // >>>>> Size Changer
  if (showSizeChanger && sizeChangerRender) {
    changeSelect = sizeChangerRender({
      disabled,
      size: pageSize,
      onSizeChange: (nextValue) => {
        changeSize?.(Number(nextValue));
      },
      'aria-label': locale.page_size,
      className: `${prefixCls}-size-changer`,
      options: getPageSizeOptions().map((opt) => ({
        label: mergeBuildOptionText(opt),
        value: opt,
      })),
    });
  }

  // >>>>> Quick Go
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
