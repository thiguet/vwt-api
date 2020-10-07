import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 5433,
    define: {
        timestamps: true,
    },
    models: [__dirname + '/models'],
});
