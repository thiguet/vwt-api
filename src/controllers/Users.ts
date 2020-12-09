import { Controller, Get, Post, Request } from '@tsed/common';
import { Authorize } from '@tsed/passport';
import { Description, Returns, Summary } from '@tsed/schema';
import UserModel from '../sqlz/models/User.model';
import { LoginResponse, User } from './models';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
@Controller('/user')
export default class UsersController {
    @Authorize()
    @Get('s')
    @Summary('Returns all saved users')
    @Description('Returns all saved users')
    @(Returns(200).Description('All Users'))
    @(Returns(401).Description('Unauthorized'))
    @(Returns(404).Description('Not found'))
    async findAll(): Promise<User[]> {
        return (await UserModel.findAll()).map((user: User) => user as User);
    }

    @Summary('Log in using JWT')
    @Description('Log the user using a JWT')
    @(Returns(200).Description('Auth Ok!'))
    @(Returns(404).Description('Not found'))
    @Post('/login')
    async login(req: Request): Promise<LoginResponse> {
        const { email, pass } = req.body;
        const user = await UserModel.findByPk(email);
        if (user) {
            const salt = String(process.env.SALT || 10);
            const id = user.id;
            if (email === user.email && bcrypt.compareSync(pass, `${user.pass}`)) {
                const token = jwt.sign({ id }, salt, {
                    expiresIn: 300,
                });
                return { auth: true, token };
            }
        }
        return {
            auth: false,
            error: 'Login inválido!',
        };
    }
}
