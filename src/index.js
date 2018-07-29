import Hapi from 'hapi';
import Jwt from 'hapi-auth-jwt2';

import validate from './utils/validate';
import Routes from './routes';

const server = Hapi.Server({
  host: 'localhost',
  port: 8080,
});

const init = async () => {
  await server.register(Jwt);
  server.auth.strategy('jwt', 'jwt', {
    key: 'topSecretKey_ToBePutInFileInProductionEnv',
    validate,
    verifyOptions: {
      algorithm: ['HS256'],
    },
  });
  server.auth.default('jwt');
  server.route(Routes);
  await server.start();
  return server;
};

init().then((server) => {
  console.log('Server running at: ', server.info.uri);
});

export default server;
