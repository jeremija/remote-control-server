#!/usr/bin/env node
'use strict';
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const robot = require('robotjs');
const os = require('os');

const handleSocket = require('./server/socket.js');

app.set('view engine', 'jade');

if (path.basename(__dirname) === 'dist') {
  app.set('views', path.join(__dirname, 'views'));
  app.use('/js', express.static(path.join(__dirname, 'js')));
  app.use('/less', express.static(path.join(__dirname, 'less')));
} else {
  const browserify = require('browserify-middleware');
  const less = require('less-middleware');
  browserify.settings({
    transform: ['babelify']
  });

  app.set('views', path.join(__dirname, './src/views'));
  const tempDir = path.join(os.tmpDir(), 'node-mpv-css-cache');
  app.use('/js', browserify(path.join(__dirname, './src/js')));
  app.use('/less', less(path.join(__dirname, './src/less'), { dest: tempDir}));
  app.use('/less', express.static(tempDir));
  app.use('/less/fonts', express.static(
    path.join(__dirname, './src/less/fonts')));
}

app.get('/', (req, res) => res.render('index'));

io.on('connection', socket => handleSocket(socket, robot));

let port = process.env.PORT || 3000;
let ifaces = os.networkInterfaces();
http.listen(port, function() {
  Object.keys(ifaces).forEach(ifname =>
    ifaces[ifname].forEach(iface =>
      console.log('listening on', iface.address, 'and port', port)));
});
