import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'
import * as _ from "lodash"
import * as Joi from 'joi';

// 通用文件
const YAML_COMMON_CONFIG_FILENAME = 'config.yml'

const filePath = join(__dirname, '../config',
  YAML_COMMON_CONFIG_FILENAME);

const envPath = join(__dirname, '../config',
  `config.${process.env.NODE_ENV || 'development'}.yml`)


const commonConfig = yaml.load(readFileSync(filePath, 'utf8'))
const envConfig = yaml.load(readFileSync(envPath, 'utf8'))

//针对yml的验证
const validationSchema = Joi.object({
  db: Joi.object({
    mysql1: Joi.object({
      host: Joi.string().required(),//.required()的作用, host 字段必须存在且不为 undefined
      port: Joi.number().required(),
      name: Joi.string().required(),
    }),
    mysql2: Joi.object({
      host: Joi.string().required(),
      port: Joi.number().required(),
      name: Joi.string().required(),
    }),
  }).required(),
}).unknown(); // 使用这个，可以依然允许其他未知属性;

// 因为ConfigModuled有一个load方法 -》 函数
export  default () => {
  const mergedConfig  = _.merge(commonConfig, envConfig); //使用lodash的_合并这两个配置文件

  // 执行 Joi 验证
  const { error, value } = validationSchema.validate(mergedConfig);
  if (error) {
    throw new Error(`Configuration validation error: ${error.message}`);
  }

  return value; // 返回已验证的配置
}