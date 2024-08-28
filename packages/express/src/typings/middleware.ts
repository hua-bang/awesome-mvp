import http from 'http';

export interface MiddlewareHandler {
  (
    req: http.IncomingMessage, 
    res: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    },
    next: () => void,
  ): void
}