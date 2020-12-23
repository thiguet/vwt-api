import UserModel from '../sqlz/models/User.model';

export default async (id: string, email: string, name: string) => {
    const [user] = await UserModel.findOrCreate({ where: { appId: id }, defaults: { name, email } });
    return user;
};
