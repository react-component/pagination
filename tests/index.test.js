import React from 'react';
import { mount } from 'enzyme';
import Select from 'rc-select';
import Pagination from '../src';

describe('Default Pagination', () => {
  let wrapper;
  const onChange = jest.fn();

  beforeEach(() => {
    wrapper = mount(<Pagination onChange={onChange} />);
  });

  afterEach(() => {
    wrapper.unmount();
    onChange.mockReset();
  });

  it('onChange should be forbidden when total is default', () => {
    const pagers = wrapper.find('.rc-pagination-item');
    const page1 = pagers.at(0);
    page1.simulate('click');
    expect(onChange).toBeCalledTimes(0);
  });
});

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
    const goButton = quickJumper.find(
      '.rc-pagination-options-quick-jumper-button',
    );
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

describe('Other props', () => {
  it('should support custom default icon', () => {
    const nextIcon = () => <span>nextIcon</span>;
    const prevIcon = () => <span>prevIcon</span>;
    const jumpNextIcon = () => <span>jumpNextIcon</span>;
    const jumpPrevIcon = () => <span>jumpPrevIcon</span>;
    const iconsProps = {
      prevIcon,
      nextIcon,
      jumpPrevIcon,
      jumpNextIcon,
    };
    const wrapper = mount(
      <Pagination total={1000} current={12} {...iconsProps} />,
    );
    const prev = wrapper.find('.rc-pagination-prev');
    const next = wrapper.find('.rc-pagination-next');
    const jumpPrev = wrapper.find('.rc-pagination-jump-prev');
    const jumpNext = wrapper.find('.rc-pagination-jump-next');
    expect(prev.text()).toBe('prevIcon');
    expect(next.text()).toBe('nextIcon');
    expect(jumpPrev.text()).toBe('jumpPrevIcon');
    expect(jumpNext.text()).toBe('jumpNextIcon');
  });

  describe('showPrevNextJumpers props', () => {
    it('should hide jump-prev, jump-next if showPrevNextJumpers equals false', () => {
      const wrapper = mount(
        <Pagination total={1000} current={12} showPrevNextJumpers={false} />,
      );
      const prev = wrapper.find('.rc-pagination-jump-prev');
      const next = wrapper.find('.rc-pagination-jump-next');
      expect(prev.exists()).toBe(false);
      expect(next.exists()).toBe(false);
    });

    it('should show jump-prev, jump-next if showPrevNextJumpers equals true', () => {
      const wrapper = mount(
        <Pagination total={1000} current={12} showPrevNextJumpers />,
      );
      const prev = wrapper.find('.rc-pagination-jump-prev');
      const next = wrapper.find('.rc-pagination-jump-next');
      expect(prev.exists()).toBe(true);
      expect(next.exists()).toBe(true);
    });
  });

  describe('hideOnSinglePage props', () => {
    const itemRender = (current) => <a href={`#${current}`}>{current}</a>;

    it('should hide pager if hideOnSinglePage equals true', () => {
      const wrapper = mount(
        <Pagination total={10} itemRender={itemRender} hideOnSinglePage />,
      );
      expect(wrapper.find('.rc-pagination').exists()).toBe(false);
    });

    it('should show pager if hideOnSinglePage equals false', () => {
      const wrapper = mount(
        <Pagination
          total={10}
          itemRender={itemRender}
          hideOnSinglePage={false}
        />,
      );
      expect(wrapper.find('.rc-pagination').exists()).toBe(true);
    });

    it('should show pager if hideOnSinglePage equals true but more than 1 page', () => {
      const wrapper = mount(
        <Pagination
          total={10}
          pageSize={5}
          itemRender={itemRender}
          hideOnSinglePage={false}
        />,
      );
      expect(wrapper.find('.rc-pagination').exists()).toBe(true);
    });
  });

  it('disabled', () => {
    const wrapper = mount(
      <Pagination
        selectComponentClass={Select}
        showQuickJumper={{ goButton: true }}
        showSizeChanger
        defaultPageSize={20}
        defaultCurrent={5}
        total={450}
        disabled
      />,
    );
    expect(wrapper.find('.rc-pagination-disabled').exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.find(Select).props().disabled).toBe(true);
    expect(wrapper.find('input').at(0).getDOMNode().disabled).toBe(true);
    expect(
      wrapper
        .find('.rc-pagination-options-quick-jumper-button')
        .at(0)
        .getDOMNode().disabled,
    ).toBe(true);
  });
});

// https://github.com/ant-design/ant-design/issues/10524
describe('current value on onShowSizeChange when total is 0', () => {
  let wrapper;
  const onShowSizeChange = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <Pagination
        selectComponentClass={Select}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        current={1}
        total={0}
        showTotal={(total, range) =>
          `${range[0]} - ${range[1]} of ${total} items`
        }
      />,
    );
  });

  afterEach(() => {
    wrapper.unmount();
    onShowSizeChange.mockReset();
  });

  it('should call onShowSizeChange when no change', () => {
    const sizeChanger = wrapper
      .find('.rc-pagination-options-size-changer')
      .at(0);
    sizeChanger.simulate('click');
    const input = sizeChanger.find('input');
    input.simulate('keyDown', { key: 'Down', keyCode: 40, which: 40 });
    input.simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 });
    expect(onShowSizeChange).not.toBeCalled();
  });

  it('current should equal to the current in onShowSizeChange', () => {
    const sizeChanger = wrapper
      .find('.rc-pagination-options-size-changer')
      .at(0);
    sizeChanger.simulate('click');
    const input = sizeChanger.find('input');
    input.simulate('keyDown', { key: 'Down', keyCode: 40, which: 40 });
    input.simulate('keyDown', { key: 'Down', keyCode: 40, which: 40 });
    input.simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 });
    expect(onShowSizeChange).toHaveBeenLastCalledWith(
      wrapper.state().current,
      20,
    );
  });

  it('when total is 0, pager should show `1` and being disabled', () => {
    const itemButton = wrapper.find('.rc-pagination-item');
    expect(itemButton.hasClass('rc-pagination-item-disabled')).toBe(true);
    expect(itemButton.text()).toBe('1');
  });

  it('when total is 0, `from` and `to` should be 0', () => {
    const totalText = wrapper.find('.rc-pagination-total-text');
    expect(totalText.text()).toBe('0 - 0 of 0 items');
  });

  it('size changer show logic', () => {
    const wrapper1 = mount(
      <Pagination selectComponentClass={Select} total={50} />,
    );
    expect(wrapper1.exists('.rc-pagination-options-size-changer')).toBe(false);
    const wrapper2 = mount(
      <Pagination selectComponentClass={Select} total={51} />,
    );
    expect(wrapper2.exists('.rc-pagination-options-size-changer')).toBe(true);
    const wrapper3 = mount(
      <Pagination
        selectComponentClass={Select}
        showSizeChanger={false}
        total={51}
      />,
    );
    expect(wrapper3.exists('.rc-pagination-options-size-changer')).toBe(false);
    const wrapper4 = mount(
      <Pagination selectComponentClass={Select} showSizeChanger total={50} />,
    );
    expect(wrapper4.exists('.rc-pagination-options-size-changer')).toBe(true);
  });

  it('totalBoundaryShowSizeChanger works', () => {
    const wrapper1 = mount(
      <Pagination
        selectComponentClass={Select}
        total={100}
        totalBoundaryShowSizeChanger={100}
      />,
    );
    expect(wrapper1.exists('.rc-pagination-options-size-changer')).toBe(false);
    const wrapper2 = mount(
      <Pagination
        selectComponentClass={Select}
        total={101}
        totalBoundaryShowSizeChanger={100}
      />,
    );
    expect(wrapper2.exists('.rc-pagination-options-size-changer')).toBe(true);
    const wrapper3 = mount(
      <Pagination
        selectComponentClass={Select}
        showSizeChanger={false}
        total={101}
        totalBoundaryShowSizeChanger={100}
      />,
    );
    expect(wrapper3.exists('.rc-pagination-options-size-changer')).toBe(false);
    const wrapper4 = mount(
      <Pagination
        selectComponentClass={Select}
        showSizeChanger
        total={100}
        totalBoundaryShowSizeChanger={100}
      />,
    );
    expect(wrapper4.exists('.rc-pagination-options-size-changer')).toBe(true);
  });
});

describe('should emit onChange when total is string', () => {
  let wrapper;
  const onChange = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <Pagination total="100" pageSize={10} onChange={onChange} />,
    );
  });

  afterEach(() => {
    wrapper.unmount();
    onChange.mockReset();
  });

  it('onChange should be called when click page', () => {
    const pagers = wrapper.find('.rc-pagination-item-3');
    const page1 = pagers.at(0);
    page1.simulate('click');
    expect(onChange).toBeCalledWith(3, 10);
  });
});
