import React from 'react';
import Pagination from '../../src';
import '../../assets/index.less';

const App = () => (
  <>
    <Pagination showTotal={(total) => `Total ${total} items`} total={455} />
    <br />
    <Pagination
      showTotal={(total, range) =>
        `${range[0]} - ${range[1]} of ${total} items`
      }
      total={455}
    />
    <br />
    <Pagination
      showTotal={(total, range) =>
        `${range[0]} - ${range[1]} of ${total} items`
      }
      total={0}
    />
  </>
);

export default App;
