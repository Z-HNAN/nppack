/**
 * 复制文件到指定目录中
 */
import * as fs from 'fs'
import * as path from 'path'

function copyFiles (files: string[], distPath: string) {
  files.forEach(file => {
    // 获取文件名称
    const [fileName] = /(?:\.)?[-_0-9a-z]+(?:\.\w+)*$/ig.exec(file) as RegExpExecArray
    // 复制文件
    fs.copyFileSync(file, path.join(distPath, fileName))
  })
}

export = copyFiles
