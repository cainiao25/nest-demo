import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'
import * as _ from "lodash"

// 通用文件
const YAML_COMMON_CONFIG_FILENAME = 'config.yml'

const filePath = join(__dirname, '../config',
  YAML_COMMON_CONFIG_FILENAME);

const envPath = join(__dirname, '../config',
  `config.${process.env.NODE_ENV || 'development'}.yml`)


const commonConfig = yaml.load(readFileSync(filePath, 'utf8'))
const envConfig = yaml.load(readFileSync(envPath, 'utf8'))


// 因为ConfigModuled有一个load方法 -》 函数
export  default () => {
  return _.merge(commonConfig, envConfig) //使用lodash的_合并这两个配置文件
}