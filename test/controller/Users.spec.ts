import { PlatformTest } from '@tsed/common';
import UserController from '../../src/controllers/Users';
import faker from 'faker';
import { User } from '../../src/controllers/models';
import { hashSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

describe('UsersService', () => {
    let users: User[] = [...Array(faker.random.number({ min: 1, max: 50 }))].map(() => ({
        id: faker.random.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        pass: faker.internet.password(),
    }));
    let user: User = {
        id: faker.random.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        pass: faker.internet.password(),
    };
    let UserModel: any;
    let service: any;

    beforeEach(async () => {
        PlatformTest.create();

        UserModel = require('../../src/sqlz/models/User').Users;

        service = await PlatformTest.invoke<UserController>(UserController);
    });
    afterEach(PlatformTest.reset);

    it('should get all users from db.', async () => {
        jest.spyOn(UserModel, 'findAll').mockReturnValue(users as any);

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

        expect(await service.login((req as unknown) as Request, res as Response)).toEqual({
            auth: false,
            error: 'Login inválido!',
        });
    });

    it('user not found.', async () => {
        const data = {};

        jest.spyOn(UserModel, 'findByPk').mockReturnValue(<any>data);

        const req = {
            body: {
                email: faker.internet.exampleEmail(),
                pass: faker.internet.password(),
            },
        };
        const res = {};

        service = PlatformTest.get<UserController>(UserController);

        expect(await service.login((req as unknown) as Request, res as Response)).toEqual({
            auth: false,
            error: 'Login inválido!',
        });
    });

    it('wrong password.', async () => {
        const data = {
            ...user,
        };

        jest.spyOn(UserModel, 'findByPk').mockReturnValue(<any>data);

        const req = {
            body: {
                email: user.email,
                pass: faker.internet.password(),
            },
        };
        const res = {};

        service = PlatformTest.get<UserController>(UserController);

        expect(await service.login((req as unknown) as Request, res as Response)).toEqual({
            auth: false,
            error: 'Login inválido!',
        });
    });

    it('no password and user not found.', async () => {
        const data = null;

        jest.spyOn(UserModel, 'findByPk').mockReturnValue(<any>data);

        const req = {
            body: {
                email: user.email,
            },
        };
        const res = {};

        service = PlatformTest.get<UserController>(UserController);

        expect(await service.login((req as unknown) as Request, res as Response)).toEqual({
            auth: false,
            error: 'Login inválido!',
        });
    });

    it('must login with right credentials.', async () => {
        const saltRounds = process.env.SALT || 10;
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

        const data = {
            ...user,
            pass: hashSync(user.pass, saltRounds),
        };

        jest.spyOn(jwt, 'sign').mockReturnValue(<any>token);

        jest.spyOn(UserModel, 'findByPk').mockReturnValue(<any>data);

        const req = {
            body: {
                email: user.email,
                pass: user.pass,
            },
        };
        const res = {};

        service = PlatformTest.get<UserController>(UserController);

        expect(await service.login((req as unknown) as Request, res as Response)).toEqual({
            auth: true,
            token,
        });
    });
});
