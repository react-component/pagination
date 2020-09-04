import React from 'react';
import { mount } from 'enzyme';
import Select from 'rc-select';
import Pagination from '../src';

describe('Pagination with sizer', () => {
  it('should merge custom pageSize to pageSizeOptions', () => {
    const wrapper = mount(
      <Pagination
        total={500}
        pageSize={15}
        showSizeChanger
        selectComponentClass={Select}
      />,
    );
    wrapper.find(Select).find('input').simulate('mousedown');
    expect(wrapper.find(Select).find('.rc-select-item').length).toBe(5);
  });

  it('should not merge duplicated pageSize to pageSizeOptions', () => {
    const wrapper = mount(
      <Pagination
        total={500}
        pageSize={20}
        showSizeChanger
        selectComponentClass={Select}
      />,
    );
    wrapper.find(Select).find('input').simulate('mousedown');
    expect(wrapper.find(Select).find('.rc-select-item').length).toBe(4);
  });

  it('should merge pageSize to pageSizeOptions with proper order', () => {
    const wrapper = mount(
      <Pagination
        total={500}
        pageSize={45}
        showSizeChanger
        selectComponentClass={Select}
      />,
    );
    wrapper.find(Select).find('input').simulate('mousedown');
    expect(wrapper.find(Select).find('.rc-select-item').at(2).text()).toBe(
      '45 条/页✓',
    );
  });

  it('should onChange called when pageSize change', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Pagination
        selectComponentClass={Select}
        onChange={onChange}
        total={500}
        defaultPageSize={20}
      />,
    );
    wrapper.find(Select).find('input').simulate('mousedown');
    expect(wrapper.find(Select).find('.rc-select-item').at(2).text()).toBe(
      '50 条/页',
    );
    const pageSize1 = wrapper.find(Select).find('.rc-select-item').at(0);
    pageSize1.simulate('click');
    expect(onChange).toBeCalled();
    expect(onChange).toHaveBeenLastCalledWith(1, 10);
  });

  // https://github.com/ant-design/ant-design/issues/26580
  it('should contains locale text in selected pageSize when pageSizeOptions are numbers', () => {
    const wrapper = mount(
      <Pagination
        selectComponentClass={Select}
        total={500}
        defaultPageSize={20}
        pageSizeOptions={[20, 50]}
      />,
    );
    expect(wrapper.find(Select).find('.rc-select-selection-item').text()).toBe(
      '20 条/页',
    );
  });
});
