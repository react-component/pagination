import React from 'react';
import type { RenderResult } from '@testing-library/react';
import { fireEvent, render } from '@testing-library/react';
import Pagination from '../src';

describe('itemRender', () => {
  let wrapper: RenderResult;
  const currentPage = 12;
  const itemRender = (current: number) => <a href={`#${current}`}>{current}</a>;
  const $$ = (selector: string) => wrapper.container.querySelector(selector);
  const renderFallbackPagination = (onChange = jest.fn()) =>
    render(
      <Pagination
        total={1000}
        defaultCurrent={12}
        onChange={onChange}
        itemRender={(_, __, originalElement) => originalElement}
      />,
    );

  beforeEach(() => {
    wrapper = render(
      <Pagination total={1000} current={currentPage} itemRender={itemRender} />,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should support custom itemRender', () => {
    const prev = $$('.rc-pagination-prev');
    const next = $$('.rc-pagination-next');
    const jumpPrev = $$('.rc-pagination-jump-prev');
    const jumpNext = $$('.rc-pagination-jump-next');
    const active = $$('.rc-pagination-item-active');

    expect(prev.innerHTML).toBe(
      `<a href="#${currentPage - 1}">${currentPage - 1}</a>`,
    );
    expect(next.innerHTML).toBe(
      `<a href="#${currentPage + 1}">${currentPage + 1}</a>`,
    );
    expect(jumpPrev.innerHTML).toBe(
      `<a href="#${currentPage - 5}">${currentPage - 5}</a>`,
    );
    expect(jumpNext.innerHTML).toBe(
      `<a href="#${currentPage + 5}">${currentPage + 5}</a>`,
    );
    expect(active.innerHTML).toBe(
      `<a href="#${currentPage}">${currentPage}</a>`,
    );
  });

  it('should support empty custom itemRender', () => {
    const pageEmptyWrapper = render(
      <Pagination
        total={1000}
        current={currentPage}
        itemRender={(_, type, originalElement) => {
          if (type === 'page') {
            return null;
          }
          return originalElement;
        }}
      />,
    );
    expect(
      pageEmptyWrapper.container.querySelectorAll('.rc-pagination-item'),
    ).toHaveLength(0);

    const turnPageWrapper = render(
      <Pagination
        total={1000}
        current={currentPage}
        itemRender={(_, type, originalElement) => {
          if (type === 'prev' || type === 'next') {
            return null;
          }
          return originalElement;
        }}
      />,
    );
    expect(
      turnPageWrapper.container.querySelectorAll('.rc-pagination-prev'),
    ).toHaveLength(0);
    expect(
      turnPageWrapper.container.querySelectorAll('.rc-pagination-next'),
    ).toHaveLength(0);

    const jumpPageWrapper = render(
      <Pagination
        total={1000}
        current={currentPage}
        itemRender={(page, type, originalElement) => {
          if (type === 'jump-prev' || type === 'jump-next') {
            return null;
          }
          return originalElement;
        }}
      />,
    );
    expect(
      jumpPageWrapper.container.querySelectorAll('.rc-pagination-jump-prev'),
    ).toHaveLength(0);
    expect(
      jumpPageWrapper.container.querySelectorAll('.rc-pagination-jump-next'),
    ).toHaveLength(0);
  });

  it('should support pass disabled to prev and next buttons', () => {
    const { container } = render(
      <Pagination total={1000} current={1} itemRender={itemRender} />,
    );
    const prev = container.querySelector('.rc-pagination-prev');
    const next = container.querySelector('.rc-pagination-next');
    expect(prev.innerHTML).toBe('<a href="#0" disabled="">0</a>');
    expect(next.innerHTML).toBe('<a href="#2">2</a>');
  });

  it('should keep wrapper interaction for custom itemRender fallback', () => {
    const onChange = jest.fn();
    const { container } = renderFallbackPagination(onChange);

    const pageButton = container.querySelector('.rc-pagination-item-13');
    const jumpNextButton = container.querySelector('.rc-pagination-jump-next');

    expect(pageButton).not.toHaveAttribute('role');
    expect(jumpNextButton).not.toHaveAttribute('role');

    fireEvent.click(pageButton);
    fireEvent.keyDown(jumpNextButton, {
      key: 'Spacebar',
      keyCode: 32,
      which: 32,
    });

    expect(onChange).toHaveBeenLastCalledWith(18, 10);
  });

  it('should support keyboard interaction for custom page item wrapper', () => {
    const onChange = jest.fn();
    const { container } = renderFallbackPagination(onChange);
    const pageButton = container.querySelector('.rc-pagination-item-13');

    fireEvent.keyDown(pageButton, {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });

    expect(onChange).toHaveBeenLastCalledWith(13, 10);
  });

  it.each([
    [
      'prev',
      '.rc-pagination-prev',
      { key: 'Enter', keyCode: 13, which: 13 },
      11,
    ],
    [
      'next',
      '.rc-pagination-next',
      { key: 'Enter', keyCode: 13, which: 13 },
      13,
    ],
    [
      'jump-prev',
      '.rc-pagination-jump-prev',
      { key: ' ', keyCode: 32, which: 32 },
      7,
    ],
  ])(
    'should support keyboard interaction for custom %s wrapper',
    (_, selector, eventInit, expectedPage) => {
      const onChange = jest.fn();
      const { container } = renderFallbackPagination(onChange);
      const wrapperButton = container.querySelector(selector);

      fireEvent.keyDown(wrapperButton, eventInit);

      expect(onChange).toHaveBeenLastCalledWith(expectedPage, 10);
    },
  );
});
