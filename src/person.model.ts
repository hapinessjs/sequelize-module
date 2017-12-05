// import { Table, Column, Model } from 'sequelize-typescript';
import * as Sequelize from 'sequelize';
import { TableModel } from './module/interfaces';

@TableModel({
  name: 'Person',
  model: {
    title: Sequelize.STRING,
    description: Sequelize.TEXT
  }
})
export class PersonModel { }

// @TableModel({})
// @Table({
//   tableName: 'Persons',
//   modelName: 'Person'
// })
// export class PersonModel extends Model<PersonModel> {
//   @Column
//   name: string;

//   @Column
//   birthday: Date;
// }
