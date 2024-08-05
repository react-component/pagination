import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Select from 'rc-select';
import Pagination from '../src';

const onChange = jest.fn();

describe('Pagination with showSizeChanger', () => {
  it('should onChange called when pageSize change', () => {
    const { container, getByRole } = render(
      <Pagination
        defaultCurrent={1}
        total={500}
        selectComponentClass={Select}
        showSizeChanger={{
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

  it('should onChange called when pageSize change with search', () => {
    const { container } = render(
      <Pagination
        defaultCurrent={1}
        total={500}
        selectComponentClass={Select}
        showSizeChanger={{
          options: [10, 25, 50, 75, 100],
          showSearch: false,
          onChange: onChange,
        }}
      />,
    );
    fireEvent.change(container.querySelector('input'), { target: { value: '25' } });
    expect(container.querySelectorAll('.rc-select-item-option-content')).toHaveLength(1);
    expect(container.querySelector('.rc-select-item-option-content').textContent).toBe('25 条/页');
    const pageSize1 = container.querySelector('.rc-select-item-option-content');
    expect(pageSize1).toBeInTheDocument();
    fireEvent.click(pageSize1);
  });
});
