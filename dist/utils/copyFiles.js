"use strict";
const tslib_1 = require("tslib");
/**
 * 复制文件到指定目录中
 */
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
function copyFiles(files, distPath) {
    files.forEach(file => {
        // 获取文件名称
        const [fileName] = /(?:\.)?[-_0-9a-z]+(?:\.\w+)*$/ig.exec(file);
        // 复制文件
        fs.copyFileSync(file, path.join(distPath, fileName));
    });
}
module.exports = copyFiles;
