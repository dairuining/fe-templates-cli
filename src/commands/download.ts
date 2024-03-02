import ora from 'ora';
import { copy } from 'fs-extra';
import chalk from 'chalk';
import { getCurrentPath, getCurrentDirPath } from './path';

// 下载参数类型
type DownloadParams = {
  projectName: string;
  description: string;
  author: string;
  buildTool: string;
  isVscode: boolean;
};

// 模板路径映射
const TEMPLATE_PATH_MAP: Record<string, string> = {
  VITE: 'vue3-vite',
  WEBPACK5: 'vue3-webpack5',
};

// 模板基础路径
const BASE_PATH = 'dist/templates';

export const download = async (params: DownloadParams) => {
  console.log(params, 'params');
  const { projectName, buildTool } = params;
  console.log(projectName, buildTool, TEMPLATE_PATH_MAP[buildTool], 'projectName===');
  /** 旋转动画 */
  const spinner = ora('正在下载模板中...');
  spinner.start();
  // 拷贝模板
  await copy(getCurrentPath(`${BASE_PATH}/${TEMPLATE_PATH_MAP[buildTool]}`), getCurrentDirPath(projectName));
  spinner.succeed(`项目创建成功，项目名称：${chalk.bold.blueBright(projectName)}`);
};
