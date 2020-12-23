import passport from 'passport';
import { Strategy } from 'passport-facebook';
import handleUserLogin from './handleUserLogin';

passport.use(
    new Strategy(
        {
            clientID: `${process.env.FACEBOOK_CLIENT_ID}`,
            clientSecret: `${process.env.FACEBOOK_CLIENT_SECRET}`,
            callbackURL: `${process.env.REDIRECT_BASE_URL}/auth/facebook/callback`,
        },
        async (_accessToken, _refreshToken, profile, done) => {
            const email: string = (profile.emails || [])[0].value;
            const name: string = profile.displayName || (profile.name || {}).givenName || '';
            const user = await handleUserLogin(profile.id, email, name);
            return done(undefined, user);
        }
    )
);
