#! /usr/bin/env node

import * as fs from 'fs'
import * as path from 'path'

import commander = require('commander')
import Config = require('../config')

import buildCommand = require('./build')

try {
  // Version
  commander.version(Config.VERSION)
  
  // Build
  commander
    .command(Config.COMMAND_BUILD)
    .action(buildCommand)


  // exec
  commander.parse(process.argv)
} catch (error) {
  console.log(error)
}


