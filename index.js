#!/usr/bin/env node

const runApp = require('./build/main').default

runApp(process.argv[2], process.argv[3])
