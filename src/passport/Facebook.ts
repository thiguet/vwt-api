import { Req } from '@tsed/common';
import { Args, OnInstall, OnVerify, Protocol } from '@tsed/passport';
import { Strategy, StrategyOption } from 'passport-facebook';
import handleUserLogin from './handleUserLogin';
@Protocol<StrategyOption>({
    name: 'facebook',
    useStrategy: Strategy,
    settings: {
        clientID: `${process.env.FACEBOOK_CLIENT_ID}`,
        clientSecret: `${process.env.FACEBOOK_CLIENT_SECRET}`,
        callbackURL: `${process.env.REDIRECT_BASE_URL}/auth/facebook/callback`,
        profileFields: ['id', 'emails', 'name'],
    },
})
export class FacebookProtocol implements OnVerify, OnInstall {
    async $onVerify(@Req() req: Req, @Args() [_accessToken, _refreshToken, profile]: any) {
        if (!req.isAuthenticated()) {
            const email: string = (profile.emails || [])[0].value;
            const name: string = profile.displayName || (profile.name || {}).givenName || '';
            const user = await handleUserLogin(profile.id, email, name);

            return user ? user : false;
        } else {
            return req.user;
        }
    }

    $onInstall() {}
}
