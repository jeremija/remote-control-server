const React = require('react');
const dispatcher = require('../dispatcher/navDispatcher.js');
const navStore = require('../store/navStore.js');

function navbar() {
  let active = navStore.getActive();
  let items = navStore.getItems();
  let list = items.map((item, i) => {
    let cssClass = item.value === active ? 'active' : '';

    function handleClick() {
      dispatcher.dispatch({ type: 'nav', value: item.value });
    }

    return (<li className={cssClass} key={i} onClick={handleClick}>
      <span className={'icon ' + item.icon} />
    </li>);
  });

  return <ul className="navbar">{list}</ul>;
}

module.exports = navbar;
