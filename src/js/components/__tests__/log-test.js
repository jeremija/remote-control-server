jest.dontMock('../log.js');

const React = require('react');
const ReactDom = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const Log = require('../log.js');

describe('log', () => {
  it('should render log entries', () => {
    let logs = ['a', 'b'];
    let c = TestUtils.renderIntoDocument(<div><Log logs={logs} /></div>);
    let node = ReactDom.findDOMNode(c);

    let codes = node.querySelectorAll('code');

    expect(codes.length).toBe(2);
    expect(codes[0].textContent).toBe('a');
    expect(codes[1].textContent).toBe('b');
  });
});
