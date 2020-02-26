/**
 * 深删除,删除该目录下的所有文件
 */
import * as fs from 'fs'

function removeDeep (dir: string) {
  let files = []

  // 检查文件夹是否合法
  if (fs.existsSync(dir) === false) {
    // throw new Error(`${dir}不是一个有效的文件目录`)
    return
  }
  files = fs.readdirSync(dir)

  // 递归删除文件
  files.forEach(file => {
    const curPath = `${dir}/${file}`
    if (fs.statSync(curPath).isDirectory()) {
      // 递归删除子目录
      removeDeep(curPath) 
    } else {
      // 递归删除文件
      fs.unlinkSync(curPath)
    }
  })

  // 删除该文件夹
  fs.rmdirSync(dir)
}

export = removeDeep
