import { Model, Column, Table, PrimaryKey } from 'sequelize-typescript';

@Table
export class Users extends Model<Users> {
    @PrimaryKey
    @Column
    id!: string;

    @Column
    name!: string;

    @Column
    pass!: string;

    @Column
    email!: string;
}
