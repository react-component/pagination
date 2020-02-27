import React from 'react';
import { mount } from 'enzyme';
import Pagination from '../src';
import TwoPagination from './two-pagination';

describe('Two Pagination', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<TwoPagination />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should has initial pageSize 20', () => {
    const p1 = wrapper.find(Pagination).at(0);
    const p2 = wrapper.find(Pagination).at(1);
    expect(p1.state().pageSize).toBe(20);
    expect(p2.state().pageSize).toBe(20);
  });

  it('should sync pageSize via state', () => {
    const p1 = wrapper.find(Pagination).at(0);
    const p2 = wrapper.find(Pagination).at(1);
    wrapper.find('.hook').simulate('click');
    expect(p1.state().pageSize).toBe(50);
    expect(p2.state().pageSize).toBe(50);
  });
});
