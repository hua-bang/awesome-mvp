import { MiddlewareHandler } from "../typings/middleware";

class Middleware {
  handler: MiddlewareHandler;

  constructor(
    handler: MiddlewareHandler
  ) {
    this.handler = handler;
  }


}

export default Middleware;