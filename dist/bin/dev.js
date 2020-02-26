"use strict";
const tslib_1 = require("tslib");
/**
 * dev开发
 */
const path = tslib_1.__importStar(require("path"));
const fs = tslib_1.__importStar(require("fs"));
const lodash_1 = require("lodash");
const utils_1 = require("../utils");
const liveServer = require("live-server");
const Config = require('./init')();
const srcPath = path.join(Config.PATH, Config.src);
const distPath = path.join(Config.PATH, Config.dist);
const componentCache = {};
const cssCache = {};
const jsCache = {};
/**
 * 解析index其内的组件，应为当前目录同级同名文件
 */
const parseDependencies = (filePath, html) => {
    // 父目录
    const dirPath = path.join(filePath, '..');
    // 查看该模块是否存在, path: {}
    if (lodash_1.isNil(componentCache[filePath]) === true) {
        componentCache[filePath] = {};
    }
    // 解析该模块平级的css文件
    cssCache[filePath] = utils_1.readFileList({ dir: dirPath, deep: true, filter: file => /(.*\.css)/g.test(file) });
    // 解析该模块平级的js文件
    jsCache[filePath] = utils_1.readFileList({ dir: dirPath, deep: true, filter: file => /(.*\.js)/g.test(file) });
    // 解析html中自定义组件
    const tagReg = /<([A-Z]+\w*)\s*\/>/g;
    html.replace(tagReg, (searchValue, component) => {
        // 检查该组件是否存在
        // 检查组件路径及其对应名称是否存在
        const componentPath = path.join(filePath, '..', `${component}.html`);
        const componentState = fs.statSync(componentPath);
        if (componentState.isFile() === false) {
            throw new Error(`请检查${filePath}中组件声明是否有问题,组件以大写字母开头，并放置于index.html同级目录中。`);
        }
        // 放入缓存
        componentCache[filePath][component] = fs.readFileSync(componentPath).toString();
        return searchValue;
    });
};
/**
 * 初始化所有的依赖项
 */
const init = () => {
    // 获得所有src下的index文件
    const indexFiles = utils_1.readFileList({ dir: srcPath, deep: true, filter: file => /(index\.html)/g.test(file) });
    // 替换index中的内容
    indexFiles.forEach(indexFile => {
        // 读取文件内容
        const fileContent = fs.readFileSync(indexFile).toString();
        // 基于此文件解析依赖进入componentCache
        // parseDependencies(indexFile, fileContent)
    });
};
/**
 * 处理改变公共目录
 */
const handleChangePublic = (fullPath) => {
    if (fullPath.includes(path.join(Config.PATH, Config.srcPublicJs))) {
        const jsFiles = utils_1.readFileList({ dir: path.join(Config.PATH, Config.srcPublicJs), deep: true });
        const jsDistPath = path.join(Config.PATH, Config.distPublicJs);
        utils_1.removeDeep(jsDistPath);
        utils_1.makeDirSync(jsDistPath);
        utils_1.copyFiles(jsFiles, jsDistPath);
        return true;
    }
    if (fullPath.includes(path.join(Config.PATH, Config.srcPublicCss))) {
        const cssFiles = utils_1.readFileList({ dir: path.join(Config.PATH, Config.srcPublicss), deep: true });
        const cssDistPath = path.join(Config.PATH, Config.distPublicCss);
        utils_1.removeDeep(cssDistPath);
        utils_1.makeDirSync(cssDistPath);
        utils_1.copyFiles(cssFiles, cssDistPath);
        return true;
    }
    if (fullPath.includes(path.join(Config.PATH, Config.srcPublicImage))) {
        const imageFiles = utils_1.readFileList({ dir: path.join(Config.PATH, Config.srcPubliImage), deep: true });
        const imageDistPath = path.join(Config.PATH, Config.distPublicImage);
        utils_1.removeDeep(imageDistPath);
        utils_1.makeDirSync(imageDistPath);
        utils_1.copyFiles(imageFiles, imageDistPath);
        return true;
    }
    return false;
};
/**
 * 解析index.html中自定义组件,并予以替换,并返回该文件的替换结果
 */
const renderComponent = (filePath, html) => {
    const tagReg = /<([A-Z]+\w*)\s*\/>/g;
    return html.replace(tagReg, (searchValue, component) => componentCache[filePath][component]);
};
/**
 * 将index.html文件按照src的目录结构生成到dist中
 */
const outputIndex = (distDircPath, filePath, html) => {
    // const pathReg = /[\\\\|\\/]((?!src)\w+)$/g //倒退到src目录的正则
    let distPath = distDircPath;
    let fileDirPath = path.join(filePath, '..');
    const cssFiles = cssCache[filePath];
    const jsFiles = jsCache[filePath];
    // 依此寻找层级关系
    const pathStack = [];
    let pathResponse = /[\\\\|\\/]((?!src)\w+)$/g.exec(fileDirPath);
    while (lodash_1.isNil(pathResponse) === false) {
        const currentPath = pathResponse[1];
        pathStack.unshift(currentPath);
        // src回退一级
        fileDirPath = path.join(fileDirPath, '..');
        pathResponse = /[\\\\|\\/]((?!src)\w+)$/g.exec(fileDirPath);
    }
    // 最终写入文件
    distPath = path.join(distPath, ...pathStack);
    const distFileName = 'index.html';
    // 创建目录
    utils_1.makeDirSync(distPath);
    // 写入html
    fs.writeFileSync(path.join(distPath, distFileName), html);
    // 写入css
    utils_1.copyFiles(cssFiles, distPath);
    // 写入js
    utils_1.copyFiles(jsFiles, distPath);
};
/**
 * 处理文件改变
 */
const handleChangeFile = lodash_1.debounce((fullPath) => {
    // 每一次改变打包一次
    utils_1.logger(`${fullPath}文件内容改变`);
    // 改变public
    const publicChange = handleChangePublic(fullPath);
    if (publicChange === true) {
        return;
    }
    // 改变自定义目录
    // 获得所有src下的index文件
    const indexFiles = utils_1.readFileList({ dir: srcPath, deep: true, filter: file => /(index\.html)/g.test(file) });
    // 替换index中的内容
    indexFiles.forEach(indexFile => {
        // 读取文件内容
        const fileContent = fs.readFileSync(indexFile).toString();
        // 基于此文件解析依赖进入componentCache 文件改变则替换
        parseDependencies(indexFile, fileContent);
    });
    // componentCache, cssCache, jsCache已经有了index文件组件内容，及其对应关系
    // 替换index.html文件经行填充
    indexFiles.forEach(indexFile => {
        // 读取文件内容
        const fileContent = fs.readFileSync(indexFile).toString();
        // 基于此文件将组件渲染
        const indexFileHtml = renderComponent(indexFile, fileContent);
        // 将替换好的文件进行输出
        outputIndex(distPath, indexFile, indexFileHtml);
    });
}, 200);
/**
 * 开启server
 */
const startServer = () => {
    const params = {
        port: Config.port,
        host: Config.host,
        root: Config.dist,
        open: true,
        wait: 300,
        logLevel: 2,
    };
    liveServer.start(params);
};
const dev = () => {
    utils_1.logger('初始化开发环境');
    // // 删除dist目录
    // removeDeep(distPath)
    // // 初始化所有依赖项
    // init()
    // 监控所有文件改变
    fs.watch(srcPath, {
        recursive: true
    }, (eventType, filename) => {
        // 只监听change
        if (eventType !== 'change') {
            return;
        }
        // 刷新文件改变
        handleChangeFile(path.join(srcPath, filename));
    });
    // 默认生产一次
    // 获得所有src下的index文件
    const indexFiles = utils_1.readFileList({ dir: srcPath, deep: true, filter: file => /(index\.html)/g.test(file) });
    // 替换index中的内容
    indexFiles.forEach(indexFile => {
        // 读取文件内容
        const fileContent = fs.readFileSync(indexFile).toString();
        // 基于此文件解析依赖进入componentCache
        parseDependencies(indexFile, fileContent);
    });
    startServer();
};
module.exports = dev;
