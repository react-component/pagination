import type { PaginationProps } from 'rc-pagination';
import Pagination from 'rc-pagination';
import Select from 'rc-select';
import React from 'react';

export const sizeChangerRender: PaginationProps['sizeChangerRender'] = ({
  disabled,
  size: pageSize,
  onSizeChange,
  'aria-label': ariaLabel,
  className,
  options,
}) => {
  return (
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
    />
  );
};

export default function PaginationWithSizeChanger(
  props: Omit<PaginationProps, 'sizeChangerRender'> & {
    sizeChangerRender?: boolean;
  },
) {
  return <Pagination {...props} sizeChangerRender={sizeChangerRender} />;
}
