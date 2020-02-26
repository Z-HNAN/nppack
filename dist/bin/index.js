#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const Config = require("../config");
const buildCommand = require("./build");
const devCommand = require("./dev");
try {
    // Version
    commander.version(Config.VERSION);
    // Build
    commander
        .command(Config.COMMAND_BUILD)
        .action(buildCommand);
    // Dev
    commander
        .command(Config.COMMAND_DEV)
        .action(devCommand);
    // exec
    commander.parse(process.argv);
}
catch (error) {
    console.log(error);
}
