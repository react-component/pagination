import '../../assets/index.less';
import React from 'react';
import Pagination from '../../src';

const itemRender = (current, type, element) => {
  if (type === 'page') {
    return <a href={`#${current}`}>{current}</a>;
  }
  return element;
};

const textItemRender = (current, type, element) => {
  if (type === 'prev') {
    return 'Prev';
  }
  if (type === 'next') {
    return 'Next';
  }
  return element;
};

const buttonItemRender = (current, type, element) => {
  if (type === 'prev') {
    return <button type="button">Prev</button>;
  }
  if (type === 'next') {
    return <button type="button">Next</button>;
  }
  return element;
};

const divItemRender = (current, type, element) => {
  if (type === 'prev') {
    return <div>Prev</div>;
  }
  if (type === 'next') {
    return <div>Next</div>;
  }
  return element;
};

const App = () => (
  <>
    <Pagination total={100} itemRender={itemRender} />
    <Pagination total={100} itemRender={textItemRender} />
    <Pagination total={100} itemRender={buttonItemRender} />
    <Pagination total={100} itemRender={divItemRender} />
  </>
);

export default App;
