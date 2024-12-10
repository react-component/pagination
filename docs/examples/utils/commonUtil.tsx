import type { PaginationProps } from 'rc-pagination';
import Pagination from 'rc-pagination';
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
      // prefixCls={selectPrefixCls}
      showSearch={false}
      // optionLabelProp={showSizeChangerOptions ? 'label' : 'children'}
      // popupMatchSelectWidth={false}
      dropdownMatchSelectWidth={false}
      value={(pageSize || options[0].value).toString()}
      getPopupContainer={(triggerNode) => triggerNode.parentNode}
      aria-label={ariaLabel}
      defaultOpen={false}
      // {...(typeof showSizeChanger === 'object' ? showSizeChanger : null)}
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
