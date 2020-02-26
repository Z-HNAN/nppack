"use strict";
/**
 * 递归读取文件
 */
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
function readFileList(
/* eslint-disable-next-line */
{ dir, deep, filter = (file) => true }) {
    let files = [];
    const fileList = fs.readdirSync(dir);
    fileList.forEach(file => {
        const fileFullPath = path.join(dir, file);
        const fileState = fs.statSync(fileFullPath);
        if (fileState.isDirectory() && deep === true) {
            // 递归读取目录
            files = [
                ...files,
                ...readFileList({ dir: fileFullPath, deep, filter }),
            ];
        }
        else if (filter(fileFullPath) === true) {
            // 满足过滤状况则进行填充
            files.push(fileFullPath);
        }
    });
    return files;
}
module.exports = readFileList;
