import React from 'react';
import '../../assets/index.less';
import PaginationWithSizeChanger from './utils/commonUtil';

export default () => {
  const onPageSizeOnChange = (value) => {
    console.log(value);
  };

  return (
    <>
      <PaginationWithSizeChanger
        defaultCurrent={1}
        total={50}
        // selectComponentClass={Select}
        showSizeChanger={false}
      />
      <PaginationWithSizeChanger
        defaultCurrent={1}
        total={50}
        // selectComponentClass={Select}
        showSizeChanger
      />
      <PaginationWithSizeChanger
        defaultCurrent={1}
        showSizeChanger
        // selectComponentClass={Select}
        sizeChangerProps={{
          options: [
            { value: 10, label: '10 条每页' },
            { value: 25, label: '25 条每页' },
            { value: 100, label: '100 条每页' },
          ],
          // className: 'my-select',
          // showSearch: true,
          // onChange: onPageSizeOnChange,
        }}
      />
    </>
  );
};
