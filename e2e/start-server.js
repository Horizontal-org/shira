const { spawn } = require('node:child_process');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const e2eEnv = require('./environment.js');
const packageJson = require('../package.json');

const serviceName = process.argv[2];

// Both Spaces and Public apps use the same test API.
const commonFrontendEnv = {
  NODE_ENV: 'development',
  BROWSER: 'none',
  HOST: 'localhost',
  PUBLIC_URL: '',
  REACT_APP_API_URL: 'http://localhost:13000',
  REACT_APP_LIBRARY_API_URL: 'http://localhost:13999',
  REACT_APP_ENABLE_ANALYTICS: 'no',
  REACT_APP_VERSION: packageJson.version,
};

const services = {
  api: {
    cwd: 'apps/api',
    args: [
      '-r',
      'ts-node/register',
      '-r',
      'tsconfig-paths/register',
      '../../e2e/start-api.ts',
    ],
  },

  public: {
    cwd: 'apps/public',
    args: ['scripts/start.js'],
    env: {
      ...commonFrontendEnv,
      PORT: '13001',
    },
  },

  spaces: {
    cwd: 'apps/spaces',
    args: ['../../node_modules/react-scripts/scripts/start.js'],
    env: {
      ...commonFrontendEnv,
      PORT: '13002',
    },
  },
};

function startServer(name) {
  const service = services[name];

  const env = {
    ...process.env,
    ...e2eEnv,
    ...service.env,
  };

  const child = spawn(process.execPath, service.args, {
    cwd: path.join(rootDir, service.cwd),
    env,
    stdio: 'inherit',
  });

  const forwardSignal = (signal) => {
    if (!child.killed) {
      child.kill(signal);
    }
  };

  process.once('SIGINT', () => forwardSignal('SIGINT'));
  process.once('SIGTERM', () => forwardSignal('SIGTERM'));

  child.on('error', (error) => {
    console.error(`Failed to start ${name}:`, error);
    process.exitCode = 1;
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      process.exitCode = 1;
      return;
    }

    process.exitCode = code ?? 1;
  });
}

startServer(serviceName);
