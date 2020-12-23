import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import session from 'express-session';
import 'dotenv/config';
import '@tsed/ajv';
import '@tsed/platform-express';
import '@tsed/passport';
import '@tsed/swagger';
import passport from 'passport';
export const rootDir = __dirname;

const SECRET = process.env.SECRET || '';

passport.serializeUser(function (user, done) {
    console.log('serializeUser');
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log('deserializeUser');
    done(null, user);
});
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
    passport: {},
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
                    origin: '*',
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
