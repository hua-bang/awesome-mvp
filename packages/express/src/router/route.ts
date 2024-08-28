import { url } from "inspector";
import { Handler, HttpMethod } from "../typings";

class Route {
  method: HttpMethod;
  path: string;
  handler: Handler;
  
  constructor(
    method: HttpMethod, path: string, handler: Handler
  ) {
    this.handler = handler;
    this.method = method;
    this.path = path;
  }

  match(...args: Parameters<Handler>) {
    const [req] = args;
    const { method, url } = req;
    return method?.toLowerCase() === this.method.toLowerCase() && url?.toLowerCase() === this.path.toLowerCase();
  }
}

export default Route;