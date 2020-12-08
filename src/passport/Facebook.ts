import passport from 'passport';
import { Strategy } from 'passport-facebook';
import handleUserLogin from './handleUserLogin';

passport.use(
    new Strategy(
        {
            clientID: `${process.env.FACEBOOK_CLIENT_ID}`,
            clientSecret: `${process.env.FACEBOOK_APP_SECRET}`,
            callbackURL: '/auth/facebook/callback',
        },
        (_accessToken: any, _refreshToken: any, profile: any) => {
            const email: string = (profile.emails || [])[0].value;
            const name: string = profile.displayName || (profile.name || {}).givenName || '';
            return handleUserLogin(profile.id, email, name);
        }
    )
);
