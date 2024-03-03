import inquirer from 'inquirer';
import { download } from './download';
import { existsSync, remove } from 'fs-extra';
import { getCurrentDirPath } from './path';
import chalk from 'chalk';
import ora from 'ora';
import axios from 'axios';
import { name, version } from '../../package.json';
import { log } from './log';

// 构建工具映射
export const BUILD_TOOLS = [
  {
    name: 'Vite',
    value: 'VITE',
  },
  {
    name: 'Webpack5',
    value: 'WEBPACK5',
  },
  {
    name: 'React',
    value: 'REACT',
  },
];

// 是否采用VSCode作为开发编辑器
export const IS_VSCODE = [
  {
    name: '是',
    value: true,
  },
  {
    name: '否',
    value: false,
  },
];

// 是否覆盖已有文件夹
export const IS_OVER_WRITE = [
  {
    name: '是',
    value: true,
  },
  {
    name: '否',
    value: false,
  },
];

// 命令交互
const promptList = [
  {
    type: 'input',
    message: '请输入项目名称(英文-远程仓库名称一致)',
    name: 'projectName',
    default: 'test-project',
    validate: function (val: string) {
      return /^[a-zA-Z.\-_]+$/.test(val) ? true : '请输入正确的项目名称';
    },
  },
  {
    type: 'input',
    message: '请输入项目用途描述',
    default: '前端脚手架生成项目',
    name: 'description',
    validate: function (val: string) {
      return val ? true : '请输入项目用途描述';
    },
  },
  {
    type: 'input',
    message: '请输入作者',
    default: 'dairuining',
    name: 'author',
    validate: function (val: string) {
      return val ? true : '请输入作者';
    },
  },
  {
    type: 'list',
    message: '请选择构建工具',
    default: 0,
    name: 'buildTool',
    choices: BUILD_TOOLS,
  },
  {
    type: 'list',
    message: '请选择是否采用VSCode作为开发编辑器',
    default: 0,
    name: 'isVSCode',
    choices: IS_VSCODE,
  },
];

// 命令行交互 - 是否覆盖已有文件夹
const promptOverwrite = [
  {
    type: 'list',
    message: '是否覆盖已有文件夹',
    name: 'isOverwrite',
    choices: IS_OVER_WRITE,
  },
];

// 判断文件夹是否存在
const isExistDir = (projectName: string) => {
  return existsSync(getCurrentDirPath(projectName));
};

// NPM registry host
const NPM_URL_HOST = 'registry.npmjs.org';

// 比较版本大小
const compareVersion = (latestVersion: string, version: string) => {
  return latestVersion !== version;
};

/** 检查版本 */
export const checkVersion = async (name: string, version: string) => {
  try {
    const NPM_URL = `https://${NPM_URL_HOST}/${name}`;
    const { data } = await axios.get(NPM_URL);
    const latestVersion = data['dist-tags'].latest;
    // 比较版本号
    const isUpdateVersion = compareVersion(latestVersion, version);
    if (isUpdateVersion) {
      log.success(
        `检查到最新版本是：${chalk.bold.blackBright(latestVersion)}，当前版本是：${chalk.bold.blackBright(version)}`,
      );
      log.success(
        `可使用：${chalk.yellow('npm install fe-templates-cli@latest -g')}，或者使用：${chalk.yellow('fe-templates-cli update')} 更新`,
      );
    }
  } catch (error) {
    log.warn(`检查版本失败, 请检查网络是否正常!!!, 错误信息: ${error}`);
  }
};

export const create = async (projectName: string) => {
  // 检查版本是否需要更新
  await checkVersion(name, version);
  if (projectName) {
    promptList.shift();
  }
  const answers = await inquirer.prompt(promptList);
  const newProjectName = projectName || answers.projectName;
  // 如果文件夹存在，提示是否覆盖
  if (isExistDir(newProjectName)) {
    const { isOverwrite } = await inquirer.prompt(promptOverwrite);
    if (isOverwrite) {
      /** 旋转动画 */
      const spinner = ora('正在删除中...');
      spinner.start();
      await remove(getCurrentDirPath(newProjectName));
      spinner.succeed(chalk.bold.blueBright('删除成功'));
    }
  }
  // 下载模板
  download({ projectName, ...answers });
};
