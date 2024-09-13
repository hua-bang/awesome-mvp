import fs from "fs";
import { Module, ModuleGraph } from "../typings/module";
import { MinipackConfig } from "../typings";
import { compiler } from "./compiler";

const getFileContent = (filepath: string) => fs.readFileSync(filepath, "utf-8");

export const createModule = (filepath: string): Module => {
  const fileContent = getFileContent(filepath);

  let module: Module = {
    id: filepath,
    fileContent,
    filepath,
    code: ``,
    dependencies: [],
    mapping: {},
  };

  const { code, dependencies, mapping } = compiler(module);

  module = {
    ...module,
    code,
    dependencies,
    mapping,
  };

  return module;
};

// 从入口文件开始遍历，构建依赖
export const createModuleGraph = (
  minipackConfig: MinipackConfig
): ModuleGraph => {
  const moduleGraph: ModuleGraph = {};

  const { entry } = minipackConfig;
  const entryModule = createModule(entry);

  const explore = (module: Module) => {
    // 如果已经解析过了，就没有必要再构建了
    if (moduleGraph[module.id]) {
      return;
    }

    moduleGraph[module.id] = module;

    module.dependencies.forEach((dependencyPath) => {
      const dependency = module.mapping[dependencyPath];
      const dependencyModule = createModule(dependency);
      explore(dependencyModule);
    });
  };

  explore(entryModule);
  return moduleGraph;
};
