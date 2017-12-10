#!/usr/bin/env node
'use strict'
const http = require('./server/app.js')
const os = require('os')

const port = process.env.PORT || 3000
const ifaces = os.networkInterfaces()
http.listen(port, function () {
  Object.keys(ifaces).forEach(ifname =>
    ifaces[ifname].forEach(iface =>
      console.log('listening on', iface.address, 'and port', port)))
})
