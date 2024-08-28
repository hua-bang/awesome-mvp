import { Handler, HttpMethod } from "../typings";
import { defaultHandler } from "./default-handler";
import Route from "./route";
import Middleware from '../middleware';
import { MiddlewareHandler } from "../typings/middleware";

class Router {
  private routes: Route[] = [];
  private middlewareHandlers: MiddlewareHandler[] = [];

  register(method: HttpMethod, path: string, handler: Handler) {
    const route = new Route(
      method,
      path,
      handler
    );
    this.routes.push(route);
  }

  handle(...args: Parameters<Handler>){
    const route = this.routes.find(route => route.match(...args));
    const handler = route?.handler || defaultHandler;

    const handlerList: MiddlewareHandler[] = [...this.middlewareHandlers, handler];
    let i = 0;
    const handlerListLength = handlerList.length;

    const next = () => {
      if (i >= handlerListLength) {
        return;
      }
      const nextHandler = handlerList[i++];
      nextHandler(...args, next);
    }
    next();
  }

  useMiddleware(middlewareHandler: MiddlewareHandler) {
    this.middlewareHandlers.push(middlewareHandler)
  }
}

export default Router;