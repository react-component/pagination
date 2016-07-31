/* eslint func-names: 0, no-console: 0 */
import expect from 'expect.js';
import Pagination from '../';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

const Simulate = TestUtils.Simulate;

describe('Uncontrolled Pagination', function() {
  let pagination = null;
  const container = document.createElement('div');
  document.body.appendChild(container);

  let current = 1;
  function onChange(page) {
    current = page;
  }

  function shouldHighlightRight() {
    const pagers = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'li');
    const current2 = pagination.state.current;
    pagers.forEach(function(pager, index) {
      // page starts from 1
      if (index === current2) {
        expect(pager.className).to.contain('rc-pagination-item-active');
      } else {
        expect(pager.className).to.not.contain('rc-pagination-item-active');
      }
    });
  }

  beforeEach(function(done) {
    ReactDOM.render(<Pagination onChange={onChange} defaultCurrent={1} total={25} />, container, function() {
      pagination = this;
      done();
    });
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(container);
  });

  it('default current page is 1', function() {
    const current2 = pagination.state.current;
    expect(current2).to.be(1);
  });

  it('prev-button should be disabled', function() {
    const prevButton = TestUtils.findRenderedDOMComponentWithClass(
      pagination,
      'rc-pagination-prev'
    );
    expect(TestUtils.isDOMComponent(prevButton)).to.be(true);
    expect(prevButton.className).to.contain('rc-pagination-disabled');
  });

  it('should hightlight current page and not highlight other page', shouldHighlightRight);

  it('should calc page right', function() {
    const pagers = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'li');
    const knownPageCount = 3;
    const buttonLength = 2;
    expect(pagers.length).to.be(knownPageCount + buttonLength);
  });

  it('next button should not be disabled', function() {
    const nextButton = TestUtils.findRenderedDOMComponentWithClass(
      pagination,
      'rc-pagination-next'
    );

    expect(TestUtils.isDOMComponent(nextButton)).to.be(true);
    expect(nextButton.className).to.not.contain('rc-pagination-disabled');
  });

  it('should response mouse click right', function(done) {
    const pagers = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'rc-pagination-item');
    expect(pagers.length).to.be(3);
    const page2 = pagers[1];
    expect(TestUtils.isDOMComponent(page2)).to.be(true);
    expect(page2.className).to.contain('rc-pagination-item-2');

    Simulate.click(page2);
    setTimeout(function() {
      expect(pagination.state.current).to.be(2);
      expect(current).to.be(2);
      shouldHighlightRight();
      done();
    }, 10);
  });

  it('should response next page', function(done) {
    const nextButton = TestUtils.findRenderedDOMComponentWithClass(
      pagination,
      'rc-pagination-next'
    );
    expect(TestUtils.isDOMComponent(nextButton)).to.be(true);
    Simulate.click(nextButton);
    setTimeout(function() {
      expect(pagination.state.current).to.be(2);
      expect(current).to.be(2);
      done();
    }, 10);
  });
});

describe('Controlled Pagination', function() {
  let pagination = null;
  const container = document.createElement('div');
  document.body.appendChild(container);

  let current = 2;
  function onChange(page) {
    current = page;
  }

  beforeEach(function(done) {
    ReactDOM.render(<Pagination current={current} onChange={onChange} total={25} />, container, function() {
      pagination = this;
      done();
    });
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(container);
  });

  it('current should equal defaultCurrent', function() {
    expect(pagination.state.current).to.be(2);
  });

  it('should not response mouse click', function(done) {
    const nextButton = TestUtils.findRenderedDOMComponentWithClass(
      pagination,
      'rc-pagination-next'
    );
    expect(TestUtils.isDOMComponent(nextButton)).to.be(true);
    Simulate.click(nextButton);
    setTimeout(function() {
      expect(pagination.state.current).to.be(2);
      expect(current).to.be(3);
      done();
    }, 10);
  });
});

describe('Controlled Pagination', function() {
  const TwoPagination = require('./helper/two-pagination');

  let entry = null;
  const container = document.createElement('div');
  document.body.appendChild(container);

  beforeEach(function(done) {
    ReactDOM.render(<TwoPagination />, container, function() {
      entry = this;
      done();
    });
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(container);
  });

  it('should has initial pageSize 20', function() {
    const p1 = TestUtils.scryRenderedComponentsWithType(entry, Pagination)[0];
    const p2 = TestUtils.scryRenderedComponentsWithType(entry, Pagination)[1];
    expect(p1.state.pageSize).to.be(20);
    expect(p2.state.pageSize).to.be(20);
  });
  it('should sync pageSize via state', function(done) {
    const p1 = TestUtils.scryRenderedComponentsWithType(entry, Pagination)[0];
    const p2 = TestUtils.scryRenderedComponentsWithType(entry, Pagination)[1];
    const hook = TestUtils.scryRenderedDOMComponentsWithClass(entry, 'hook')[0];
    Simulate.click(hook);
    setTimeout(function() {
      expect(p1.state.pageSize).to.be(50);
      expect(p2.state.pageSize).to.be(50);
      done();
    }, 50);
  });
});
