import { Controller, Get, Req } from '@tsed/common';
import { Authenticate } from '@tsed/passport';
import { Description, Summary, Returns } from '@tsed/schema';

@Controller('/auth')
export default class LoginController {
    @Summary('Try login in VWT using a Google Account')
    @Description('Try login VWT using a Google Account')
    @(Returns(200).Description('Auth Ok!'))
    @(Returns(401).Description('Unauthorized'))
    @(Returns(404).Description('Not found'))
    @Get('/google')
    @Authenticate('google', { scope: ['email'] })
    loginGoogle(@Req('user') user: Req) {
        return user;
    }

    @Summary('Callback to return a User for the VWT using the Google return')
    @Description('Callback to return a User for the app')
    @(Returns(200).Description('Auth Ok!'))
    @(Returns(404).Description('Not found'))
    @Get('/google/callback')
    @Authenticate('google', { scope: ['email'] })
    callbackGoogle(@Req('user') user: Req) {
        return user;
    }

    @Summary('Log in in VWT using a Facebook Account')
    @Description('Log in VWT using a Facebook Account')
    @(Returns(200).Description('Auth Ok!'))
    @(Returns(401).Description('Unauthorized'))
    @(Returns(404).Description('Not found'))
    @Get('/facebook')
    @Authenticate('facebook', { scope: ['email'] })
    loginFacebook(@Req('user') user: Req) {
        return user;
    }

    @Summary('Callback to return a User for the VWT using the Facebook return')
    @Description('Callback to return a User for the app')
    @(Returns(200).Description('Auth Ok!'))
    @(Returns(404).Description('Not found'))
    @Get('/facebook/callback')
    @Authenticate('facebook')
    callbackFacebook(@Req('user') user: Req) {
        return user;
    }

    @Summary('Log in in VWT using a Instagram Account')
    @Description('Log in VWT using a Instagram Account')
    @(Returns(200).Description('Auth Ok!'))
    @(Returns(401).Description('Unauthorized'))
    @(Returns(404).Description('Not found'))
    @Get('/instagram')
    @Authenticate('instagram', { scope: ['email'] })
    loginInstagram(@Req('user') user: Req) {
        return user;
    }

    @Summary('Callback to return a User for the VWT using the Instagram return')
    @Description('Callback to return a User for the app')
    @(Returns(200).Description('Auth Ok!'))
    @(Returns(404).Description('Not found'))
    @Get('/instagram/callback')
    @Authenticate('instagram')
    callbackInstagram(@Req('user') user: Req) {
        return user;
    }
}
