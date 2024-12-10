import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from 'rc-select';
import Pagination from '../src';
import { sizeChangerRender } from './commonUtil';

describe('Pagination with sizer', () => {
  it('should merge custom pageSize to pageSizeOptions', () => {
    const { container, getByRole } = render(
      <Pagination
        total={500}
        pageSize={15}
        showSizeChanger
        sizeChangerRender={sizeChangerRender}
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
        sizeChangerRender={sizeChangerRender}
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
        sizeChangerRender={sizeChangerRender}
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
        sizeChangerRender={sizeChangerRender}
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
        sizeChangerRender={sizeChangerRender}
        total={500}
        defaultPageSize={20}
        pageSizeOptions={[20, 50]}
      />,
    );
    expect(
      container.querySelector('.rc-select-selection-item'),
    ).toHaveTextContent('20 条/页');
  });
});
