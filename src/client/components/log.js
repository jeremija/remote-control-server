const React = require('react');

const logStore = require('../store/logStore.js');

function log() {
  let logs = logStore.getLogs().map((log, i) => <code key={i}>{log}</code>);
  return <div className="log">{logs}</div>;
}

module.exports = log;
