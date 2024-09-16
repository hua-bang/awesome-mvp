import { ModuleGraph } from "../../typings/module";

export const bundle = (moduleGraph: ModuleGraph) => {
  let modules = "";

  Object.keys(moduleGraph).forEach((moduleId) => {
    const module = moduleGraph[moduleId];
    modules += `
      "${moduleId}": [
        function(require, module, exports) {
          ${module.code}
        },
        ${JSON.stringify(module.mapping)}
      ],
    `;
  });

  return `
    (function(modules) {
      function require(id) {
        const [fn, deps] = modules[id];

        function loadRequire(id) {
          return require(deps[id]);
        }

        const module = { exports: {} };
        fn(loadRequire, module, module.exports);
        return module.exports;
      }

      require("${Object.keys(moduleGraph)[0]}");
    })({${modules}})
  `;
};
