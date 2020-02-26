"use strict";
/**
 * 同步创建目录，递归方式
 */
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
/**
 * 递归向上创建
 * @param dir 创建的目录
 */
function makeDirSync(dir) {
    if (fs.existsSync(dir)) {
        return true;
    }
    // 只有父目录存在才会创建
    if (makeDirSync(path.dirname(dir)) === true) {
        fs.mkdirSync(dir);
        return true;
    }
    return false;
}
module.exports = makeDirSync;
