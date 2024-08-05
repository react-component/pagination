import React from 'react';
import Pagination from 'rc-pagination';
import Select from 'rc-select';
import '../../assets/index.less';

export default () => {
  const pageSizeOnChange = (size) => {
    console.log({ size });
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
          options: [10, 25, 50, 75, 100],
          showSearch: true,
          onChange: pageSizeOnChange,
        }}
      />
    </>
  );
};
