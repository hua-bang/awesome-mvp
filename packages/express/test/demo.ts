import { express } from '../src/index';

const app = express();

app.lifeCycle.listened.tap('event', (port) => {
  console.log(`
    Http Server is start on ${port}
  `);
});

app.get('/user/name', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    userName: 'hug',
  }));
})

app.get('/user/age', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    age: 18,
  }));
})

app.post('/user/work', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    work: 'software',
  }));
})

app.listen(2309);
