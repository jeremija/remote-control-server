jest.dontMock('../app.js');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

function mock(reactElement) {
  // jest fails if subcomponents are stateless for some reason so we need to
  // define render function
  return function() {
    return { render: () => reactElement };
  };
}

require('../mousepad.js').mockImplementation(
  mock(<div className="mousepad" />));
require('../input.js').mockImplementation(mock(<div className="input" />));
require('../navbar.js').mockImplementation(mock(<div className="navbar" />));
require('../log.js').mockImplementation(mock(<div className="log" />));
require('../arrows.js').mockImplementation(mock(<div className="arrows" />));
require('../buttonToggles.js').mockImplementation(
  mock(<div className="button-toggles" />));

const App = require('../app.js');
const navStore = require('../../store/navStore.js');

describe('app', () => {

  function render(active) {
    navStore.getActive.mockReturnValue(active);
    let component = TestUtils.renderIntoDocument(<div><App /></div>);
    return ReactDOM.findDOMNode(component).children[0];
  }

  it('should render div.app', () => {
    let node = render();
    expect(node.tagName).toBe('DIV');
    expect(node.className).toBe('app');
  });

  it('should have three children', () => {
    let node = render();
    expect(node.children.length).toBe(4);
  });

  it('should have header and footer', () => {
    let node = render();
    expect(node.children[0].className).toBe('navbar');
    expect(node.children[2].className).toBe('button-toggles');
    expect(node.children[3].className).toBe('input');
  });

  it('should render blank panel by default', () => {
    let node = render();
    expect(node.children[1].className).toBe('blank');
  });

  it('should render mousepad panel when navStore.active == "mousepad"', () => {
    let node = render('mousepad');
    expect(node.children[1].className).toBe('mousepad');
  });

  it('should render mousepad panel when navStore.active == "arrows"', () => {
    let node = render('arrows');
    expect(node.children[1].className).toBe('arrows');
  });

  it('should render log panel when navStore.active == "log"', () => {
    let node = render('log');
    expect(node.children[1].className).toBe('log');
  });

});
