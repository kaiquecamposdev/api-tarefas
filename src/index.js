import http from 'node:http';
import { routes } from './routes.js';
import { json } from './middlewares/json.js';

const port = 3333
const server = http.createServer(async (req, res) => {
  const { method, url } = req
  await json(req, res)
  const route = routes.find((route) => {
    return route.method === method && route.path === url;
  })
  if(route) {
    return route.handler(req, res)
  } else {
    return res.writeHead(404).end('Not Found!')
  }
})

server.listen(port, () => {
  return console.log('Rodando na porta ::' + port)
});