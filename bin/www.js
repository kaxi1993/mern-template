import http from 'http';
import signale from 'signale';

import app from '../server/app.js';
import db from '../server/db.js';

const port = parseInt(process.env.PORT || '5000', 10);

app.set('port', port);

const server = http.createServer(app);

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

  signale.success(`Server listening on ${bind}`);
};

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      signale.fatal(`${bind} requires elevated privileges`);

      process.exit(1);
      break;
    case 'EADDRINUSE':
      signale.fatal(`${bind} is already in use`);

      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

db.connect(process.env.MONGODB_URL);
