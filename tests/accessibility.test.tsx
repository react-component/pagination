import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import Pagination from '../src';
import type { PaginationProps } from '../src/interface';

async function checkAccessibility(container: HTMLElement) {
  const result = await axe.run(container, {
    // jsdom has no layout; isolated components are not document landmarks.
    rules: {
      'color-contrast': { enabled: false },
      region: { enabled: false },
    },
  });
  expect(result.violations).toEqual([]);
}

const antdIcons = {
  prevIcon: (
    <button type="button" tabIndex={-1}>
      Previous icon
    </button>
  ),
  nextIcon: (
    <button type="button" tabIndex={-1}>
      Next icon
    </button>
  ),
  jumpPrevIcon: (
    <a className="rc-pagination-item-link">
      <span>Previous jump icon</span>
    </a>
  ),
  jumpNextIcon: (
    <a className="rc-pagination-item-link">
      <span>Next jump icon</span>
    </a>
  ),
};

describe('accessible pagination controls', () => {
  it.each<PaginationProps>([
    { total: 1000, defaultCurrent: 50 },
    { total: 1000, defaultCurrent: 50, ...antdIcons },
    { total: 1000, defaultCurrent: 1 },
    { total: 1000, defaultCurrent: 100 },
    { total: 1000, defaultCurrent: 50, disabled: true, ...antdIcons },
    { total: 1000, defaultCurrent: 1, simple: true },
    { total: 1000, defaultCurrent: 100, simple: { readOnly: true } },
    { total: 0 },
    {
      total: 1000,
      defaultCurrent: 50,
      itemRender: (_, __, element) => element,
    },
    {
      total: 1000,
      defaultCurrent: 50,
      itemRender: (page) => <button>{page}</button>,
    },
    {
      total: 1000,
      defaultCurrent: 50,
      itemRender: (page) => <a href={`#${page}`}>{page}</a>,
    },
  ])('passes axe for %j', async (props) => {
    const { container } = render(<Pagination {...props} onChange={() => {}} />);
    await checkAccessibility(container);
    container.querySelectorAll('li').forEach((item) => {
      expect(item).not.toHaveAttribute('role', 'button');
      expect(item).not.toHaveAttribute('tabindex');
    });
    expect(container.querySelector('button button')).toBeNull();
  });

  it.each(['prev', 'next', 'jump-prev', 'jump-next', 'item-51'])(
    'activates %s exactly once for each mouse/Enter/Space action',
    async (type) => {
      const onChange = jest.fn();
      const { container } = render(
        <Pagination
          total={1000}
          defaultCurrent={50}
          onChange={onChange}
          {...antdIcons}
        />,
      );
      const control = container.querySelector<HTMLElement>(
        `.rc-pagination-${type} > :is(button, a)`,
      );
      control.focus();
      await userEvent.keyboard('{Enter}');
      expect(onChange).toHaveBeenCalledTimes(1);
      await userEvent.keyboard(' ');
      expect(onChange).toHaveBeenCalledTimes(type === 'item-51' ? 1 : 2);
      // Selecting the current page is intentionally a no-op.
      if (type !== 'item-51') {
        await userEvent.click(control);
        expect(onChange).toHaveBeenCalledTimes(3);
      }
    },
  );

  it('has one focus target per item and exposes its current/disabled state', async () => {
    const { container } = render(<Pagination total={30} onChange={() => {}} />);
    await userEvent.tab();
    expect(container.querySelector('.rc-pagination-item-1 a')).toHaveFocus();
    await userEvent.tab();
    expect(container.querySelector('.rc-pagination-item-2 a')).toHaveFocus();
    expect(container.querySelector('.rc-pagination-item-1 a')).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(
      container.querySelector('.rc-pagination-prev button'),
    ).toBeDisabled();
  });

  it('prevents navigation from a disabled custom link', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <Pagination
        total={100}
        disabled
        onChange={onChange}
        itemRender={(page) => <a href={`#${page}`}>{page}</a>}
      />,
    );
    expect(fireEvent.click(getByRole('link', { name: '页 2' }))).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('preserves delegated keyboard behavior for opaque custom content', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Pagination
        total={100}
        onChange={onChange}
        itemRender={(page) => <span>{page}</span>}
      />,
    );
    const item = container.querySelector('.rc-pagination-item-2');
    expect(item).toHaveAttribute('tabindex', '0');
    fireEvent.keyDown(item, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
  it('composes custom click handlers without duplicate activation', async () => {
    const onClick = jest.fn();
    const onChange = jest.fn();
    const { container } = render(
      <Pagination
        total={100}
        onChange={onChange}
        itemRender={(page) => <button onClick={onClick}>{page}</button>}
      />,
    );
    const control = container.querySelector<HTMLElement>(
      '.rc-pagination-item-2 button',
    );
    control.focus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('respects custom controls that stop propagation or are disabled', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Pagination
        total={100}
        onChange={onChange}
        itemRender={(page) => (
          <button
            disabled={page === 3}
            onClick={(event) => event.stopPropagation()}
          >
            {page}
          </button>
        )}
      />,
    );
    await userEvent.click(
      container.querySelector('.rc-pagination-item-2 button'),
    );
    expect(onChange).not.toHaveBeenCalled();
    expect(
      container.querySelector('.rc-pagination-item-3 button'),
    ).toBeDisabled();
  });
  it.each(['prev', 'next', 'jump-prev', 'jump-next'])(
    'retains Enter/Space handling for opaque %s content',
    (type) => {
      const onChange = jest.fn();
      const { container } = render(
        <Pagination
          total={1000}
          defaultCurrent={50}
          onChange={onChange}
          itemRender={(page) => <span>{page}</span>}
        />,
      );
      const item = container.querySelector(`.rc-pagination-${type}`);
      fireEvent.keyDown(item, { key: 'Enter' });
      expect(onChange).toHaveBeenCalledTimes(1);
      fireEvent.keyDown(item, { key: ' ' });
      expect(onChange).toHaveBeenCalledTimes(2);
    },
  );

  it('allows a custom anchor to cancel delegated keyboard activation', () => {
    const onChange = jest.fn();
    const onKeyDown = jest.fn((event: React.KeyboardEvent) =>
      event.preventDefault(),
    );
    const { container } = render(
      <Pagination
        total={100}
        onChange={onChange}
        itemRender={(page) => <a onKeyDown={onKeyDown}>{page}</a>}
      />,
    );
    fireEvent.keyDown(container.querySelector('.rc-pagination-item-2 a'), {
      key: 'Enter',
    });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onChange).not.toHaveBeenCalled();
  });
  it('does not submit the quick-jump input when focusing a page control', async () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <Pagination total={30} showQuickJumper onChange={onChange} />,
    );
    await userEvent.type(getByRole('textbox'), '3');
    await userEvent.click(getByRole('button', { name: '页 2' }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(2, 10);
  });
});
