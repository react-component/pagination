import { mount } from 'enzyme';
import React from 'react';
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
    // expect(p1.state().pageSize).toBe(20); // Class component
    expect(p1.props().pageSize).toBe(20); // Function component
    // expect(p2.state().pageSize).toBe(20); // Class component
    expect(p2.props().pageSize).toBe(20); // Function component
  });

  it('should sync pageSize via state', () => {
    const p1 = wrapper.find(Pagination).at(0);
    const p2 = wrapper.find(Pagination).at(1);
    wrapper.find('.hook').simulate('click');
    // wrapper.update();
    const newP1 = wrapper.find(Pagination).at(0);
    const newP2 = wrapper.find(Pagination).at(1);
    // expect(p1.state().pageSize).toBe(50); // Class component
    expect(newP1.props().pageSize).toBe(50); // Function component
    // expect(p2.state().pageSize).toBe(50); // Class component
    expect(newP2.props().pageSize).toBe(50); // Function component
  });
});
