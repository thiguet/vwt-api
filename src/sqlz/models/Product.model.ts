import { Model, Column, Table, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export default class Products extends Model<Products> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @Column
    name!: string;

    @Column
    measures!: string;

    @Column
    qtd!: number;

    @Column
    minQtd!: number;

    @Column
    image?: string;
}
