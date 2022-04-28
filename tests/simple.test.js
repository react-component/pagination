import React, { useState } from 'react';
import { mount } from 'enzyme';
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
    expect(wrapper.state().current).toBe(1);
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
    expect(component.state().current).toBe(3);
    const greaterCurrent = component.find('.rc-pagination-simple');
    const input = greaterCurrent.find('input');
    input.simulate('change', { target: { value: '313423434343343452121' } });
    expect(input.getDOMNode().value).toBe('3');
    expect(component.state().current).toBe(3);
  });
});
