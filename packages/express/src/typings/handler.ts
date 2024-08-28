import http from 'http';

export interface Handler {
  (
    req: http.IncomingMessage, 
    res: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    }
  ): void
}