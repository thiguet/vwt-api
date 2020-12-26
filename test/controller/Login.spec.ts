import { PlatformTest, Req, Res } from '@tsed/common';
import LoginController from '../../src/controllers/Login';
import faker from 'faker';
import { User } from '../../src/controllers/models';

jest.mock('passport-facebook');
jest.mock('passport-google-oauth20');
jest.mock('passport-github');
jest.mock('../../src/passport/handleUserLogin');
jest.mock('../../src/sqlz/models/User.model');

describe('Login Controller', () => {
    let user: User = {
        id: faker.random.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        pass: faker.internet.password(),
    };
    let service: LoginController;
    let req: any;
    let res: any;

    beforeEach(async () => {
        PlatformTest.create();
        service = await PlatformTest.invoke<LoginController>(LoginController);
        req = {
            user,
        };

        res = {
            redirect: jest.fn(),
        };
    });

    afterEach(PlatformTest.reset);

    it('should return user when using any app strategy.', async () => {
        await service.loginApp(req as Req, res as Res);
        expect(res.redirect).toBeCalled();
    });
    it('fails when no user is returned.', async () => {
        req = false;
        await service.loginApp(req as Req, res as Res);
        expect(res.redirect).toBeCalled();
    });

    it('should return user in the callback when using any app strategy.', async () => {
        await service.appCallback(req as Req, res as Res);
        expect(res.redirect).toBeCalled();
    });
    it('fails when no user is returned.', async () => {
        req = false;
        await service.appCallback(req as Req, res as Res);
        expect(res.redirect).toBeCalled();
    });
});
