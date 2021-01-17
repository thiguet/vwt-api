import { PlatformTest, Req } from '@tsed/common';
import LoginController from '../../src/controllers/Login';
import faker from 'faker';
import { User } from '../../src/controllers/models';
import UserModel from '../../src/sqlz/models/User.model';

jest.mock('passport-facebook');
jest.mock('passport-google-oauth20');
jest.mock('passport-github');
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

    beforeEach(async () => {
        PlatformTest.create();
        service = await PlatformTest.invoke<LoginController>(LoginController);
        req = {
            ...user,
        };

        ((UserModel as unknown) as jest.Mock<any>).mockResolvedValue(user);
    });

    afterEach(PlatformTest.reset);

    it('should call logout user fn.', async () => {
        req = {
            logout: jest.fn(),
        };
        await service.logout(req as Req);
        expect(req.logout).toBeCalled();
    });
    it('should return user when using Google strategy.', async () => {
        expect(await service.loginGoogle(req as Req)).toStrictEqual(user as any);
    });
    it('should return user when using Facebook strategy.', async () => {
        expect(await service.loginFacebook(req as Req)).toStrictEqual(user as any);
    });
    it('should return user when using Github strategy.', async () => {
        expect(await service.loginGithub(req as Req)).toStrictEqual(user as any);
    });

    it('should return user in the callback when using Github app strategy.', async () => {
        expect(await service.callbackGithub(req as Req)).toStrictEqual(user as any);
    });
    it('should return user in the callback when using Facebook app strategy.', async () => {
        expect(await service.callbackFacebook(req as Req)).toStrictEqual(user as any);
    });
    it('should return user in the callback when using Google app strategy.', async () => {
        expect(await service.callbackGoogle(req as Req)).toStrictEqual(user as any);
    });
});
