import config from "./minipack.config";
import { MinipackConfig, build } from "../../src/index";

const run = (minipackConfig: MinipackConfig) => build(minipackConfig);

run(config);
