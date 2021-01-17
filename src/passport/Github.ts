import { Req } from '@tsed/common';
import { Args, OnVerify, Protocol } from '@tsed/passport';
import { Strategy, StrategyOptions } from 'passport-github';
import handleUserLogin from './handleUserLogin';

@Protocol<StrategyOptions>({
    name: 'github',
    useStrategy: Strategy,
    settings: {
        clientID: `${process.env.GITHUB_CLIENT_ID}`,
        clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
        callbackURL: `${process.env.REDIRECT_BASE_URL}/auth/github/callback`,
    },
})
export class GithubProtocol implements OnVerify {
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
}
