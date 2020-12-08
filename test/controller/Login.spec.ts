import { PlatformTest, Req } from '@tsed/common';
import LoginController from '../../src/controllers/Login';
import faker from 'faker';
import { User } from '../../src/controllers/models';

jest.mock('passport-facebook');
jest.mock('passport-google-oauth20');
jest.mock('passport-instagram');
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

    beforeEach(async () => {
        PlatformTest.create();
        service = await PlatformTest.invoke<LoginController>(LoginController);
    });

    afterEach(PlatformTest.reset);

    it('should return user when using InstagramStrategy.', async () => {
        req = {
            user,
        };

        const result = await service.loginInstagram(req as Req);

        expect(result).toEqual({ user });
    });
    it('should return user in the callback when using InstagramStrategy.', async () => {
        req = {
            user,
        };

        const result = await service.callbackInstagram(req as Req);

        expect(result).toEqual({ user });
    });

    it('should return user when using GoogleStrategy.', async () => {
        req = {
            user,
        };

        const result = await service.loginGoogle(req as Req);

        expect(result).toEqual({ user });
    });
    it('should return user in the callback when using GoogleStrategy.', async () => {
        req = {
            user,
        };

        const result = await service.callbackGoogle(req as Req);

        expect(result).toEqual({ user });
    });

    it('should return user when using FacebookStrategy.', async () => {
        req = {
            user,
        };

        const result = await service.loginFacebook(req as Req);

        expect(result).toEqual({ user });
    });
    it('should return user in the callback when using FacebookStrategy.', async () => {
        req = {
            user,
        };

        const result = await service.callbackFacebook(req as Req);

        expect(result).toEqual({ user });
    });
});
