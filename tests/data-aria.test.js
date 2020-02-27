import React from 'react';
import { mount } from 'enzyme';
import Pagination from '../src';

describe('data and aria props', () => {
  let wrapper;

  describe('with simple prop', () => {
    beforeEach(() => {
      wrapper = mount(
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
      expect(wrapper.getDOMNode().getAttribute('data-test')).toBe('test-id');
      expect(wrapper.getDOMNode().getAttribute('data-id')).toBe('12345');
    });

    it('renders aria attributes', () => {
      expect(wrapper.getDOMNode().getAttribute('aria-labelledby')).toBe(
        'labelledby-id',
      );
      expect(wrapper.getDOMNode().getAttribute('aria-label')).toBe('label-id');
    });

    it('renders role attribute', () => {
      expect(wrapper.getDOMNode().getAttribute('role')).toBe('navigation');
    });
  });

  describe('without simple prop', () => {
    beforeEach(() => {
      wrapper = mount(
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
      expect(wrapper.getDOMNode().getAttribute('data-test')).toBe('test-id');
      expect(wrapper.getDOMNode().getAttribute('data-id')).toBe('12345');
    });

    it('renders aria attributes', () => {
      expect(wrapper.getDOMNode().getAttribute('aria-labelledby')).toBe(
        'labelledby-id',
      );
      expect(wrapper.getDOMNode().getAttribute('aria-label')).toBe('label-id');
    });

    it('renders role attribute', () => {
      expect(wrapper.getDOMNode().getAttribute('role')).toBe('navigation');
    });
  });
});
