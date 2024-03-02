import ora from 'ora';
import childProcess from 'child_process';
import chalk from 'chalk';
import { log } from './log';
const figlet = require('figlet');

// 下载参数类型
type DownloadParams = {
  projectName: string;
  description: string;
  author: string;
  buildTool: string;
  isVscode: boolean;
};

// 打印一个炫酷的文字工具
const goodPrinter = async () => {
  const data = await figlet('init-cli');
  console.log(chalk.rgb(40, 156, 193).visible(data));
};

// 构建工具映射模板类型
const BUILD_TOOLS_MAP: Record<string, string> = {
  VITE: 'Vue3-Vite-Pinia-TS',
  WEBPACK5: 'Vue3-Webpack5-Vuex-TS',
};

export const download = (params: DownloadParams) => {
  const { projectName, buildTool } = params;
  /** 旋转动画 */
  const spinner = ora('正在下载模板中...');
  spinner.start();
  const currentBranchName = BUILD_TOOLS_MAP[buildTool];
  childProcess.exec(
    `git clone -b ${currentBranchName} https://github.com/dairuining/template-list.git ${projectName}`,
    async (error) => {
      if (!error) {
        spinner.succeed(`项目创建成功，项目名称：${chalk.bold.blueBright(projectName)}`);
        log.success('执行以下命令启动项目：');
        log.info(`cd ${chalk.blueBright(projectName)}`);
        log.info(`npm ${chalk.blueBright('i')}`);
        log.info(`${chalk.yellow('npm')} run serve`);
        await goodPrinter();
      } else {
        spinner.fail(chalk.bold.blueBright('拉取模板失败，请检查网络状态!'));
      }
    },
  );
};
