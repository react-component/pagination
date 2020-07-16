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

  it('should show display all option when includes show all', () => {
    const wrapper = mount(
      <Pagination
        selectComponentClass={Select}
        pageSizeOptions={['10', '20', '50', '100', Pagination.SHOW_ALL]}
        total={1250}
        defaultPageSize={20}
      />,
    );
    wrapper.find(Select).find('input').simulate('mousedown');
    expect(wrapper.find(Select).find('.rc-select-item').length).toBe(5);
    expect(wrapper.find(Select).find('.rc-select-item').at(4).text()).toBe(
      '显示全部',
    );
  });

  it("should not show display all option when doesn't include show all", () => {
    const wrapper = mount(
      <Pagination
        selectComponentClass={Select}
        total={1250}
        defaultPageSize={20}
      />,
    );
    wrapper.find(Select).find('input').simulate('mousedown');
    expect(wrapper.find(Select).find('.rc-select-item').length).toBe(4);
    expect(wrapper.find(Select).find('.rc-select-item').at(3).text()).toBe(
      '100 条/页',
    );
  });

  it('should not render duplicate option equals total when includes show all', () => {
    const wrapper = mount(
      <Pagination
        selectComponentClass={Select}
        pageSizeOptions={['10', '20', '50', '100', Pagination.SHOW_ALL]}
        total={100}
        defaultPageSize={20}
      />,
    );
    wrapper.find(Select).find('input').simulate('mousedown');
    expect(wrapper.find(Select).find('.rc-select-item').length).toBe(4);
    expect(wrapper.find(Select).find('.rc-select-item').at(3).text()).toBe(
      '显示全部',
    );
  });

  it('should be total when choose display all', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Pagination
        selectComponentClass={Select}
        onChange={onChange}
        pageSizeOptions={['10', '20', '50', '100', Pagination.SHOW_ALL]}
        total={1250}
        defaultPageSize={20}
      />,
    );
    wrapper.find(Select).find('input').simulate('mousedown');
    expect(wrapper.find(Select).find('.rc-select-item').at(4).text()).toBe(
      '显示全部',
    );
    const totalBtn = wrapper.find(Select).find('.rc-select-item').at(4);
    totalBtn.simulate('click');
    expect(onChange).toBeCalled();
    expect(onChange).toHaveBeenLastCalledWith(1, 1250);
  });
});
