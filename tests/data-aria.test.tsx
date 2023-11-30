import React from 'react';
import type { RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import Pagination from '../src';

describe('data and aria props', () => {
  let wrapper: RenderResult;

  describe('with simple prop', () => {
    beforeEach(() => {
      wrapper = render(
        <Pagination
          simple
          data-test="test-id"
          data-id="12345"
          aria-labelledby="labelledby-id"
          aria-label="label-id"
          role="navigation"
        />,
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('renders data attributes', () => {
      expect(wrapper.container.firstChild).toHaveAttribute(
        'data-test',
        'test-id',
      );
      expect(wrapper.container.firstChild).toHaveAttribute('data-id', '12345');
    });

    it('renders aria attributes', () => {
      expect(wrapper.container.firstChild).toHaveAttribute(
        'aria-labelledby',
        'labelledby-id',
      );
      expect(wrapper.container.firstChild).toHaveAttribute(
        'aria-label',
        'label-id',
      );
    });

    it('renders role attribute', () => {
      expect(wrapper.container.firstChild).toHaveAttribute(
        'role',
        'navigation',
      );
    });
  });

  describe('without simple prop', () => {
    beforeEach(() => {
      wrapper = render(
        <Pagination
          data-test="test-id"
          data-id="12345"
          aria-labelledby="labelledby-id"
          aria-label="label-id"
          role="navigation"
        />,
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('renders data attributes', () => {
      expect(wrapper.container.firstChild).toHaveAttribute(
        'data-test',
        'test-id',
      );
      expect(wrapper.container.firstChild).toHaveAttribute('data-id', '12345');
    });

    it('renders aria attributes', () => {
      expect(wrapper.container.firstChild).toHaveAttribute(
        'aria-labelledby',
        'labelledby-id',
      );
      expect(wrapper.container.firstChild).toHaveAttribute(
        'aria-label',
        'label-id',
      );
    });

    it('renders role attribute', () => {
      expect(wrapper.container.firstChild).toHaveAttribute(
        'role',
        'navigation',
      );
    });
  });
});
