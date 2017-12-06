import { Model, Column, Table } from 'sequelize-typescript';
import { TableModel } from '../../module/interfaces';

@TableModel({
  model: Person
})
@Table
export class Person extends Model<Person> {
  @Column
  name: string;
}
