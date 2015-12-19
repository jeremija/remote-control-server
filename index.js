#!/usr/bin/env node
'use strict';
const express = require('express');
const app = express();
const browserify = require('browserify-middleware');
const less = require('less-middleware');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const robot = require('robotjs');
const os = require('os');

const handleSocket = require('./src/server/socket.js');

browserify.settings({
  transform: ['babelify']
});

const tempDir = path.join(os.tmpDir(), 'node-mpv-css-cache');

app.set('views', './src/views');
app.set('view engine', 'jade');

app.get('/', (req, res) => res.render('index'));

app.use('/js', browserify('./src/js'));
app.use('/less', less('./src/less', { dest: tempDir}));
app.use('/less', express.static(tempDir));
app.use('/less/fonts', express.static('./src/less/fonts'));

io.on('connection', socket => handleSocket(socket, robot));

let port = process.env.PORT || 3000;
let ifaces = os.networkInterfaces();
http.listen(port, function() {
  Object.keys(ifaces).forEach(ifname =>
    ifaces[ifname].forEach(iface =>
      console.log('listening on', iface.address, 'and port', port)));
});
