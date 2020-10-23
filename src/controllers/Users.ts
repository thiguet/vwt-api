import { Controller, Get, Post, Request, Response, Res } from '@tsed/common';
import { Users } from '../sqlz/models/Users';
import { User, LoginResponse } from './models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
@Controller('/user')
export default class UsersController {
    @Get()
    async findAll(): Promise<User[]> {
        return (await Users.findAll()).map(user => user as User);
    }

    @Post('/login')
    async login(req: Request, @Res() res: Response): Promise<LoginResponse> {
        const { email, pass } = req.body;

        const user = await Users.findByPk(email);
        const salt = String(process.env.SALT);

        let resp: LoginResponse;

        if (
            email === user?.email &&
            pass === bcrypt.hashSync(user?.pass, Number(salt))
        ) {
            const id = user?.id;

            const token = jwt.sign({ id }, salt, {
                expiresIn: 300, // expires in 5min
            });

            resp = { auth: true, token };

            return resp;
        }

        res.status(500);

        return {
            auth: false,
            error: 'Login inválido!',
        };
    }
}
