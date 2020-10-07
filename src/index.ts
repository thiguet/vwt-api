import { $log } from '@tsed/common';
import { PlatformExpress } from '@tsed/platform-express';
import Server from './Server';
import { sequelize } from './sqlz/';

async function bootstrap() {
    try {
        await sequelize.sync();

        $log.debug('Start server...');
        const platform = await PlatformExpress.bootstrap(Server, {
            port: 8080,
        });

        await platform.listen();
        $log.debug('Server initialized');
    } catch (er) {
        $log.error(er);
    }
}

bootstrap();
