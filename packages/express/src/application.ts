import http from 'http';

class Application {
  private httpServer: http.Server | null = null;

  listen(port: number) {
    this.httpServer = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        data: 'Hello World!',
      })
    )});
    this.httpServer.listen(port);
  }
}

export default Application;