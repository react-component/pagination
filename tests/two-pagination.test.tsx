import type { RenderResult } from '@testing-library/react';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import TwoPagination from './two-pagination';

describe('Two Pagination', () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    jest.mock('../src', () => {});
    wrapper = render(<TwoPagination />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should has initial pageSize 20', () => {
    const findPagination = wrapper.container.querySelectorAll('.rc-pagination');
    expect(findPagination).toHaveLength(2);
    const [p1, p2] = findPagination;

    const p1Items = p1.querySelectorAll('.rc-pagination-item');
    expect(p1Items).toHaveLength(6);
    expect(p1Items[p1Items.length - 1].textContent).toBe('25');

    const p2Items = p2.querySelectorAll('.rc-pagination-item');
    expect(p2Items).toHaveLength(6);
    expect(p2Items[p2Items.length - 1].textContent).toBe('25');
  });

  it('should sync pageSize via state', () => {
    const findPagination = wrapper.container.querySelectorAll('.rc-pagination');
    const [p1, p2] = findPagination;

    const button = wrapper.container.querySelector('.hook');
    expect(button).toBeTruthy();
    fireEvent.click(button);

    const p1Items = p1.querySelectorAll('.rc-pagination-item');
    expect(p1Items).toHaveLength(6);
    expect(p1Items[p1Items.length - 1].textContent).toBe('10');

    const p2Items = p2.querySelectorAll('.rc-pagination-item');
    expect(p2Items).toHaveLength(6);
    expect(p2Items[p2Items.length - 1].textContent).toBe('10');
  });
});
