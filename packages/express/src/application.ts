import http from 'http';
import Router from './router';
import { Handler, HttpMethod } from './typings';
import Lifecycle from './lifecycle';
import { MiddlewareHandler } from './typings/middleware';

class Application {
  private httpServer: http.Server | null = null;
  private router: Router = new Router();
  lifeCycle: Lifecycle = new Lifecycle();

  handle(
    req: http.IncomingMessage, 
    res: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    }
  ){
    this.router.handle(req, res);
  }

  use(middleware: MiddlewareHandler) {
    this.router.useMiddleware(middleware);
  }

  listen(port: number) {
    const appInstance = this;
    this.httpServer = http.createServer((req, res) => {
      appInstance.handle.call(appInstance, req, res);
    });
    this.httpServer.listen(port, () => {
      this.lifeCycle.listened.call(port);
    });
  }

  get(path: string, handler: Handler) {
    this.router.register(HttpMethod.Get, path, handler);
  }

  post(path: string, handler: Handler) {
    this.router.register(HttpMethod.POST, path, handler);
  }
}

export default Application;