#!/usr/bin/env node
import fs from 'fs'
import execa from "execa";  //安装依赖
import path from 'path'
import chalk from 'chalk'  //让命令行颜色高亮
import createIndexTemplate from './createIndexTemplate.js'
import createPackageTemplate from "./createPackageTemplate.js";
import questions from "./questions/index.js";
import { createConfig } from "./config.js";

//命令行配置文件，answer为配置影响ejs的模板
const answer = await questions()
const config = createConfig(answer);
//创建文件夹
// // 1. 创建项目文件夹
console.log(chalk.blue(`创建项目文件夹:${config.packageName}`))
fs.mkdirSync(getRootPath())

//创建index.js
console.log(chalk.blue(`创建 index.js`))
fs.writeFileSync(`${getRootPath()}/index.js`, createIndexTemplate(config))

//创建package.json
console.log(chalk.blue(`创建 package.json`))
fs.writeFileSync(
  `${getRootPath()}/package.json`,
  createPackageTemplate(config)
);


// 4. 安装依赖
console.log(chalk.blue(`安装依赖`))
execa("npm install", {
  cwd: getRootPath(),
  stdio: [2, 2, 2],
});

function getRootPath () {
  return path.resolve(process.cwd(), config.packageName)
}

