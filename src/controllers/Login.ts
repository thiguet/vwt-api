import { Controller, Get, Req, Res } from '@tsed/common';
import { Authenticate } from '@tsed/passport';
import { Description, Summary, Returns } from '@tsed/schema';

const APP_BASE_URL = process.env.APP_BASE_URL || '';

@Controller('/auth')
export default class LoginController {
    private readonly SUCCESS_URI = `${APP_BASE_URL}/`;
    private readonly FAILURE_URI = `${APP_BASE_URL}/login`;

    @Summary('Log in in VWT using an app account, such as Twitter, Facebook or Google')
    @Description('Log in VWT using an available app account')
    @(Returns(200).Description('Auth Ok!'))
    @(Returns(401).Description('Unauthorized'))
    @(Returns(404).Description('Not found'))
    @Get('/:provider')
    @Authenticate('twitter')
    @Authenticate('facebook', { scope: ['email'] })
    @Authenticate('google', { scope: ['email'] })
    loginApp(@Req('user') user: Req, @Res() res: Res) {
        if (user) {
            res.redirect(this.SUCCESS_URI);
        } else {
            res.redirect(this.FAILURE_URI);
        }
    }

    @Summary('Callback to return a User for the VWT using a Google account')
    @Description('Callback to return a User for the app')
    @(Returns(200).Description('Auth Ok!'))
    @(Returns(404).Description('Not found'))
    @Get('/:provider/callback')
    @Authenticate('google')
    @Authenticate('facebook')
    @Authenticate('twitter')
    appCallback(@Req('user') user: Req, @Res() res: Res) {
        if (user) {
            res.redirect(this.SUCCESS_URI);
        } else {
            res.redirect(this.FAILURE_URI);
        }
    }
}
