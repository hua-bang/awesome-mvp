import { Handler } from "./typings";

export function defaultHandler(...args: Parameters<Handler>) {
  const [req, res] = args;
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end("404 NotFound");
} 