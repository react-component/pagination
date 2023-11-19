import React from 'react';
import '../../assets/index.less';
import Pagination from '../../src/NewPagination';
// import Pagination from '../../src/Pagination';

const App = () => (
  <>
    <Pagination total={25} />
  </>
);

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
