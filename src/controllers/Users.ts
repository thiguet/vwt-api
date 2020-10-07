import { Controller, Get } from '@tsed/common';

@Controller('/user')
export class Users {
    @Get()
    findAll(): any {
        return db.models.USERS.findAll();
    }
}
