import { PlatformTest } from '@tsed/common';
import UserController from '../../src/controllers/Users';
import { Users as UserModel } from '../../src/sqlz/models/Users';
import { User } from '../../src/controllers/models';
import faker from 'faker';

const users: User[] = [
    {
        id: faker.random.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        pass: faker.internet.password(),
    },
];

describe('UsersService', () => {
    beforeEach(PlatformTest.create);
    afterEach(PlatformTest.reset);
    describe('findAll()', () => {
        it('should call all users from db.', async () => {
            jest.spyOn(UserModel, 'findAll').mockReturnValue(users as any);
            const service = PlatformTest.get<UserController>(UserController);
            expect(await service.findAll()).toEqual(users);
        });
    });
});
