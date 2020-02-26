#! /usr/bin/env node

import * as fs from 'fs'
import * as path from 'path'

import commander = require('commander')
import Config = require('../config')

import buildCommand = require('./build')
import devCommand = require('./dev')

try {
  // Version
  commander.version(Config.VERSION)
  
  // Build
  commander
    .command(Config.COMMAND_BUILD)
    .action(buildCommand)

  // Dev
  commander
    .command(Config.COMMAND_DEV)
    .action(devCommand)

  // exec
  commander.parse(process.argv)
} catch (error) {
  console.log(error)
}


