import inquirer from 'inquirer';
import { download } from './download';
import { existsSync, remove } from 'fs-extra';
import { getCurrentDirPath } from './path';
import chalk from 'chalk';
import ora from 'ora';

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
    default: 'dai_name',
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
export const create = async (projectName: string) => {
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
  await download({ projectName, ...answers });
};
