/**
 * 初始化用户配置文件
 */
import * as path from 'path'
import * as fs from 'fs'

import ConfigDefault = require('../config')

function init() {
  try {
    // 有可能用户采用的为默认配置
    const configPath = path.join(ConfigDefault.PATH, './config.json')
    const configUser = JSON.parse(fs.readFileSync(configPath).toString())
    return {
      ...ConfigDefault,
      ...configUser
    }
  } catch (error) {
    return { ...ConfigDefault }
  }
}

export = init
