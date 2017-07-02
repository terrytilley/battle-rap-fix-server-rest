import http from 'http';
import app from './app';

const port = process.env.PORT || 8000;
const server = http.createServer(app);

server.close();

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
