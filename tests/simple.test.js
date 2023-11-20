import { mount } from 'enzyme';
import Select from 'rc-select';
import React, { useState } from 'react';
import Pagination from '../src';

describe('simple Pagination', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Pagination
        simple
        defaultCurrent={1}
        total={25}
        showTotal={(total, range) =>
          `${range[0]} - ${range[1]} of ${total} items`
        }
      />,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('input change value will emit onChange when input blur', () => {
    const onChange = jest.fn();
    const component = mount(
      <Pagination simple total={25} onChange={onChange} />,
    );
    const greaterCurrent = component.find('.rc-pagination-simple');
    const input = greaterCurrent.find('input');
    input.simulate('change', { target: { value: '2' } });
    input.simulate('blur');
    expect(onChange).toBeCalled();
  });

  it('should return to 1 when blur goto input in uncontrol mode', () => {
    const component = mount(
      <Pagination simple defaultCurrent={1} total={25} />,
    );
    const input = component.find('.rc-pagination-simple').find('input');
    input.simulate('focus');
    input.simulate('change', { target: { value: '' } });
    input.simulate('blur');
    expect(input.getDOMNode().value).toBe('1');
  });

  it('should return to 1 when blur goto input in control mode', () => {
    const App = () => {
      const [current, setCurrent] = useState(1);
      return <Pagination simple current={1} total={25} onChange={setCurrent} />;
    };
    const component = mount(<App />);
    const input = component.find('.rc-pagination-simple').find('input');
    input.simulate('focus');
    input.simulate('change', { target: { value: '' } });
    input.simulate('blur');
    expect(input.getDOMNode().value).toBe('1');
  });

  it('default current page is 1', () => {
    // expect(wrapper.state().current).toBe(1); // Class Component
    expect(wrapper.find('.rc-pagination-simple-pager').prop('title')).toBe(
      '1/3',
    );
    expect(
      wrapper.find('.rc-pagination-simple').find('input').getDOMNode().value,
    ).toBe('1');
  });

  it('prev-button should be disabled', () => {
    const prevButton = wrapper.find('.rc-pagination-prev');
    expect(prevButton.hasClass('rc-pagination-disabled')).toBe(true);
    expect(prevButton.getDOMNode().getAttribute('aria-disabled')).toBe('true');
  });

  it('no quick jump', () => {
    const simplePagers = wrapper.find('.rc-pagination-simple-pager');
    expect(simplePagers.length).toBe(1);
  });

  it('simple Pagination when current is greater than page count', () => {
    const component = mount(
      <Pagination simple defaultCurrent={100} total={25} />,
    );
    // expect(component.state().current).toBe(3); // Class Component
    expect(component.find('.rc-pagination-simple-pager').prop('title')).toBe(
      '3/3',
    );
    const greaterCurrent = component.find('.rc-pagination-simple');
    const input = greaterCurrent.find('input');
    input.simulate('change', { target: { value: '313423434343343452121' } });
    expect(input.getDOMNode().value).toBe('3');
    // expect(component.state().current).toBe(3); // Class Component
    expect(component.find('.rc-pagination-simple-pager').prop('title')).toBe(
      '3/3',
    );
  });

  it('should merge custom pageSize to pageSizeOptions', () => {
    const wrapper = mount(
      <Pagination
        simple
        total={500}
        pageSize={15}
        showSizeChanger
        selectComponentClass={Select}
      />,
    );
    wrapper.find(Select).find('input').simulate('mousedown');
    expect(wrapper.find(Select).find('.rc-select-item').length).toBe(5);
  });

  it('should onChange called when pageSize change', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Pagination
        simple
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

  it('should support keyboard event', () => {
    const input = wrapper.find('.rc-pagination-simple').find('input');
    input.simulate('change', { target: { value: '2' } });
    input.simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 });
    expect(input.getDOMNode().value).toBe('2');
  });

  it('should support keyboard event when press up or down key', () => {
    const input = wrapper.find('.rc-pagination-simple').find('input');
    input.simulate('keyUp', { key: 'ArrowDown', keyCode: 40, which: 40 });
    input.simulate('keyUp', { key: 'ArrowDown', keyCode: 40, which: 40 });
    expect(input.getDOMNode().value).toBe('3');

    input.simulate('keyUp', { key: 'ArrowUp', keyCode: 38, which: 38 });
    expect(input.getDOMNode().value).toBe('2');
  });

  it('gotoButton should work', () => {
    const wrapper = mount(
      <Pagination simple total={25} showQuickJumper={{ goButton: true }} />,
    );

    const input = wrapper.find('.rc-pagination-options').find('input');
    const gotoButton = wrapper.find('.rc-pagination-options').find('button');

    input.simulate('change', { target: { value: '2' } });
    gotoButton.simulate('click');

    expect(
      wrapper.find('.rc-pagination-simple-pager').at(0).prop('title'),
    ).toBe('2/3');
  });
});
