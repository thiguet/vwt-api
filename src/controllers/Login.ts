import { Controller, Get } from '@tsed/common';
// import { Users as UserModel } from '../sqlz/models/User';
import { User } from './models';
import passport from 'passport';

@Controller('/auth')
export default class LoginController {
    @Get('/google')
    async loginGoogle(): Promise<User[]> {
        return passport.authenticate('google', {
            scope: ['profile', 'email'],
        });
    }
}
