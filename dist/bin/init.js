"use strict";
const tslib_1 = require("tslib");
/**
 * 初始化用户配置文件
 */
const path = tslib_1.__importStar(require("path"));
const fs = tslib_1.__importStar(require("fs"));
const ConfigDefault = require("../config");
function init() {
    try {
        // 有可能用户采用的为默认配置
        const configPath = path.join(ConfigDefault.PATH, './config.json');
        const configUser = JSON.parse(fs.readFileSync(configPath).toString());
        return {
            ...ConfigDefault,
            ...configUser
        };
    }
    catch (error) {
        return { ...ConfigDefault };
    }
}
module.exports = init;
