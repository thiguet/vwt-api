import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import database from '../../database';

class User extends Model {
    public id!: number;

    public name!: string;

    public pass!: string;

    public passHash!: string;

    public email!: string;

    public async checkPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.pass);
    }
}

User.init(
    {
        passHash: Sequelize.VIRTUAL,
        pass: Sequelize.VIRTUAL,
        username: Sequelize.STRING,
        email: Sequelize.STRING,
    },
    {
        sequelize: database.connection,
        freezeTableName: true,
    }
);

User.addHook(
    'beforeSave',
    async (user: User): Promise<void> => {
        if (user.pass) {
            user.passHash = await bcrypt.hash(user.pass, 8);
        }
    }
);

export default User;
