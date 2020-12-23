import passport from 'passport';
import { Strategy } from 'passport-twitter';
import handleUserLogin from './handleUserLogin';

passport.use(
    new Strategy(
        {
            consumerKey: `${process.env.TWITTER_CONSUMER_KEY}`,
            consumerSecret: `${process.env.TWITTER_CONSUMER_SECRET}`,
            callbackURL: `${process.env.REDIRECT_BASE_URL}/auth/twitter/callback`,
            passReqToCallback: true,
            includeEmail: true,
        },
        async (_req, _token, _tokenSecret, profile, done) => {
            const email: string = (profile.emails || [])[0].value;
            const name: string = profile.displayName || (profile.name || {}).givenName || '';
            const user = await handleUserLogin(profile.id, email, name);
            return done(undefined, user);
        }
    )
);
