#!/usr/bin/env node
'use strict';
let express = require('express');
let app = express();
let browserify = require('browserify-middleware');
let less = require('less-middleware');
// let config = require('./config.js');
let http = require('http').Server(app);
let io = require('socket.io')(http);
let path = require('path');
let os = require('os');
let robot = require('robotjs');

let tempDir = path.join(os.tmpDir(), 'node-mpv-css-cache');
let lastTitle = '(no title)';

app.set('views', './src/views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('index', {
    url: req.query.url || '',
    title: lastTitle
  });
});

const keyMapping = {
  9: 'tab',
  13: 'enter',
  8: 'backspace'
};

app.use('/js', browserify('./src/js'));
app.use('/less', less('./src/less', { dest: tempDir}));
app.use('/less', express.static(tempDir));
app.use('/less/fonts', express.static('./src/less/fonts'));

io.on('connection', function(socket) {
  socket.on('mousemove', pos => {
    let mouse = robot.getMousePos();
    let x = mouse.x + pos.x;
    let y = mouse.y + pos.y;
    robot.moveMouse(x, y);
  });
  socket.on('click', params => {
    robot.mouseClick(params.button, params.double);
  });
  socket.on('keypress', action => {
    let alt = action.alt;
    let ctrl = action.ctrl;
    let shift = action.shift;
    let code = action.code;
    let string = action.string;

    if (alt) robot.keyToggle('alt', 'down');
    if (ctrl) robot.keyToggle('control', 'down');
    if (shift) robot.keyToggle('shift', 'down');

    let specialKey = keyMapping[code];
    if (string) {
      robot.typeString(string);
    }
    if (specialKey) {
      console.log('tapping', specialKey);
      robot.keyTap(specialKey);
    }

    if (alt) robot.keyToggle('alt', 'up');
    if (ctrl) robot.keyToggle('alt', 'up');
    if (shift) robot.keyToggle('shift', 'up');
    return false;
  });
  socket.on('type', action => robot.typeString(action.text));
});

let port = process.env.PORT || 3000;
let ifaces = os.networkInterfaces();
http.listen(port, function() {
  Object.keys(ifaces).forEach(ifname =>
    ifaces[ifname].forEach(iface =>
      console.log('listening on', iface.address, 'and port', port)));
});
