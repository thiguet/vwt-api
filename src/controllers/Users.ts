import { Controller, Get } from '@tsed/common';
import { Users as UserModel } from '../sqlz/models/User';
import { User } from './models';
@Controller('/user')
export default class UsersController {
    @Get()
    async findAll(): Promise<User[]> {
        return (await UserModel.findAll()).map((user: User) => user as User);
    }

    // @Post('/login')
    // async login(req: Request, @Res() res: Response): Promise<LoginResponse> {
    //     const { email, pass } = req.body;

    //     const user = await UserModel.findByPk(email);
    //     const salt = String(process.env.SALT);

    //     let resp: LoginResponse;

    //     if (email === user?.email && pass === bcrypt.hashSync(user?.pass, Number(salt))) {
    //         const id = user?.id;

    //         const token = jwt.sign({ id }, salt, {
    //             expiresIn: 300, // expires in 5min
    //         });

    //         resp = { auth: true, token };

    //         return resp;
    //     }

    //     res.status(500);

    //     return {
    //         auth: false,
    //         error: 'Login inválido!',
    //     };
    // }
}
