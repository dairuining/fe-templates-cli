import { Command } from 'commander';
import { version } from '../package.json';

const program = new Command();

// 实现version命令
program.version(version, '-v --version');

/** 解析命令行参数 */
program.parse(process.argv);
