import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Select from 'rc-select';
import Pagination from '../src';

describe('Pagination with pageSizeChanger', () => {
  it('should onChange called when pageSize change', () => {
    const onChange = jest.fn();
    const { container, getByRole } = render(
      <Pagination
        defaultCurrent={1}
        total={500}
        selectComponentClass={Select}
        showSizeChanger
        pageSizeChanger={{
          options: [10, 25, 50, 75, 100],
          showSearch: false,
          onChange: onChange,
        }}
      />,
    );
    const select = getByRole('combobox');
    expect(select).toBeTruthy();
    fireEvent.mouseDown(select);
    expect(container.querySelectorAll('.rc-select-item')[2]).toHaveTextContent(
      '50 条/页',
    );
    const pageSize1 = container.querySelectorAll('.rc-select-item')[0];
    expect(pageSize1).toBeInTheDocument();
    fireEvent.click(pageSize1);
  });
});
