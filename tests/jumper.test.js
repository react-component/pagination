import React from 'react';
import { mount } from 'enzyme';
import Pagination from '../src';

describe('Pagination with jumper', () => {
  let wrapper;
  const onChange = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <Pagination
        onChange={onChange}
        defaultCurrent={10}
        total={1000}
        showQuickJumper
      />,
    );
  });

  afterEach(() => {
    wrapper.unmount();
    onChange.mockReset();
  });

  it('when input less than 1', () => {
    const quickJumper = wrapper.find('.rc-pagination-options-quick-jumper');
    const input = quickJumper.find('input');
    input.simulate('change', { target: { value: '-1' } });
    input.simulate('keyUp', { key: 'Enter', keyCode: 13, which: 13 });
    expect(wrapper.state().current).toBe(1);
    expect(onChange).toHaveBeenLastCalledWith(1, 10);
  });

  it('should not call onChange when blur input', () => {
    const quickJumper = wrapper.find('.rc-pagination-options-quick-jumper');
    const input = quickJumper.find('input');
    input.simulate('blur');
    expect(wrapper.state().current).toBe(10);
    expect(onChange).not.toBeCalled();
  });

  it('should not jumper when click pre/next button', () => {
    const quickJumper = wrapper.find('.rc-pagination-options-quick-jumper');
    const input = quickJumper.find('input');
    input.simulate('change', { target: { value: '13' } });
    const mockEvent = {
      relatedTarget: {
        className: 'rc-pagination-item-link',
      },
    };
    input.simulate('blur', mockEvent);
    expect(input.instance().value).toBe('');
    expect(onChange).not.toBeCalled();
  });

  it('should not jumper when click page', () => {
    const quickJumper = wrapper.find('.rc-pagination-options-quick-jumper');
    const input = quickJumper.find('input');
    input.simulate('change', { target: { value: '13' } });
    const mockEvent = {
      relatedTarget: {
        className: 'rc-pagination-item',
      },
    };
    input.simulate('blur', mockEvent);
    expect(input.instance().value).toBe('');
    expect(onChange).not.toBeCalled();
  });
});

describe('simple quick jumper', () => {
  let wrapper;
  const onChange = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <Pagination
        simple
        onChange={onChange}
        defaultCurrent={1}
        total={25}
        showQuickJumper={{
          goButton: (
            <button type="button" className="go-button">
              go
            </button>
          ),
        }}
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

  it('should quick jump to expect page', () => {
    const quickJumper = wrapper.find('.rc-pagination-simple');
    const input = quickJumper.find('input');
    const goButton = quickJumper.find('.go-button');
    input.simulate('change', { target: { value: '2' } });
    goButton.simulate('click');
    expect(wrapper.state().current).toBe(2);
    expect(onChange).toHaveBeenLastCalledWith(2, 10);
  });

  describe('custom showQuickJumper button Pagination', () => {
    beforeEach(() => {
      wrapper = mount(
        <Pagination
          onChange={onChange}
          defaultCurrent={1}
          total={25}
          showQuickJumper={{
            goButton: (
              <button type="button" className="go-button">
                go
              </button>
            ),
          }}
          showTotal={(total, range) =>
            `${range[0]} - ${range[1]} of ${total} items`
          }
        />,
      );
    });

    it('should quick jump to expect page', () => {
      const quickJumper = wrapper.find('.rc-pagination-options-quick-jumper');
      const input = quickJumper.find('input');
      const goButton = quickJumper.find('.go-button');
      input.simulate('change', { target: { value: '2' } });
      goButton.simulate('click');
      expect(wrapper.state().current).toBe(2);
      expect(onChange).toHaveBeenLastCalledWith(2, 10);
    });

    // https://github.com/ant-design/ant-design/issues/10080
    it('should not quick jump to previous page when input invalid char', () => {
      const nextButton = wrapper.find('.rc-pagination-next');
      nextButton.simulate('click');
      const input = wrapper.find('input');
      input.simulate('change', { target: { value: '&' } });
      input.simulate('keyUp', { key: 'Enter', keyCode: 13, which: 13 });
      expect(wrapper.state().current).toBe(2);
      expect(onChange).toHaveBeenLastCalledWith(2, 10);
    });
  });

  it('goButton could be true', () => {
    wrapper = mount(
      <Pagination
        onChange={onChange}
        defaultCurrent={10}
        total={1000}
        showQuickJumper={{ goButton: true }}
      />,
    );
    expect(
      wrapper.find('.rc-pagination-options-quick-jumper-button').exists(),
    ).toBe(true);
  });

  it('goButton defaultly hidden', () => {
    wrapper = mount(
      <Pagination
        onChange={onChange}
        defaultCurrent={10}
        total={1000}
        showQuickJumper
      />,
    );
    expect(
      wrapper.find('.rc-pagination-options-quick-jumper-button').exists(),
    ).toBe(false);
  });

  it('goButton could be false', () => {
    wrapper = mount(
      <Pagination
        onChange={onChange}
        defaultCurrent={10}
        total={1000}
        showQuickJumper={{ goButton: false }}
      />,
    );
    expect(
      wrapper.find('.rc-pagination-options-quick-jumper-button').exists(),
    ).toBe(false);
  });

  it('Quick Jumper should hide when only one page', () => {
    wrapper = mount(
      <Pagination onChange={onChange} total={5} showQuickJumper />,
    );
    expect(wrapper.find('.rc-pagination-options-quick-jumper').exists()).toBe(
      false,
    );
  });

  // https://github.com/ant-design/ant-design/issues/32991
  it('Quick Jumper should hide when only one page when has pageSize', () => {
    wrapper = mount(
      <Pagination
        onChange={onChange}
        total={5}
        pageSize={10}
        showQuickJumper
      />,
    );
    expect(wrapper.find('.rc-pagination-options-quick-jumper').exists()).toBe(
      false,
    );
  });
});
