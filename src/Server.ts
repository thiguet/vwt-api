import { Configuration, Inject, PlatformApplication } from '@tsed/common';
import { GlobalAcceptMimesMiddleware } from '@tsed/platform-express';
import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';

const rootDir = __dirname;

@Configuration({
    port: 8000,
    rootDir,
})
export default class Server {
    @Inject()
    app!: PlatformApplication;

    @Configuration({})
    settings!: Configuration;

    /**
     * This method let you configure the express middleware required by your application to works.
     * @returns {Server}
     */
    public $beforeRoutesInit(): void | Promise<any> {
        this.app
            .use(GlobalAcceptMimesMiddleware) // optional
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
