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
});
