import type { RenderResult } from '@testing-library/react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../src';
import * as React from 'react';

describe('Pagination with jumper', () => {
  let wrapper: RenderResult;
  const onChange = jest.fn();
  const $$ = (selector: string) => wrapper.container.querySelector(selector);

  beforeEach(() => {
    wrapper = render(
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
    const quickJumper = $$('.rc-pagination-options-quick-jumper');
    expect(quickJumper).toBeTruthy();
    const input = quickJumper.querySelector('input');
    fireEvent.change(input, { target: { value: '-1' } });
    fireEvent.keyUp(input, { key: 'Enter', keyCode: 13, which: 13 });
    expect($$('.rc-pagination-item-active')).toHaveTextContent('1');
    expect(onChange).toHaveBeenLastCalledWith(1, 10);
  });

  it('should not call onChange when blur input', () => {
    const quickJumper = $$('.rc-pagination-options-quick-jumper');
    const input = quickJumper.querySelector('input');
    fireEvent.blur(input);
    expect($$('.rc-pagination-item-active')).toHaveTextContent('10');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should not jumper when click pre/next button', () => {
    const quickJumper = $$('.rc-pagination-options-quick-jumper');
    const input = quickJumper.querySelector('input');
    fireEvent.change(input, { target: { value: '13' } });

    const relatedTarget = document.createElement('a');
    relatedTarget.className = 'rc-pagination-item-link';
    fireEvent.blur(input, { relatedTarget });

    expect(input).toHaveValue('');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should not jumper when click page', () => {
    const quickJumper = $$('.rc-pagination-options-quick-jumper');
    const input = quickJumper.querySelector('input');
    fireEvent.change(input, { target: { value: '13' } });

    const relatedTarget = document.createElement('a');
    relatedTarget.className = 'rc-pagination-item';
    fireEvent.blur(input, { relatedTarget });

    expect(input).toHaveValue('');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should not jump when input empty string', () => {
    const onChangeFn = jest.fn();
    const { container } = render(
      <Pagination
        onChange={onChangeFn}
        total={25}
        showQuickJumper={{
          goButton: (
            <button type="button" className="go-button">
              go
            </button>
          ),
        }}
      />,
    );
    const quickJumper = container.querySelector(
      '.rc-pagination-options-quick-jumper',
    );
    const input = quickJumper.querySelector('input');
    const goButton = quickJumper.querySelector('.go-button');
    fireEvent.change(input, { target: { value: '3' } });
    fireEvent.click(goButton);
    expect(
      container.querySelector('.rc-pagination-item-active'),
    ).toHaveTextContent('3');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(goButton);
    expect(
      container.querySelector('.rc-pagination-item-active'),
    ).toHaveTextContent('3');
    expect(onChangeFn).toHaveBeenLastCalledWith(3, 10);
  });
});

describe('simple quick jumper', () => {
  let wrapper: RenderResult;
  const onChange = jest.fn();

  beforeEach(() => {
    wrapper = render(
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
    const quickJumper = wrapper.container.querySelector(
      '.rc-pagination-options-quick-jumper',
    );
    const input = quickJumper.querySelector('input');
    const goButton = quickJumper.querySelector('.go-button');
    fireEvent.change(input, { target: { value: '2' } });
    fireEvent.click(goButton);
    expect(
      wrapper.container.querySelector('.rc-pagination-simple-pager input'),
    ).toHaveValue('2');
    expect(onChange).toHaveBeenLastCalledWith(2, 10);
  });

  describe('custom showQuickJumper button Pagination', () => {
    beforeEach(() => {
      wrapper = render(
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
      const quickJumper = wrapper.container.querySelector(
        '.rc-pagination-options-quick-jumper',
      );
      const input = quickJumper.querySelector('input');
      const goButton = quickJumper.querySelector('.go-button');
      fireEvent.change(input, { target: { value: '2' } });
      fireEvent.click(goButton);
      expect(
        wrapper.container.querySelector('.rc-pagination-item-active'),
      ).toHaveTextContent('2');
      expect(onChange).toHaveBeenLastCalledWith(2, 10);
    });

    // https://github.com/ant-design/ant-design/issues/10080
    it('should not quick jump to previous page when input invalid char', () => {
      const nextButton = wrapper.container.querySelector('.rc-pagination-next');
      fireEvent.click(nextButton);
      const input = wrapper.container.querySelector('input');
      fireEvent.change(input, { target: { value: '&' } });
      fireEvent.keyUp(input, { key: 'Enter', keyCode: 13, which: 13 });
      expect(
        wrapper.container.querySelector('.rc-pagination-item-active'),
      ).toHaveTextContent('2');
      expect(onChange).toHaveBeenLastCalledWith(2, 10);
    });
  });

  it('goButton could be true', () => {
    wrapper = render(
      <Pagination
        onChange={onChange}
        defaultCurrent={10}
        total={1000}
        showQuickJumper={{ goButton: true }}
      />,
    );
    expect(
      wrapper.container.querySelector(
        '.rc-pagination-options-quick-jumper-button',
      ),
    ).toBeTruthy();
  });

  it('goButton defaultly hidden', () => {
    wrapper = render(
      <Pagination
        onChange={onChange}
        defaultCurrent={10}
        total={1000}
        showQuickJumper
      />,
    );
    expect(
      wrapper.container.querySelector(
        '.rc-pagination-options-quick-jumper-button',
      ),
    ).toBeFalsy();
  });

  it('goButton could be false', () => {
    wrapper = render(
      <Pagination
        onChange={onChange}
        defaultCurrent={10}
        total={1000}
        showQuickJumper={{ goButton: false }}
      />,
    );
    expect(
      wrapper.container.querySelector(
        '.rc-pagination-options-quick-jumper-button',
      ),
    ).toBeFalsy();
  });

  it('Quick Jumper should hide when only one page', () => {
    wrapper = render(
      <Pagination onChange={onChange} total={5} showQuickJumper />,
    );
    expect(
      wrapper.container.querySelector(
        '.rc-pagination-options-quick-jumper-button',
      ),
    ).toBeFalsy();
  });

  // https://github.com/ant-design/ant-design/issues/32991
  it('Quick Jumper should hide when only one page when has pageSize', () => {
    wrapper = render(
      <Pagination
        onChange={onChange}
        total={5}
        pageSize={10}
        showQuickJumper
      />,
    );
    expect(
      wrapper.container.querySelector(
        '.rc-pagination-options-quick-jumper-button',
      ),
    ).toBeFalsy();
  });
});
