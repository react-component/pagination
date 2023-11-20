import Select from 'rc-select';
import React from 'react';
import '../../assets/index.less';
import type { PaginationProps } from '../../src/interface';
import Pagination from '../../src/Pagination';
import OriginPagination from '../../src/Pagination_deprecated';

const App = () => {
  const [origin, setOrigin] = React.useState(false);
  const [all, setAll] = React.useState(false);

  const props: PaginationProps = {
    selectComponentClass: Select,
    showSizeChanger: true,
    onShowSizeChange: console.log,
    onChange: console.warn,
    current: 1,
    total: 0,
    showTotal: (total, range) => `${range[0]} - ${range[1]} of ${total} items`,
  };

  const originTip = <span style={{ color: 'red' }}>Origin</span>;
  const newTip = <span style={{ color: 'green' }}>New</span>;

  return (
    <>
      <h2>{all ? null : origin ? originTip : newTip}</h2>
      {!all && (
        <button onClick={() => setOrigin((prev) => !prev)}>
          切换为{origin ? 'new' : 'origin'}
        </button>
      )}
      <button onClick={() => setAll((prev) => !prev)}>全量</button>
      <hr />
      {!all &&
        React.createElement(origin ? OriginPagination : Pagination, props)}
      {all && (
        <>
          {originTip}
          <br />
          <OriginPagination {...props} />
          <hr />
          {newTip}
          <br />
          <Pagination {...props} />
        </>
      )}
    </>
  );
};

export default App;
// export { default } from '../../tests/two-pagination.jsx'
