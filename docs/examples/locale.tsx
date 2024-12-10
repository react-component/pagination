/* eslint func-names: 0, no-console: 0 */
import React from 'react';
import localeInfo from '../../src/locale/en_US';
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
  <PaginationWithSizeChanger
    showQuickJumper
    showSizeChanger
    defaultPageSize={20}
    defaultCurrent={5}
    onShowSizeChange={onShowSizeChange}
    onChange={onChange}
    total={450}
    locale={localeInfo}
  />
);

export default App;
