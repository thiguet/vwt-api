import passport from 'passport';
import { Strategy } from 'passport-instagram';
import handleUserLogin from './handleUserLogin';

passport.use(
    new Strategy(
        {
            clientID: `${process.env.INSTAGRAM_CLIENT_ID}`,
            clientSecret: `${process.env.INSTAGRAM_CLIENT_SECRET}`,
            callbackURL: '/auth/instagram/callback',
        },
        (_accessToken, _refreshToken, profile) => {
            const email: string = (profile.emails || [])[0].value;
            const name: string = profile.displayName || profile.name.givenName || '';
            return handleUserLogin(profile.id, email, name);
        }
    )
);
