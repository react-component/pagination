import React from 'react';
import '../../assets/index.less';
import Pagination from '../../src/NewPagination';
import OriginPagination from '../../src/Pagination';
import type { PaginationProps } from '../../src/interface';

const App = () => {
  const [origin, setOrigin] = React.useState(false);
  const [all, setAll] = React.useState(false);

  const props: PaginationProps = {
    total: 100,
    defaultCurrent: 2,
  };

  const originTip = <span style={{ color: 'red' }}>Origin</span>;
  const newTip = <span style={{ color: 'green' }}>New</span>;

  return (
    <>
      <h2>{all ? null : origin ? originTip : newTip}</h2>
      <button onClick={() => setOrigin((prev) => !prev)}>切换</button>
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

interface IProps {
  value: string;
  onChange: (info: {
    firstName: string;
    lastName: string;
    fullName: string;
  }) => void;
  separator?: string;
}

const MyComponent = (props: IProps) => {
  const { value = '', onChange, separator = ' ' } = props;
  const [firstName, lastName] = value.split(separator)[0];

  const fullName = `${firstName}${separator}${lastName}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'firstName' | 'lastName',
  ) => {
    const { value: input } = e.target;

    onChange({
      firstName: type === 'firstName' ? input : firstName,
      lastName: type === 'lastName' ? input : lastName,
      fullName,
    });
  };

  return (
    <>
      <input
        type="text"
        value={firstName}
        onChange={(e) => handleChange(e, 'firstName')}
      />
      {separator}
      <input
        type="text"
        value={lastName}
        onChange={(e) => handleChange(e, 'lastName')}
      />
    </>
  );
};
