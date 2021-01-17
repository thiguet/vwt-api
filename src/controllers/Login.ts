import { Controller, Get, Req } from '@tsed/common';
import { Authenticate } from '@tsed/passport';
import { Description, Summary, Returns } from '@tsed/schema';

const SUCCESS_REDIRECT = `${process.env.APP_BASE_URL}/`;
const FAILURE_REDIRECT = `${process.env.APP_BASE_URL}/login`;

@Controller('/auth')
export default class LoginController {
    @Summary('Log in in VWT using a Facebook account')
    @Description('Log in in VWT using a Facebook account')
    @(Returns(200).Description('Auth Ok!'))
    @(Returns(401).Description('Unauthorized'))
    @(Returns(404).Description('Not found'))
    @Get('/facebook')
    @Authenticate('facebook', {
        passReqToCallback: true,
        scope: ['email'],
    })
    loginFacebook(@Req('user') user: Req) {
        return user;
    }

    @Summary('Callback to return a User for the VWT using a Facebook account')
    @Description('Callback to return a User for the app')
    @(Returns(200).Description('Auth Ok!'))
    @(Returns(404).Description('Not found'))
    @Get('/facebook/callback')
    @Authenticate('facebook', {
        successRedirect: SUCCESS_REDIRECT,
        failureRedirect: FAILURE_REDIRECT,
    })
    callbackFacebook(@Req('user') user: Req) {
        return user;
    }

    @Summary('Log in in VWT using a Google account')
    @Description('Log in in VWT using a Google account')
    @(Returns(200).Description('Auth Ok!'))
    @(Returns(401).Description('Unauthorized'))
    @(Returns(404).Description('Not found'))
    @Get('/google')
    @Authenticate('google', {
        scope: ['email'],
        passReqToCallback: true,
    })
    loginGoogle(@Req('user') user: Req) {
        return user;
    }

    @Summary('Callback to return a User for the VWT using a Google account')
    @Description('Callback to return a User for the VWT using a Google account')
    @(Returns(200).Description('Auth Ok!'))
    @(Returns(404).Description('Not found'))
    @Get('/google/callback')
    @Authenticate('google', {
        successRedirect: SUCCESS_REDIRECT,
        failureRedirect: FAILURE_REDIRECT,
    })
    callbackGoogle(@Req('user') user: Req) {
        return user;
    }

    @Summary('Log in in VWT using a Github account')
    @Description('Log in in VWT using a Github account')
    @(Returns(200).Description('Auth Ok!'))
    @(Returns(401).Description('Unauthorized'))
    @(Returns(404).Description('Not found'))
    @Get('/github')
    @Authenticate('github', {
        scope: ['email'],
        passReqToCallback: true,
    })
    loginGithub(@Req('user') user: Req) {
        return user;
    }

    @Summary('Callback to return a User for the VWT using a Github account')
    @Description('Callback to return a User for the VWT using a Github account')
    @(Returns(200).Description('Auth Ok!'))
    @(Returns(404).Description('Not found'))
    @Get('/github/callback')
    @Authenticate('github', {
        successRedirect: SUCCESS_REDIRECT,
        failureRedirect: FAILURE_REDIRECT,
    })
    callbackGithub(@Req('user') user: Req) {
        return user;
    }

    @Summary('Logs user out')
    @Description('Logs user out')
    @(Returns(200).Description('Logged Out!'))
    @(Returns(404).Description('Not found'))
    @Get('/logout')
    logout(@Req() req: Req) {
        req.logout();
    }
}
