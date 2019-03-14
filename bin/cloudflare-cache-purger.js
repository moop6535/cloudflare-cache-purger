#!/usr/bin/env node
const path = require('path'),
      app = require(path.join('../lib'));

if (process.argv.length > 3) {
  console.log('Too many things');
  process.exit();
}

process.argv[2] ? app.prompt(process.argv[2]) : app.prompt();