import React, { useState } from 'react';
import Pagination from 'rc-pagination';
import Select from 'rc-select';
import '../../assets/index.less';

export default () => {
  const [pageIndex, setPageIndex] = useState(1);

  return (
    <>
      <button onClick={() => setPageIndex((i) => ++i)}>increase</button>
      <Pagination
        simple
        current={pageIndex}
        total={50}
        onChange={setPageIndex}
      />
      <br />
      <Pagination
        simple={{ readOnly: true }}
        current={pageIndex}
        total={50}
        onChange={setPageIndex}
      />
      <br />
      <Pagination simple defaultCurrent={1} total={50} />
      <br />
      <Pagination
        simple
        defaultCurrent={1}
        total={50}
        showTotal={(total) => `Total ${total} items`}
      />
      <br />
      <Pagination
        simple
        defaultCurrent={1}
        total={50}
        showSizeChanger
        selectComponentClass={Select}
      />
      <hr />
      <a href="https://github.com/ant-design/ant-design/issues/46671">
        Antd #46671
      </a>
      <Pagination
        simple
        defaultCurrent={1}
        total={50}
        showSizeChanger
        showQuickJumper
        selectComponentClass={Select}
      />
    </>
  );
};
