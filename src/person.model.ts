import {Table, Column, Model} from 'sequelize-typescript';
import { TableModel } from './module/interfaces/table-decorator';

@TableModel({})
@Table
export class PersonModel extends Model<PersonModel> {
  @Column
  name: string;

  @Column
  birthday: Date;
}

// export class PersonModel {

//   getModel() {
//     return Person;
//   }

// }
