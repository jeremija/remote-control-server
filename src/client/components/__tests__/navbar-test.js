jest.dontMock('../navbar.js');
jest.dontMock('../../store/navStore.js');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const Navbar = require('../navbar.js');
const navStore = require('../../store/navStore.js');
const navDispatcher = require('../../dispatcher/navDispatcher.js');

describe('navbar', () => {

  let items = navStore.getItems();

  let node;
  beforeEach(() => {
    let component = TestUtils.renderIntoDocument(<div><Navbar /></div>);
    node = ReactDOM.findDOMNode(component).querySelector('ul.navbar');
  });

  it('should render list items', () => {
    expect(node).toBe.ok;

    let list = node.querySelectorAll('li');
    expect(list.length).toBeGreaterThan(0);
    expect(list.length).toBe(items.length);
  });

  it('should dispatch "nav" action on click', () => {
    TestUtils.Simulate.click(node.querySelectorAll('li')[0]);

    expect(navDispatcher.dispatch.mock.calls.length).toBe(1);
    expect(navDispatcher.dispatch.mock.calls[0][0]).toEqual({
      type: 'nav',
      value: items[0].value
    });
  });

});
