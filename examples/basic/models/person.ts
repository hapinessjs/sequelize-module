import { Model, Column, Table } from 'sequelize-typescript';
import { TableModel } from '../../../src/module/interfaces';

@TableModel()
@Table
export class Person extends Model<Person> {
  @Column
  name: string;
}
