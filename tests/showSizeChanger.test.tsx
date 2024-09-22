import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from 'rc-select';
import Pagination from '../src';

const options = [
  { value: '10', label: '10 条每页' },
  { value: '25', label: '25 条每页' },
  { value: '50', label: '50 条每页' },
  { value: '75', label: '75 条每页' },
  { value: '100', label: '100 条每页' },
];

describe('Pagination with showSizeChanger', () => {
  it('should onChange called when pageSize change', () => {
    const onChange = jest.fn();
    const { container, getByRole } = render(
      <Pagination
        defaultCurrent={1}
        total={500}
        selectComponentClass={Select}
        showSizeChanger={{
          options,
          onChange,
        }}
      />,
    );
    const select = getByRole('combobox');
    expect(select).toBeTruthy();
    fireEvent.mouseDown(select);
    expect(container.querySelectorAll('.rc-select-item')[2]).toHaveTextContent(
      '50 条每页',
    );
    const pageSize1 = container.querySelectorAll('.rc-select-item')[1];
    fireEvent.click(pageSize1);
    expect(onChange).toHaveBeenCalledWith('25', {
      label: '25 条每页',
      value: '25',
    });
  });

  it('should onChange called when pageSize change with search', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Pagination
        defaultCurrent={1}
        total={500}
        selectComponentClass={Select}
        showSizeChanger={{
          options,
          showSearch: true,
          onChange,
        }}
      />,
    );
    expect(container.querySelector('input').hasAttribute('readOnly')).toBe(
      false,
    );
    await userEvent.type(container.querySelector('input'), '25');
    expect(
      container.querySelectorAll('.rc-select-item-option-content'),
    ).toHaveLength(1);
    expect(
      container.querySelector('.rc-select-item-option-content').textContent,
    ).toBe('25 条每页');
    const pageSize1 = container.querySelector('.rc-select-item-option-content');
    expect(pageSize1).toBeInTheDocument();
    fireEvent.click(pageSize1);
    expect(onChange).toHaveBeenCalledWith('25', {
      label: '25 条每页',
      value: '25',
    });
  });
});
