import { Model, Column, Table, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export default class Users extends Model<Users> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @Column
    name!: string;

    @Column
    pass!: string;

    @Column
    email!: string;

    @Column
    appId!: string;
}
