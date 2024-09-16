import path from "path";
import { Module } from "../typings/module";
import * as babel from "@babel/core";
import { MinipackConfig } from "../typings";

const getFileTransformedCode = (
  module: Omit<Module, "dependencies" | "mapping" | "code">,
  minipackConfig: MinipackConfig
): string => {
  const { module: minipackConfigModule } = minipackConfig;

  if (!minipackConfigModule?.rules?.length) {
    return module.fileContent;
  }

  const { rules } = minipackConfigModule;

  for (let i = 0; i < rules.length; i++) {
    const { test, use } = rules[i];
    if (test.test(module.filepath)) {
      return use(module.fileContent);
    }
  }

  return module.fileContent;
};

export const getFileMeta = (
  module: Omit<Module, "dependencies" | "mapping" | "code">,
  minipackConfig: MinipackConfig
): Pick<Module, "dependencies" | "mapping" | "code"> => {
  const dependencies: Module["dependencies"] = [];
  const mapping: Module["mapping"] = {};

  const fileContent = getFileTransformedCode(module, minipackConfig);

  const ast = babel.parse(fileContent);

  babel.traverse(ast!, {
    ImportDeclaration({ node }) {
      if (!node) {
        return;
      }
      const { value } = node.source;
      dependencies.push(value);
      const absolutePath = path.resolve(module.filepath, "..", value);
      mapping[value] = absolutePath;
    },
  });

  const res = babel.transformFromAstSync(ast!, fileContent, {
    presets: ["@babel/preset-env"],
  });

  return {
    code: res?.code || "",
    dependencies,
    mapping,
  };
};
