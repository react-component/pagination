import type { PaginationProps } from 'rc-pagination';
import Pagination from '../../../src';
import Select from 'rc-select';
import React from 'react';

export const getSizeChangerRender = (selectProps?: any) => {
  const render: PaginationProps['sizeChangerRender'] = ({
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
      value={pageSize || options[0].value}
      getPopupContainer={(triggerNode) => triggerNode.parentNode}
      aria-label={ariaLabel}
      defaultOpen={false}
      className={className}
      options={options}
      onChange={onSizeChange}
      {...selectProps}
    />
  );

  return render;
};

export default function PaginationWithSizeChanger({
  sizeChangerProps,
  ...props
}: Omit<PaginationProps, 'sizeChangerRender'> & {
  sizeChangerProps?: any;
}) {
  return (
    <Pagination
      {...props}
      sizeChangerRender={getSizeChangerRender(sizeChangerProps)}
    />
  );
}
