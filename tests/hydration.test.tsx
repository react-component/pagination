import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import { hydrateRoot, type Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import Pagination from '../src';

describe('simple Pagination hydration', () => {
  it.each([
    0,
    true,
    <button key="custom" type="button">
      Go
    </button>,
  ])(
    'hydrates a go button without replacing server nodes: %s',
    async (goButton) => {
      const onChange = jest.fn();
      const onRecoverableError = jest.fn();
      const node = (
        <Pagination
          simple
          total={100}
          showQuickJumper={{ goButton }}
          onChange={onChange}
        />
      );
      const container = document.createElement('div');
      container.innerHTML = renderToString(node);
      document.body.appendChild(container);
      const serverRoot = container.firstElementChild;
      const serverInput = container.querySelector('input');
      let root: Root;

      try {
        await act(async () => {
          root = hydrateRoot(container, node, { onRecoverableError });
        });

        expect(onRecoverableError).not.toHaveBeenCalled();
        expect(container.firstElementChild).toBe(serverRoot);
        expect(container.querySelector('input')).toBe(serverInput);
        expect(container.querySelector('li li')).toBeNull();

        const button = container.querySelector(
          '.rc-pagination-options .rc-pagination-simple-pager',
        ).firstElementChild;
        fireEvent.change(serverInput, { target: { value: '3' } });
        fireEvent.click(button);
        expect(onChange).toHaveBeenLastCalledWith(3, 10);

        const quickInput = container.querySelector(
          '.rc-pagination-options-quick-jumper input',
        );
        fireEvent.change(quickInput, { target: { value: '4' } });
        fireEvent.keyUp(button, { key: 'Enter', keyCode: 13, which: 13 });
        expect(onChange).toHaveBeenLastCalledWith(4, 10);
      } finally {
        await act(async () => root?.unmount());
        container.remove();
      }
    },
  );
});
