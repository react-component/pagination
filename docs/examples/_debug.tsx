import React from 'react';
import '../../assets/index.less';
// import Pagination from '../../src/NewPagination';

// import Pagination from '../../src/Pagination';
import usePagination from '../../src/usePagination';

const App = () => {
  const [total, setTotal] = React.useState<any>(5);
  const [current, setCurrent] = React.useState<any>(1);

  const items = usePagination({
    // boundaryCount: 2,
    // siblingCount: 1,
    count: Number(total),
    current: Number(current),
  });

  return (
    <>
      <label htmlFor="page">
        <span>page:</span>
        <input
          id="page"
          type="text"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />
      </label>
      <label htmlFor="current">
        <span>current:</span>
        <input
          id="current"
          type="text"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        />
      </label>
      <hr />
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </>
  );
  // return (
  //   <>
  //     <Pagination total={25} />
  //   </>
  // )
};

export default App;
