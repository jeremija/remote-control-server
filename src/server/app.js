'use strict'
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')
const robot = require('robotjs')

const handleSocket = require('./socket.js')

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '../views'))

app.use('/res', express.static(path.join(__dirname, '../res')))
app.get('/', (req, res) => res.render('index'))

io.on('connection', socket => handleSocket(socket, robot))

module.exports = http
