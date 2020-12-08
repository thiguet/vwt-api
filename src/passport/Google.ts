import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import handleUserLogin from './handleUserLogin';

passport.use(
    new Strategy(
        {
            clientID: `${process.env.GOOGLE_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
            callbackURL: '/auth/google/callback',
        },
        async (_accessToken, _refreshToken, profile) => {
            const email: string = (profile.emails || [])[0].value;
            const name: string = profile.displayName || (profile.name || {}).givenName || '';
            return handleUserLogin(profile.id, email, name);
        }
    )
);
