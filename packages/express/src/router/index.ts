import { Handler, HttpMethod } from "../typings";
import Route from "./route";

class Router {
  private routes: Route[] = [];

  register(method: HttpMethod, path: string, handler: Handler) {
    const route = new Route(
      method,
      path,
      handler
    );
    this.routes.push(route);
  }

  getHandler(...args: Parameters<Handler>): Handler | undefined {
    const route = this.routes.find(route => route.match(...args));
    return route?.handler;
  }
}

export default Router;