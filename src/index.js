import Hapi from 'hapi';

import Routes from './routes';

const server = Hapi.Server({
  host: 'localhost',
  port: 8080,
});

server.route(Routes);

const start = async () => {
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Server running at: ', server.info.uri);
};
start();

export default server;
