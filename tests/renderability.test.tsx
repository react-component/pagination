import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Pagination from '../src';

describe('ReactNode renderability', () => {
  it('keeps zero page content clickable', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Pagination
        total={30}
        onChange={onChange}
        itemRender={(_, type, node) => (type === 'page' ? 0 : node)}
      />,
    );
    const page = container.querySelector('.rc-pagination-item-2');
    expect(page.textContent).toBe('0');
    fireEvent.click(page);
    expect(onChange).toHaveBeenCalledWith(2, 10);
  });

  it.each([false, true])(
    'keeps a zero go button interactive in simple=%s',
    (simple) => {
      const onChange = jest.fn();
      const { container } = render(
        <Pagination
          simple={simple}
          total={100}
          onChange={onChange}
          showQuickJumper={{ goButton: 0 }}
        />,
      );
      const input = container.querySelector('input');
      fireEvent.change(input, { target: { value: '3' } });
      const button = Array.from(container.querySelectorAll('span')).find(
        (node) => node.textContent === '0' && node.childElementCount === 0,
      );
      expect(button).toBeTruthy();
      if (!simple) {
        fireEvent.blur(input);
        expect(onChange).not.toHaveBeenCalled();
      }
      fireEvent.click(button);
      expect(onChange).toHaveBeenCalledWith(3, 10);
    },
  );
});
