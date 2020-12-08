import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import '@tsed/platform-express';
import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import '@tsed/ajv';
import '@tsed/passport';
export const rootDir = __dirname;
import session from 'express-session';
import 'dotenv/config';
import '@tsed/swagger';
const SECRET = process.env.SECRET || '';
@Configuration({
    rootDir,
    swagger: [
        {
            path: '/v2/docs',
            specVersion: '2.0',
        },
    ],
    acceptMimes: ['application/json'],
    httpPort: process.env.PORT || 8084,
    httpsPort: false,
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
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(
                bodyParser.urlencoded({
                    extended: true,
                })
            )
            .use(
                session({
                    secret: SECRET,
                    resave: true,
                    saveUninitialized: true,
                    cookie: {
                        path: '/',
                        httpOnly: true,
                        secure: false,
                    },
                })
            );
    }
}
