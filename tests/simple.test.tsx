import type { RenderResult } from '@testing-library/react';
import { render, fireEvent, createEvent } from '@testing-library/react';
import Select from 'rc-select';
import React, { useState } from 'react';
import Pagination from '../src';
import { sizeChangerRender } from './commonUtil';

describe('simple Pagination', () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(
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
    const { container } = render(
      <Pagination simple total={25} onChange={onChange} />,
    );
    const input = container.querySelector('.rc-pagination-simple input');
    fireEvent.change(input, { target: { value: '2' } });
    fireEvent.blur(input);
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith(2, 10);
  });

  it('should return to 1 when blur goto input in uncontrol mode', () => {
    const { container } = render(
      <Pagination simple defaultCurrent={1} total={25} />,
    );
    const input = container.querySelector('.rc-pagination-simple input');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    expect(input).toHaveValue('1');
  });

  it('should return to 1 when blur goto input in control mode', () => {
    const App = () => {
      const [, setCurrent] = useState(1);
      return <Pagination simple current={1} total={25} onChange={setCurrent} />;
    };
    const { container } = render(<App />);
    const input = container.querySelector('.rc-pagination-simple input');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    expect(input).toHaveValue('1');
  });

  it('default current page is 1', () => {
    expect(
      wrapper.container.querySelector('.rc-pagination-simple-pager'),
    ).toHaveAttribute('title', '1/3');
    expect(
      wrapper.container.querySelector('.rc-pagination-simple input'),
    ).toHaveValue('1');
  });

  it('prev-button should be disabled', () => {
    const prevButton = wrapper.container.querySelector('.rc-pagination-prev');
    expect(prevButton).toHaveClass('rc-pagination-disabled');
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('no quick jump', () => {
    const simplePagers = wrapper.container.querySelectorAll(
      '.rc-pagination-simple-pager',
    );
    expect(simplePagers).toHaveLength(1);
  });

  it('simple Pagination when current is greater than page count', () => {
    const { container } = render(
      <Pagination simple defaultCurrent={100} total={25} />,
    );

    expect(
      container.querySelector('.rc-pagination-simple-pager'),
    ).toHaveAttribute('title', '3/3');
    const input = container.querySelector('.rc-pagination-simple input');
    fireEvent.change(input, { target: { value: '313423434343343452121' } });
    expect(input).toHaveValue('3');
    expect(
      container.querySelector('.rc-pagination-simple-pager'),
    ).toHaveAttribute('title', '3/3');
  });

  it('should merge custom pageSize to pageSizeOptions', () => {
    const { container, getByRole } = render(
      <Pagination
        simple
        total={500}
        pageSize={15}
        showSizeChanger
        sizeChangerRender={sizeChangerRender}
      />,
    );
    fireEvent.mouseDown(getByRole('combobox'));
    expect(container.querySelectorAll('.rc-select-item')).toHaveLength(5);
  });

  it('should onChange called when pageSize change', () => {
    const onChange = jest.fn();
    const { container, getByRole } = render(
      <Pagination
        simple
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

  it('should support keyboard event', () => {
    const input = wrapper.container.querySelector(
      '.rc-pagination-simple input',
    );
    fireEvent.change(input, { target: { value: '2' } });
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13, which: 13 });
    expect(input).toHaveValue('2');
  });

  it('should support keyboard event when press up or down key', () => {
    const input = wrapper.container.querySelector(
      '.rc-pagination-simple input',
    );
    fireEvent.keyUp(input, { key: 'ArrowDown', keyCode: 40, which: 40 });
    fireEvent.keyUp(input, { key: 'ArrowDown', keyCode: 40, which: 40 });
    expect(input).toHaveValue('3');

    fireEvent.keyUp(input, { key: 'ArrowUp', keyCode: 38, which: 38 });
    expect(input).toHaveValue('2');
  });

  it('should work form keyboard enter', () => {
    const { container } = render(
      <Pagination total={100} defaultCurrent={5} simple />,
    );
    const input = container.querySelector('.rc-pagination-simple input');

    expect(input).toBeTruthy();

    fireEvent.change(input, { target: { value: '8' } });
    fireEvent.keyUp(input, { key: 'Enter', keyCode: 13, which: 13 });

    expect(
      container.querySelector('.rc-pagination-simple-pager'),
    ).toHaveAttribute('title', '8/10');
  });

  it(`prevent "up arrow" key reseting cursor position within textbox`, () => {
    const { container } = render(
      <Pagination total={100} defaultCurrent={5} simple />,
    );
    const input = container.querySelector('.rc-pagination-simple input');
    expect(input).toBeTruthy();

    fireEvent.change(input, { target: { value: '8' } });

    const myEvent = createEvent.keyDown(input, {
      key: 'ArrowUp',
      keyCode: 38,
      which: 38,
    });

    myEvent.preventDefault = jest.fn();

    fireEvent(input, myEvent);
    expect(myEvent.preventDefault).toHaveBeenCalled();
    expect(input).toHaveValue('8');
  });

  it('should work when input is not number', () => {
    const { container } = render(
      <Pagination total={100} defaultCurrent={5} simple />,
    );
    const input = container.querySelector('.rc-pagination-simple input');

    expect(input).toBeTruthy();

    fireEvent.change(input, { target: { value: 'a' } }); // NaN case
    fireEvent.blur(input);

    expect(
      container.querySelector('.rc-pagination-simple-pager'),
    ).toHaveAttribute('title', '5/10');
  });

  it('gotoButton should work', () => {
    const { container } = render(
      <Pagination simple total={25} showQuickJumper={{ goButton: true }} />,
    );

    const input = container.querySelector('.rc-pagination-options input');
    const gotoButton = container.querySelector('.rc-pagination-options button');

    fireEvent.change(input, { target: { value: '2' } });
    fireEvent.click(gotoButton);

    expect(
      container.querySelector('.rc-pagination-simple-pager'),
    ).toHaveAttribute('title', '2/3');
  });

  it('page should displayed correctly when controlled', () => {
    const Demo = () => {
      const [current, setCurrent] = React.useState(1);

      return (
        <div>
          <button onClick={() => setCurrent((i) => i + 1)}>increase</button>
          <Pagination
            simple
            current={current}
            total={25}
            onChange={setCurrent}
          />
        </div>
      );
    };

    const { container } = render(<Demo />);
    const input = container.querySelector('.rc-pagination-simple input');
    const button = container.querySelector('button');

    expect(input).toHaveProperty('value', '1');
    fireEvent.click(button);
    expect(input).toHaveProperty('value', '2');
  });

  // 修复 4.0.0 重构导致的问题: https://github.com/ant-design/ant-design/issues/46671
  describe('props: showQuickJumper', () => {
    const Demo: typeof Pagination = (props) => (
      <Pagination
        simple
        defaultCurrent={1}
        total={50}
        showSizeChanger
        {...props}
      />
    );

    it('should render normally quick-jumper', () => {
      const { container } = render(<Demo showQuickJumper />);

      const quickJumper = container.querySelector(
        '.rc-pagination-options-quick-jumper',
      );
      expect(quickJumper).toBeTruthy();
      expect(quickJumper).toMatchSnapshot();
    });

    it('should render normally quick-jumper with goButton', () => {
      const { container } = render(
        <Demo showQuickJumper={{ goButton: true }} />,
      );

      const quickJumper = container.querySelector(
        '.rc-pagination-options-quick-jumper',
      );
      expect(quickJumper).toBeTruthy();
      expect(quickJumper).toMatchSnapshot();
    });

    // custom goButton
    it('should render normally quick-jumper with custom goButton', () => {
      const { container } = render(
        <Demo
          showQuickJumper={{ goButton: <button className="foo">go</button> }}
        />,
      );

      const quickJumper = container.querySelector(
        '.rc-pagination-options-quick-jumper',
      );
      expect(quickJumper.querySelector('.foo')).toBeTruthy();
      expect(quickJumper).toMatchSnapshot();
    });
  });

  it('should support simple is readOnly value', () => {
    const { container } = render(<Pagination simple={{ readOnly: true }} />);
    expect(container).toMatchSnapshot();
  });
});
