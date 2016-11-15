/* eslint func-names: 0, no-console: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.less';

ReactDOM.render(
<div>
  <Pagination
    showTotal={(total) => `Total ${total} items`}
    total={455}
  />
  <br />
  <Pagination
    showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} items`}
    total={455}
  />
</div>
, document.getElementById('__react-content'));
