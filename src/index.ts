import { Command } from 'commander';
import { version } from '../package.json';
import { create } from './commands/create';

const program = new Command();

// 实现version命令
program.version(version, '-v --version');

/** 实现create创建项目命令 */
program
  .command('create')
  .description('创建一个新项目')
  .argument('[name]', '项目名称')
  .action((projectName) => {
    // 新建模板
    create(projectName);
  });

/** 解析命令行参数 */
program.parse(process.argv);
