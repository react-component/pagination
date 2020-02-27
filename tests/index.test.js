import React from 'react';
import { mount } from 'enzyme';
import Pagination from '../src';

describe('Uncontrolled Pagination', () => {
  let wrapper;
  const onChange = jest.fn();

  function shouldHighlightRight() {
    const pagers = wrapper.find('li:not(.rc-pagination-total-text)');
    pagers.forEach((pager, index) => {
      // page starts from 1
      if (index === wrapper.state().current) {
        expect(pager.hasClass('rc-pagination-item-active')).toBe(true);
      } else {
        expect(pager.hasClass('rc-pagination-item-active')).toBe(false);
      }
    });
  }

  beforeEach(() => {
    wrapper = mount(
      <Pagination
        defaultCurrent={1}
        onChange={onChange}
        total={25}
        showQuickJumper={{ goButton: true }}
        showTotal={(total, range) =>
          `${range[0]} - ${range[1]} of ${total} items`
        }
      />,
    );
  });

  afterEach(() => {
    wrapper.unmount();
    onChange.mockReset();
  });

  it('default current page is 1', () => {
    expect(wrapper.state().current).toBe(1);
  });

  it('prev-button should be disabled', () => {
    const prevButton = wrapper.find('.rc-pagination-prev');
    expect(prevButton.hasClass('rc-pagination-disabled')).toBe(true);
    expect(prevButton.getDOMNode().getAttribute('aria-disabled')).toBe('true');
  });

  it(
    'should hightlight current page and not highlight other page',
    shouldHighlightRight,
  );

  it('should calc page right', () => {
    const pagers = wrapper.find(
      'li:not(.rc-pagination-total-text):not(.rc-pagination-options)',
    );
    const knownPageCount = 3;
    const buttonLength = 2;
    expect(pagers.length).toBe(knownPageCount + buttonLength);
  });

  it('next button should not be disabled', () => {
    const nextButton = wrapper.find('.rc-pagination-next');
    expect(nextButton.hasClass('rc-pagination-disabled')).toBe(false);
    expect(nextButton.getDOMNode().getAttribute('aria-disabled')).toBe('false');
  });

  it('should response mouse click right', () => {
    const pagers = wrapper.find('.rc-pagination-item');
    expect(pagers.length).toBe(3);
    const page2 = pagers.at(1);
    expect(page2.hasClass('rc-pagination-item-2')).toBe(true);
    page2.simulate('click');
    expect(wrapper.state().current).toBe(2);
    expect(onChange).toHaveBeenLastCalledWith(2, 10);
    shouldHighlightRight();
  });

  it('should response next page', () => {
    const nextButton = wrapper.find('.rc-pagination-next');
    nextButton.simulate('click');
    expect(wrapper.state().current).toBe(2);
    expect(onChange).toHaveBeenLastCalledWith(2, 10);
    shouldHighlightRight();
  });

  it('should quick jump to expect page', () => {
    const quickJumper = wrapper.find('.rc-pagination-options-quick-jumper');
    const input = quickJumper.find('input');
    const goButton = quickJumper.find('button');
    input.simulate('change', { target: { value: '2' } });
    goButton.simulate('click');
    expect(wrapper.state().current).toBe(2);
    expect(onChange).toHaveBeenLastCalledWith(2, 10);
  });

  // https://github.com/ant-design/ant-design/issues/17763
  it('should not jump when blur input when there is goButton', () => {
    const quickJumper = wrapper.find('.rc-pagination-options-quick-jumper');
    const input = quickJumper.find('input');
    input.simulate('focus');
    input.simulate('change', { target: { value: '2' } });
    input.simulate('blur');
    expect(wrapper.state().current).toBe(1);
    expect(onChange).not.toBeCalled();
  });

  // https://github.com/ant-design/ant-design/issues/17763
  it('should not jump when blur input when there is not goButton', () => {
    const component = mount(
      <Pagination pageSize={10} total={20} showQuickJumper />,
    );
    const quickJumper = component.find('.rc-pagination-options-quick-jumper');
    const input = quickJumper.find('input');
    input.simulate('change', { target: { value: '2' } });
    input.simulate('blur');
    expect(component.state().current).toBe(2);
  });

  // https://github.com/ant-design/ant-design/issues/15539
  it('should hide quick jumper when only one page', () => {
    const component = mount(
      <Pagination pageSize={10} total={10} showQuickJumper />,
    );
    const quickJumper = component.find('.rc-pagination-options-quick-jumper');
    expect(quickJumper.length).toBe(0);
  });

  it('should display total items', () => {
    const totalText = wrapper.find('.rc-pagination-total-text');
    expect(totalText.text()).toBe('1 - 10 of 25 items');
    const nextButton = wrapper.find('.rc-pagination-next');
    nextButton.simulate('click');
    expect(totalText.text()).toBe('11 - 20 of 25 items');
    nextButton.simulate('click');
    expect(totalText.text()).toBe('21 - 25 of 25 items');
  });
});

describe('Controlled Pagination', () => {
  let wrapper;
  const onChange = jest.fn();

  beforeEach(() => {
    wrapper = mount(<Pagination current={2} onChange={onChange} total={25} />);
  });

  afterEach(() => {
    wrapper.unmount();
    onChange.mockReset();
  });

  it('current should equal defaultCurrent', () => {
    expect(wrapper.state().current).toBe(2);
  });

  it('should not response mouse click', () => {
    const nextButton = wrapper.find('.rc-pagination-next');
    nextButton.simulate('click');
    expect(wrapper.state().current).toBe(2);
    expect(onChange).toHaveBeenLastCalledWith(3, 10);
  });
});
