import Select from 'rc-select';
import type { PaginationProps } from '../src/interface';
import React from 'react';

export const sizeChangerRender: PaginationProps['sizeChangerRender'] = ({
  disabled,
  size: pageSize,
  onSizeChange,
  'aria-label': ariaLabel,
  className,
  options,
}) => (
  <Select
    disabled={disabled}
    showSearch={false}
    dropdownMatchSelectWidth={false}
    value={(pageSize || options[0].value).toString()}
    getPopupContainer={(triggerNode) => triggerNode.parentNode}
    aria-label={ariaLabel}
    defaultOpen={false}
    className={className}
    options={options}
    onChange={onSizeChange}
  />
);
