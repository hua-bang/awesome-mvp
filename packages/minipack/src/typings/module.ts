export interface Module {
  // 唯一的模块 id
  id: string;
  // 模块的文件内容
  fileContent: string;
  // 模块的文件路径
  filepath: string;
  // 模块 transform 后的代码
  code: string;
  // 模块的依赖
  dependencies: string[];
  // 模块的映射关系
  mapping: Record<string, string>;
}

export interface ModuleGraph {
  [key: string]: Module;
}
