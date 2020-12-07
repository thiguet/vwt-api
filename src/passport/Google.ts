import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import keys from './config/config';

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: '/auth/google/redirect',
        },
        (accessToken) => {
            console.log('access token: ', accessToken);
        }
    )
);
