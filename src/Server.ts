import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import '@tsed/platform-express'; // /!\ keep this import
import { GlobalAcceptMimesMiddleware } from '@tsed/platform-express';
import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import '@tsed/ajv';
export const rootDir = __dirname;

@Configuration({
    rootDir,
    acceptMimes: ['application/json'],
    httpPort: process.env.PORT || 8084,
    httpsPort: false, // CHANGE
    mount: {
        '/rest': [`${rootDir}/services/**/*.ts`],
    },
    exclude: ['**/*.spec.ts'],
})
export class Server {
    @Inject()
    app!: PlatformApplication;

    @Configuration()
    settings!: Configuration;

    $beforeRoutesInit() {
        this.app
            .use(cors())
            .use(GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(
                bodyParser.urlencoded({
                    extended: true,
                })
            );
    }
}
