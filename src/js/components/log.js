const React = require('react');

function log(props) {
  let logs = props.logs.map((log, i) => <code key={i}>{log}</code>);
  return <div className="log">{logs}</div>;
}

module.exports = log;
