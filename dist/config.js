"use strict";
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const config = {
    VERSION: '0.1.3',
    COMMAND_BUILD: 'build',
    COMMAND_DEV: 'dev',
    PATH: path.resolve('./'),
    src: './src',
    srcPublicJs: './src/js',
    srcPublicCss: './src/css',
    srcPublicImage: './src/image',
    srcPublicFonts: './src/fonts',
    srcPublicMedia: './src/media',
    dist: './dist',
    distPublicJs: './dist/js',
    distPublicCss: './dist/css',
    distPublicImage: './dist/image',
    distPublicFonts: './dist/fonts',
    distPublicMedia: './dist/media',
    port: 5500,
    host: '0.0.0.0'
};
module.exports = config;
