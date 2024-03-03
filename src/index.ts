import { Command } from 'commander';
import packageInfo from '../package.json';
import { create } from './commands/create';
import { update } from './commands/update';

const program = new Command();

// 实现version命令
program.version(packageInfo.version, '-v --version');

/** 实现create创建项目命令 */
program
  .command('create')
  .description('创建一个新项目')
  .argument('[name]', '项目名称')
  .action((projectName) => {
    // 新建模板
    create(projectName);
  });

/** 更新脚手架版本 */
program
  .command('update')
  .description('更新脚手架 fe-templates-cli')
  .action(() => {
    // 更新版本
    update();
  });

/** 解析命令行参数 */
program.parse(process.argv);
