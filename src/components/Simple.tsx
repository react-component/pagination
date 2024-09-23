import React from 'react';
import type { PaginationProps } from '../interface';

const Simple: React.FC<PaginationProps> = ({
  locale,
  prefixCls,
  current,
  allPages,
  disabled,
  internalInputVal,
  handleKeyDown,
  handleKeyUp,
  handleBlur,
  handleGoTO,
  goButton,
  showTitle,
}) => {
  const isReadOnly = typeof simple === 'object' ? simple.readOnly : !simple;
  let gotoButton: any = goButton;

  if (goButton) {
    if (typeof goButton === 'boolean') {
      gotoButton = (
        <button type="button" onClick={handleGoTO} onKeyUp={handleGoTO}>
          {locale.jump_to_confirm}
        </button>
      );
    } else {
      gotoButton = (
        <span onClick={handleGoTO} onKeyUp={handleGoTO}>
          {goButton}
        </span>
      );
    }

    gotoButton = (
      <li
        title={showTitle ? `${locale.jump_to}${current}/${allPages}` : null}
        className={`${prefixCls}-simple-pager`}
      >
        {gotoButton}
      </li>
    );
  }

  return (
    <li
      title={showTitle ? `${current}/${allPages}` : null}
      className={`${prefixCls}-simple-pager`}
    >
      {isReadOnly ? (
        internalInputVal
      ) : (
        <input
          type="text"
          value={internalInputVal}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onChange={handleKeyUp}
          onBlur={handleBlur}
          size={3}
        />
      )}
      <span className={`${prefixCls}-slash`}>/</span>
      {allPages}
    </li>
  );
};

export default Simple;
