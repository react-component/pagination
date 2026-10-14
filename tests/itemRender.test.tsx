import React from 'react';
import type { RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import Pagination from '../src';

describe('itemRender', () => {
  let wrapper: RenderResult;
  const currentPage = 12;
  const itemRender = (current: number) => <a href={`#${current}`}>{current}</a>;
  const $$ = (selector: string) => wrapper.container.querySelector(selector);

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

    [prev, next, jumpPrev, jumpNext, active].forEach((item) => {
      const link = item.querySelector('a');
      expect(link).toHaveAttribute('href');
      expect(link).toHaveAttribute('aria-label');
      expect(link).toHaveAttribute('tabindex', '0');
      expect(item).not.toHaveAttribute('tabindex');
      expect(item).not.toHaveAttribute('role');
    });
    expect(prev.querySelector('a')).toHaveAttribute(
      'href',
      `#${currentPage - 1}`,
    );
    expect(next.querySelector('a')).toHaveAttribute(
      'href',
      `#${currentPage + 1}`,
    );
    expect(jumpPrev.querySelector('a')).toHaveAttribute(
      'href',
      `#${currentPage - 5}`,
    );
    expect(jumpNext.querySelector('a')).toHaveAttribute(
      'href',
      `#${currentPage + 5}`,
    );
    expect(active.querySelector('a')).toHaveAttribute('aria-current', 'page');
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
    expect(prev.querySelector('a')).toHaveAttribute('aria-disabled', 'true');
    expect(prev.querySelector('a')).toHaveAttribute('tabindex', '-1');
    expect(prev.querySelector('a')).not.toHaveAttribute('disabled');
    expect(next.querySelector('a')).toHaveAttribute('aria-disabled', 'false');
  });
});
