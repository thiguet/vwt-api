import { PlatformTest, Request, Response } from '@tsed/common';
import UserController from '../../src/controllers/Users';
import { Users as UserModel } from '../../src/sqlz/models/Users';
import { User } from '../../src/controllers/models';
import faker from 'faker';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

describe('UsersService', () => {
    let users: User[];
    let user: User;
    let service: any;

    beforeEach(async () => {
        await PlatformTest.create(...arguments);

        users = [...Array(faker.random.number({ min: 1, max: 50 }))].map(
            () => ({
                id: faker.random.uuid(),
                name: faker.name.findName(),
                email: faker.internet.email(),
                pass: faker.internet.password(),
            })
        );

        user = users[faker.random.number({ min: 0, max: users.length })];
    });

    afterEach(PlatformTest.reset);

    it('should get all users from db.', async () => {
        jest.spyOn(UserModel, 'findAll').mockReturnValue(users as any);
        service = PlatformTest.get<UserController>(UserController);
        expect(await service.findAll()).toEqual(users);
    });

    it('must fail login with random credentials.', async () => {
        jest.spyOn(UserModel, 'findByPk').mockReturnValue(user as any);
        service = PlatformTest.get<UserController>(UserController);

        const req = {
            body: {
                login: faker.internet.email(),
                pass: faker.internet.password(),
            },
        };

        const res = {};

        service = PlatformTest.get<UserController>(UserController);

        expect(await service.login(req as Request, res as Response)).toEqual({
            auth: false,
        });
    });

    it('must login with right credentials.', async () => {
        const saltRounds = 10;
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        service = PlatformTest.get<UserController>(UserController);

        jest.spyOn(jwt, 'sign').mockReturnValue(<any>token);
        jest.spyOn(UserModel, 'findByPk').mockReturnValue(<any>{
            ...user,
            pass: bcrypt.hashSync(user.pass, saltRounds),
        });

        const req = {
            body: {
                login: user.name,
                pass: user.pass,
            },
        };
        const res = {};

        service = PlatformTest.get<UserController>(UserController);

        expect(await service.login(req as Request, res as Response)).toEqual({
            auth: true,
            token,
        });
    });
});
