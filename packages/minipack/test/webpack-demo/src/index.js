import { add, sub } from "./add.js";
import { HO } from "./constant.ho";
import React from "react";

import("./dynamic.js").then((res) => {
  console.log(res);
  window.dynamic = res;
});

window._React = React;
window.add = add;
window.sub = sub;
window.HO = HO;
