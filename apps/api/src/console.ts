import { BootstrapConsole } from 'nestjs-console';
import { IndexModule } from './index.module';

const bootstrap = new BootstrapConsole({
  module: IndexModule,
  useDecorators: true,
});
bootstrap.init().then(async (app) => {
  try {
    await app.init();
    await bootstrap.boot();
    await app.close();

    process.exit(0);
  } catch (e) {
    app.close();

    process.exit(1);
  }
});
