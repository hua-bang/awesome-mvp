import path from "path";
import { Module } from "../typings/module";
import * as babel from "@babel/core";

export const compiler = (
  module: Omit<Module, "dependencies" | "mapping" | "code">
): Pick<Module, "dependencies" | "mapping" | "code"> => {
  const dependencies: Module["dependencies"] = [];
  const mapping: Module["mapping"] = {};

  const { fileContent } = module;

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
