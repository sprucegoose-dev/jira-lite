import {
  Column,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
})
export default class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  username: string;

  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  email: string;

  @Column
  password: string;
}
