import { Req } from '@tsed/common';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';
import handleUserLogin from './handleUserLogin';
import { Args, OnInstall, OnVerify, Protocol } from '@tsed/passport';

@Protocol<StrategyOptions>({
    name: 'google',
    useStrategy: Strategy,
    settings: {
        clientID: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        callbackURL: `${process.env.REDIRECT_BASE_URL}/auth/google/callback`,
    },
})
export class GoogleProtocol implements OnVerify, OnInstall {
    async $onVerify(@Req() _req: Req, @Args() [_accessToken, _refreshToken, profile]: any) {
        const email: string = (profile.emails || [])[0].value;
        const name: string = profile.displayName || (profile.name || {}).givenName || '';
        const user = await handleUserLogin(profile.id, email, name);

        return user ? user : false;
    }

    $onInstall() {}
}
