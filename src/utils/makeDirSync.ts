/**
 * 同步创建目录，递归方式
 */

import * as fs from 'fs'
import * as path from 'path'

/**
 * 递归向上创建
 * @param dir 创建的目录
 */
function makeDirSync (dir: string) {
  if (fs.existsSync(dir)) {
    return true
  }
  
  // 只有父目录存在才会创建
  if (makeDirSync(path.dirname(dir)) === true){
    fs.mkdirSync(dir)
    return true
  }

  return false
}

export = makeDirSync
