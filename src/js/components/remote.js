const React = require('react');

const Mousepad = require('./mousepad.js');
const Input = require('./input.js');

function remote() {
  return (<div className="remote">
    <Mousepad throttle="10" />
    <Input />
  </div>);
}

module.exports = remote;
