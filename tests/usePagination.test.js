import { shallow } from 'enzyme';
import React from 'react';
import usePagination from '../src/usePagination';

describe('usePagination', () => {
  const serialize = (items) =>
    items.map((item) => (item.type === 'page' ? item.page : item.type));

  const renderHook = (useHook) => {
    const result = {};
    function TestCase() {
      result.current = useHook();
      return null;
    }
    shallow(<TestCase />);
    return { result };
  };

  it('has one page by default', () => {
    const items = renderHook(() => usePagination()).result.current;
    expect(items).toHaveLength(3);
    expect(items[1]).toHaveProperty('page', 1);
  });

  describe('default', () => {
    [3, 5, 6, 7, 8, 9, 10, 12, 50].forEach((count) => {
      describe(`has ${count} pages`, () => {
        for (let current = 1; current <= count; current++) {
          it(`current page is ${current}`, () => {
            const items = renderHook(() => usePagination({ count, current }))
              .result.current;
            expect(items).toMatchSnapshot();
          });
        }
      });
    });
  });
});
