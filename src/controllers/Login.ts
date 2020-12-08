import { Controller, Get, Req } from '@tsed/common';
import { Authenticate } from '@tsed/passport';

@Controller('/auth')
export default class LoginController {
    @Get('/google')
    @Authenticate('google', { scope: ['email'] })
    loginGoogle(@Req('user') user: Req) {
        return user;
    }

    @Get('/google/callback')
    @Authenticate('google', { scope: ['email'] })
    callbackGoogle(@Req('user') user: Req) {
        return user;
    }

    @Get('/facebook')
    @Authenticate('facebook', { scope: ['email'] })
    loginFacebook(@Req('user') user: Req) {
        return user;
    }

    @Get('/facebook/callback')
    @Authenticate('facebook')
    callbackFacebook(@Req('user') user: Req) {
        return user;
    }

    @Get('/instagram')
    @Authenticate('instagram', { scope: ['email'] })
    loginInstagram(@Req('user') user: Req) {
        return user;
    }

    @Get('/instagram/callback')
    @Authenticate('instagram')
    callbackInstagram(@Req('user') user: Req) {
        return user;
    }
}
