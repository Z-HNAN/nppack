/**
 * 递归读取文件
 */

import * as fs from 'fs'
import * as path from 'path'

type ParamsType = {
  dir: string // 读取目录的开始路径
  deep: boolean // 是否递归深层次读取
  filter?: (fileName: string) => boolean // 过滤器 
}

function readFileList(
  /* eslint-disable-next-line */
  { dir, deep, filter = (file: string) => true }: ParamsType,
) {
  let files: string[] = []
  const fileList = fs.readdirSync(dir)
  fileList.forEach(file => {
    const fileFullPath = path.join(dir, file)
    const fileState = fs.statSync(fileFullPath)
    if (fileState.isDirectory() && deep === true) {
      // 递归读取目录
      files = [
        ...files,
        ...readFileList({ dir: fileFullPath, deep, filter }),
      ]
    } else if (filter(fileFullPath) === true) {
      // 满足过滤状况则进行填充
      files.push(fileFullPath)
    }
  })
  return files
}

export = readFileList
