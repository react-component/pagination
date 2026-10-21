import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '../src';
import type { PaginationProps } from '../src/interface';

const buttonItemRender: PaginationProps['itemRender'] = (page) => (
  <button>{page}</button>
);

describe('itemRender interaction compatibility', () => {
  it.each([
    [1, 'prev'],
    [5, 'next'],
  ] as const)('keeps native %s-page %s controls disabled', (current, type) => {
    const { container } = render(
      <Pagination
        total={50}
        current={current}
        onChange={() => {}}
        itemRender={buttonItemRender}
      />,
    );
    expect(
      container.querySelector(`.rc-pagination-${type} button`),
    ).toBeDisabled();
  });

  it('blocks custom keyboard callbacks before handling a disabled DOM control', () => {
    const onKeyDown = jest.fn();
    const onClick = jest.fn();
    const onChange = jest.fn();
    const { container } = render(
      <Pagination
        total={100}
        disabled
        onChange={onChange}
        itemRender={(page) => (
          <span onKeyDown={onKeyDown} onClick={onClick}>
            {page}
          </span>
        )}
      />,
    );
    const control = container.querySelector('.rc-pagination-item-2 span');
    fireEvent.keyDown(control, { key: 'Enter' });
    fireEvent.click(control);
    expect(onKeyDown).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it.each([
    ['default', false],
    ['default', true],
    ['opaque', false],
    ['opaque', true],
  ] as const)(
    'allows Tab navigation after disabling a focused %s item (shift=%s)',
    async (kind, shift) => {
      const Label = () => <span>page</span>;
      const onChange = jest.fn();
      const renderPagination = (disabled: boolean) => (
        <div>
          <button data-testid="before">Before pagination</button>
          <Pagination
            total={100}
            disabled={disabled}
            onChange={onChange}
            itemRender={kind === 'opaque' ? () => <Label /> : undefined}
          />
          <button data-testid="after">After pagination</button>
        </div>
      );
      const { container, rerender, getByTestId } = render(
        renderPagination(false),
      );
      const item = container.querySelector<HTMLElement>(
        '.rc-pagination-item-2',
      );
      const control = kind === 'opaque' ? item : item.querySelector('a');
      control.focus();
      expect(control).toHaveFocus();

      rerender(renderPagination(true));
      expect(control).toHaveFocus();
      expect(control).toHaveAttribute('tabindex', '-1');
      // Disabling activation must still allow the focused item to be left.
      expect(fireEvent.keyDown(control, { key: 'Enter' })).toBe(false);
      expect(fireEvent.keyDown(control, { key: ' ' })).toBe(false);
      expect(onChange).not.toHaveBeenCalled();

      await userEvent.tab({ shift });
      expect(getByTestId(shift ? 'before' : 'after')).toHaveFocus();
      expect(onChange).not.toHaveBeenCalled();
    },
  );

  it.each([
    ['prev', 49],
    ['next', 51],
    ['jump-prev', 45],
    ['jump-next', 55],
    ['item-51', 51],
  ] as const)(
    'keeps mouse and keyboard activation for an opaque %s component',
    async (type, page) => {
      const Label = ({ value }: { value: number }) => <span>{value}</span>;
      const onChange = jest.fn();
      const { container } = render(
        <Pagination
          total={1000}
          current={50}
          onChange={onChange}
          itemRender={(value) => <Label value={value} />}
        />,
      );
      const item = container.querySelector<HTMLElement>(
        `.rc-pagination-${type}`,
      );
      await userEvent.click(item.querySelector('span'));
      expect(onChange).toHaveBeenCalledTimes(1);
      item.focus();
      await userEvent.keyboard('{Enter}');
      expect(onChange).toHaveBeenCalledTimes(2);
      await userEvent.keyboard(' ');
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenLastCalledWith(page, 10);
    },
  );

  it.each([
    [1, 'prev', 'next'],
    [5, 'next', 'prev'],
  ] as const)(
    'passes disabled to custom arrows at page %s',
    async (current, unavailable, available) => {
      const onClick = jest.fn();
      const onChange = jest.fn();
      const Arrow = ({
        disabled,
        label,
      }: {
        disabled?: boolean;
        label: string;
      }) => (
        <button type="button" disabled={disabled} onClick={onClick}>
          {label}
        </button>
      );
      const { container } = render(
        <Pagination
          total={50}
          current={current}
          onChange={onChange}
          itemRender={(_, type, element) =>
            type === 'prev' || type === 'next' ? (
              <Arrow label={type} />
            ) : (
              element
            )
          }
        />,
      );
      const disabledButton = container.querySelector<HTMLButtonElement>(
        `.rc-pagination-${unavailable} button`,
      );
      expect(disabledButton).toBeDisabled();
      await userEvent.click(disabledButton);
      disabledButton.focus();
      await userEvent.keyboard('{Enter}');
      expect(onClick).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
      const availableButton = container.querySelector<HTMLButtonElement>(
        `.rc-pagination-${available} button`,
      );
      availableButton.focus();
      await userEvent.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledTimes(1);
    },
  );

  it('does not submit a form when an untyped custom button changes pages', async () => {
    const onSubmit = jest.fn((event: React.FormEvent) =>
      event.preventDefault(),
    );
    const onChange = jest.fn();
    const { container } = render(
      <form onSubmit={onSubmit}>
        <Pagination
          total={100}
          current={1}
          onChange={onChange}
          itemRender={buttonItemRender}
        />
      </form>,
    );
    const button = container.querySelector<HTMLButtonElement>(
      '.rc-pagination-item-2 button',
    );
    await userEvent.click(button);
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it.each(['submit', 'reset'] as const)(
    'preserves an explicitly requested button type=%s',
    (type) => {
      const { container } = render(
        <Pagination
          total={100}
          onChange={() => {}}
          itemRender={(page) => <button type={type}>{page}</button>}
        />,
      );
      expect(
        container.querySelector('.rc-pagination-item-2 button'),
      ).toHaveAttribute('type', type);
    },
  );

  it('cancels disabled links inside a fragment', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Pagination
        total={100}
        disabled
        onChange={onChange}
        itemRender={(page) => (
          <>
            <a href="#other">{page}</a>
          </>
        )}
      />,
    );
    expect(
      fireEvent.click(container.querySelector('.rc-pagination-item-2 a')),
    ).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('preserves native keyboard clicks inside a fragment without double activation', async () => {
    const onClick = jest.fn();
    const onChange = jest.fn();
    const { container } = render(
      <Pagination
        total={100}
        current={1}
        onChange={onChange}
        itemRender={(page) => (
          <>
            <button type="button" onClick={onClick}>
              {page}
            </button>
          </>
        )}
      />,
    );
    const button = container.querySelector<HTMLButtonElement>(
      '.rc-pagination-item-2 button',
    );
    button.focus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);
    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});
