import {KeyCode} from 'rc-util'
import expect from 'expect.js'
import Pagination from '../'

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'


const Simulate = TestUtils.Simulate

function noop() {}

describe('Pagination', function() {
  let pagination = null
  let container = document.createElement('div');
  document.body.appendChild(container)

  beforeEach(function(done) {
    ReactDOM.render(<Pagination onChange={noop} total={25}></Pagination>, container, function() {
      pagination = this
      done()
    })
  })

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(container)
  })

  it('default current page is 1', function() {
    let current = pagination.state.current
    expect(current).to.be(1)
  })

  it('prev-button should be disabled', function() {
    let prevButton = TestUtils.findRenderedDOMComponentWithClass(
      pagination,
      'rc-pagination-prev'
    )
    expect(TestUtils.isDOMComponent(prevButton)).to.be(true)
    expect(prevButton.className).to.contain('rc-pagination-disabled')
  })

  it('should hightlight current page and not highlight other page', shouldHightlightRight)

  it('should calc page right', function() {
    let pagers = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'li')
    let knownPageCount = 3
    let buttonLength = 2
    expect(pagers.length).to.be(knownPageCount + buttonLength)
  })

  it('next button should not be disabled', function() {
    let nextButton = TestUtils.findRenderedDOMComponentWithClass(
      pagination,
      'rc-pagination-next'
    )

    expect(TestUtils.isDOMComponent(nextButton)).to.be(true)
    expect(nextButton.className).to.not.contain('rc-pagination-disabled')
  })

  it('should response mouse click right', function(done) {
    let pagers = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'rc-pagination-item')
    expect(pagers.length).to.be(3)
    let page2 = pagers[1]
    expect(TestUtils.isDOMComponent(page2)).to.be(true)
    expect(page2.className).to.contain('rc-pagination-item-2')

    Simulate.click(page2)
    setTimeout(function() {
      expect(pagination.state.curent).to.be(2)
      shouldHightlightRight()
      done()
    }, 10)
  })

  it('should response next page', function(done) {
    let nextButton = TestUtils.findRenderedDOMComponentWithClass(
      pagination,
      'rc-pagination-next'
    )
    expect(TestUtils.isDOMComponent(nextButton)).to.be(true)
    Simulate.click(nextButton)
    setTimeout(function() {
      expect(pagination.state.current).to.be(2)
      done()
    }, 10)
  })

  function shouldHightlightRight() {
    let pagers = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'li')
    let current = pagination.state.current
    pagers.forEach(function(pager, index) {
      // page starts from 1
      if (index === current) {
        expect(pager.className).to.contain('rc-pagination-item-active')
      } else {
        expect(pager.className).to.not.contain('rc-pagination-item-active')
      }
    })
  }
})
