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
    @Get()
    @Summary('Summary of this route')
    @Description('Return a calendar from the given id')
    @(Returns(404).Description('Not found'))
    async findAll(): Promise<User[]> {
        return (await UserModel.findAll()).map((user: User) => user as User);
    }

    @Post('/login')
    async login(req: Request): Promise<LoginResponse> {
        const { email, pass } = req.body;
        let user = await UserModel.findByPk(email);
        if (user) {
            const salt = String(process.env.SALT || 10);
            const id = user.id;
            if (email === user.email && bcrypt.compareSync(pass, user.pass + '')) {
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
