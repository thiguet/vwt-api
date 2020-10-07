import { PlatformTest } from '@tsed/common';
import { Users } from '../../src/controllers/Users';
import UserSqlz from '../../src/sqlz/models/User';
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
        it('should call all users from db.', () => {
            jest.spyOn(UserSqlz, 'findAll').mockReturnValue(users as any);
            const service = PlatformTest.get<Users>(Users);
            expect(service.findAll()).toEqual(users);
        });
    });
});
