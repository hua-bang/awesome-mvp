import http from 'http';
import Router from './router';
import { Handler, HttpMethod } from './typings';
import { defaultHandler } from './default-handler';
import Lifecycle from './lifecycle';

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
    const handler = this.router.getHandler(req, res) || defaultHandler;
    handler.call(this, req, res);
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