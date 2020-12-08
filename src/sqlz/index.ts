import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 15432,
    models: [__dirname + '/**/*.model.ts'],
});
