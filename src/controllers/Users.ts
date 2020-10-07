import { Controller, Get } from '@tsed/common';
import { Users } from '../sqlz/models/Users';
import { User } from './models';

@Controller('/user')
export default class UsersController {
    @Get()
    async findAll(): Promise<User[]> {
        return (await Users.findAll()).map(user => user as User);
    }
}
