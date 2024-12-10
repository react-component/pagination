/* eslint func-names: 0, no-console: 0 */
import React from 'react';
import '../../assets/index.less';
import 'rc-select/assets/index.less';
import PaginationWithSizeChanger from './utils/commonUtil';

function onShowSizeChange(current, pageSize) {
  console.log(current);
  console.log(pageSize);
}

function onChange(current, pageSize) {
  console.log('onChange:current=', current);
  console.log('onChange:pageSize=', pageSize);
}

const App = () => (
  <>
    <h3>默认</h3>
    <PaginationWithSizeChanger
      showQuickJumper
      showSizeChanger
      defaultPageSize={20}
      defaultCurrent={5}
      onShowSizeChange={onShowSizeChange}
      onChange={onChange}
      total={450}
    />
    <h3>禁用</h3>
    <PaginationWithSizeChanger
      showQuickJumper
      showSizeChanger
      defaultPageSize={20}
      defaultCurrent={5}
      onShowSizeChange={onShowSizeChange}
      onChange={onChange}
      total={450}
      disabled
    />
    <h3>单页默认隐藏</h3>
    <PaginationWithSizeChanger
      showQuickJumper
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      onChange={onChange}
      total={8}
    />
    <br />
    <PaginationWithSizeChanger
      showQuickJumper
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      onChange={onChange}
      pageSize={10}
      total={8}
    />
  </>
);

export default App;
