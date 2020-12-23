import { PlatformTest } from '@tsed/common';
import faker from 'faker';
import { User } from '../../src/controllers/models';
import handleUserLogin from '../../src/passport/handleUserLogin';
import UserModel from '../../src/sqlz/models/User.model';

interface FunctionParams {
    id: string;
    email: string;
    name: string;
}

describe('handleUserLogin Controller', () => {
    let user: User = {
        id: faker.random.uuid(),
        email: faker.internet.email(),
        name: faker.name.findName(),
        pass: faker.internet.password(),
    };
    let params: FunctionParams = {
        id: faker.random.uuid(),
        email: faker.internet.email(),
        name: faker.internet.userName(),
    };

    beforeEach(async () => {
        PlatformTest.create();
    });
    afterEach(PlatformTest.reset);

    it('should get a user.', async () => {
        jest.spyOn(UserModel, 'findOrCreate').mockResolvedValue([user, false]);
        expect(await handleUserLogin(params.id, params.email, params.name)).toEqual(user);
        expect(UserModel.findOrCreate).toHaveBeenCalledWith({
            where: { appId: params.id },
            defaults: { name: params.name, email: params.email },
        });
    });

    it('must fail if a user is not returned', async () => {
        jest.spyOn(UserModel, 'findOrCreate').mockResolvedValue([false, false]);
        expect(await handleUserLogin(params.id, params.email, params.name)).toEqual(false);
        expect(UserModel.findOrCreate).toHaveBeenCalledWith({
            where: { appId: params.id },
            defaults: { name: params.name, email: params.email },
        });
    });
});
