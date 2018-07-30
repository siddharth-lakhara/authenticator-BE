
export default [{
  method: 'GET',
  config: {
    auth: false,
  },
  path: '/ping',
  handler: () => ('pong'),
}];
