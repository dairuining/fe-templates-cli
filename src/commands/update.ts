import process from 'child_process';
import chalk from 'chalk';
import ora from 'ora';

/** 更新脚手架版本 */
export const update = () => {
  /** 旋转动画 */
  const spinner = ora('init-cli 正在更新中...');
  spinner.start();
  process.exec('npm install init-cli@latest -g', (error) => {
    if (!error) {
      spinner.succeed(chalk.bold.blueBright('更新成功!'));
    } else {
      spinner.fail(
        chalk.bold.blueBright('更新init-cli脚手架版本失败, 请重新执行：npm install init-cli@latest -g 进行安装!'),
      );
    }
  });
};
