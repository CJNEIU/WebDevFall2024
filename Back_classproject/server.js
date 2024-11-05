import http from "http";
import app from './app.js'

// const server = http.createServer((req, res) => {
//   res.end("this is my first response");
// });



const port = 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);