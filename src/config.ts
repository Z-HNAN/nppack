import * as path from 'path'

const config: {
  // 版本
  VERSION: string

  // 命令相关
  COMMAND_BUILD: string
  COMMAND_DEV: string

  /* 读取路径，默认从node命令行打开路径开始操作 */
  PATH: string

  // =======用户自定义操作========

  // 源码
  src: string
  // 公共资源文件夹
  srcPublicJs: string
  srcPublicCss: string
  srcPublicImage: string

  // 输出环境
  dist: string
  // 公共资源文件夹
  distPublicJs: string
  distPublicCss: string
  distPublicImage: string

  // 服务器port
  port: number
  host: string


} = {
  VERSION: '0.1.3',
  COMMAND_BUILD: 'build',
  COMMAND_DEV: 'dev',
  PATH: path.resolve('./'),
  src: './src',
  srcPublicJs: './src/js',
  srcPublicCss: './src/css',
  srcPublicImage: './src/image',
  dist: './dist',
  distPublicJs: './dist/js',
  distPublicCss: './dist/css',
  distPublicImage: './dist/image',
  port: 5500,
  host: '0.0.0.0'
}


export = config