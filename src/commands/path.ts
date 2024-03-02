const path = require('path');

/** 获取当前执行程序的路径 */
export const getCurrentPath = (pathUrl: string) => {
  return path.join(__dirname, '../', pathUrl);
};

/** 获取当前文件夹的路径 */
export const getCurrentDirPath = (pathUrl: string) => {
  return path.resolve(process.cwd(), pathUrl);
};
