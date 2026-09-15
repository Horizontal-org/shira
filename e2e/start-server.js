const { spawn } = require('node:child_process');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const target = process.argv[2];
const env = { ...process.env, ...require('./environment.js') };
const services = {
  api: [
    'apps/api',
    [
      '-r',
      'ts-node/register',
      '-r',
      'tsconfig-paths/register',
      '../../e2e/start-api.ts',
    ],
  ],
  public: ['apps/public', ['scripts/start.js']],
  spaces: [
    'apps/spaces',
    ['../../node_modules/react-scripts/scripts/start.js'],
  ],
};
if (!services[target]) throw new Error(`Unknown server: ${target}`);
if (target !== 'api')
  Object.assign(env, {
    NODE_ENV: 'development',
    BROWSER: 'none',
    HOST: 'localhost',
    PUBLIC_URL: '',
    PORT: target === 'public' ? '13001' : '13002',
    REACT_APP_API_URL: 'http://localhost:13000',
    REACT_APP_LIBRARY_API_URL: 'http://localhost:13999',
    REACT_APP_ENABLE_ANALYTICS: 'no',
    REACT_APP_VERSION: require('../package.json').version,
  });
const [cwd, args] = services[target];
const child = spawn(process.execPath, args, {
  cwd: path.join(root, cwd),
  env,
  stdio: 'inherit',
});
for (const signal of ['SIGINT', 'SIGTERM'])
  process.on(signal, () => child.kill(signal));
child.on('error', (error) => {
  console.error(error);
  process.exitCode = 1;
});
child.on('exit', (code) => {
  process.exitCode = code ?? 1;
});
