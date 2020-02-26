"use strict";
/**
 * 打印日志
 */
const moment = require("moment");
function logger(text) {
    /* eslint-disable-next-line no-console */
    console.log(`[${moment().format('HH:mm:ss YYYY-MM-DD')}]: ${text}`);
}
module.exports = logger;
