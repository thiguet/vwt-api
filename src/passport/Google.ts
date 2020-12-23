import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import handleUserLogin from './handleUserLogin';

passport.use(
    new Strategy(
        {
            clientID: `${process.env.GOOGLE_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
            callbackURL: `${process.env.REDIRECT_BASE_URL}/auth/google/callback`,
            passReqToCallback: true,
        },
        async (_req, _accessToken, _refreshToken, profile, done) => {
            const email: string = (profile.emails || [])[0].value;
            const name: string = profile.displayName || (profile.name || {}).givenName || '';
            const user = await handleUserLogin(profile.id, email, name);
            return done(undefined, user);
        }
    )
);
