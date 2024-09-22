import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from 'rc-select';
import Pagination from '../src';

describe('Pagination with sizer', () => {
  it('should merge custom pageSize to pageSizeOptions', () => {
    const { container, getByRole } = render(
      <Pagination
        total={500}
        pageSize={15}
        showSizeChanger
        selectComponentClass={Select}
      />,
    );
    const select = getByRole('combobox');
    expect(select).toBeTruthy();
    fireEvent.mouseDown(select);
    expect(container.querySelectorAll('.rc-select-item')).toHaveLength(5);
  });

  it('should not merge duplicated pageSize to pageSizeOptions', () => {
    const { container, getByRole } = render(
      <Pagination
        total={500}
        pageSize={20}
        showSizeChanger
        selectComponentClass={Select}
      />,
    );
    fireEvent.mouseDown(getByRole('combobox'));
    expect(container.querySelectorAll('.rc-select-item')).toHaveLength(4);
  });

  it('should merge pageSize to pageSizeOptions with proper order', () => {
    const { container, getByRole } = render(
      <Pagination
        total={500}
        pageSize={45}
        showSizeChanger
        selectComponentClass={Select}
      />,
    );
    fireEvent.mouseDown(getByRole('combobox'));
    expect(container.querySelectorAll('.rc-select-item')).toHaveLength(5);
    expect(container.querySelectorAll('.rc-select-item')[2]).toHaveTextContent(
      '45 条/页✓',
    );
  });

  it('should onChange called when pageSize change', () => {
    const onChange = jest.fn();
    const { container, getByRole } = render(
      <Pagination
        selectComponentClass={Select}
        onChange={onChange}
        total={500}
        defaultPageSize={20}
      />,
    );
    fireEvent.mouseDown(getByRole('combobox'));
    expect(container.querySelectorAll('.rc-select-item')[2]).toHaveTextContent(
      '50 条/页',
    );
    const pageSize1 = container.querySelectorAll('.rc-select-item')[0];
    fireEvent.click(pageSize1);
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith(1, 10);
  });

  // https://github.com/ant-design/ant-design/issues/26580
  it('should contains locale text in selected pageSize when pageSizeOptions are numbers', () => {
    const { container } = render(
      <Pagination
        selectComponentClass={Select}
        total={500}
        defaultPageSize={20}
        pageSizeOptions={[20, 50]}
      />,
    );
    expect(
      container.querySelector('.rc-select-selection-item'),
    ).toHaveTextContent('20 条/页');
  });

  describe('showSizeChanger is object', () => {
    const options = [
      { value: '10', label: '10 条每页' },
      { value: '25', label: '25 条每页' },
      { value: '50', label: '50 条每页' },
      { value: '75', label: '75 条每页' },
      { value: '100', label: '100 条每页' },
    ];

    it('showSizeChanger.className should be added to select node', async () => {
      const { container } = render(
        <Pagination
          defaultCurrent={1}
          total={500}
          selectComponentClass={Select}
          showSizeChanger={{
            className: 'custom-class-name',
          }}
        />,
      );
      const select = container.querySelector('.rc-select');
      expect(select.className).toContain('custom-class-name');
      expect(select.className).toContain('rc-pagination-options-size-changer');
    });

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
      expect(
        container.querySelectorAll('.rc-select-item')[2],
      ).toHaveTextContent('50 条每页');
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
      const pageSize1 = container.querySelector(
        '.rc-select-item-option-content',
      );
      expect(pageSize1).toBeInTheDocument();
      fireEvent.click(pageSize1);
      expect(onChange).toHaveBeenCalledWith('25', {
        label: '25 条每页',
        value: '25',
      });
    });
  });
});
