import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import cookieSession from 'cookie-session';
import 'dotenv/config';
import '@tsed/ajv';
import '@tsed/platform-express';
import '@tsed/passport';
import '@tsed/swagger';
export const rootDir = __dirname;

const SECRET = process.env.SECRET || '';

@Configuration({
    rootDir,
    swagger: [
        {
            path: '/v1/docs',
            specVersion: '3.0.3',
            outFile: `${rootDir}/swagger.json`,
        },
    ],
    mount: {
        '/': [`${rootDir}/controllers/**/*.ts`],
    },
    componentsScan: [`${rootDir}/passport/**/*.ts`],
    acceptMimes: ['application/json'],
    httpPort: process.env.PORT || 8080,
    exclude: ['**/*.spec.ts'],
})
export class Server {
    @Inject()
    app!: PlatformApplication;

    @Configuration()
    settings!: Configuration;

    $beforeRoutesInit() {
        this.app
            .use(
                cors({
                    origin: ['http://localhost:8080'],
                    credentials: true,
                    exposedHeaders: ['set-cookie', 'cookie'],
                })
            )
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
                cookieSession({
                    name: 'VWT',
                    keys: [SECRET],
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                })
            );
    }
}
