/**
 * 打印日志
 */
import moment = require('moment')

function logger (text: string) {
  /* eslint-disable-next-line no-console */
  console.log(`[${moment().format('HH:mm:ss YYYY-MM-DD')}]: ${text}`);
}

export = logger
