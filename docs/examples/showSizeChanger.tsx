import React from 'react';
import Pagination from 'rc-pagination';
import Select from 'rc-select';
import '../../assets/index.less';

export default () => {
  const onPageSizeOnChange = (value) => {
    console.log(value);
  };

  return (
    <>
      <Pagination
        defaultCurrent={1}
        total={50}
        selectComponentClass={Select}
        showSizeChanger={false}
      />
      <Pagination
        defaultCurrent={1}
        total={50}
        selectComponentClass={Select}
        showSizeChanger
      />
      <Pagination
        defaultCurrent={1}
        total={50}
        selectComponentClass={Select}
        showSizeChanger={{
          options: [
            { value: '10', label: '10 条每页' },
            { value: '25', label: '25 条每页' },
            { value: '100', label: '100 条每页' },
          ],
          className: 'my-select',
          showSearch: true,
          onChange: onPageSizeOnChange,
        }}
      />
    </>
  );
};
