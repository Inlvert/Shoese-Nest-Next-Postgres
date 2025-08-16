import { Column, DataType, Table, Model } from 'sequelize-typescript';

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  birthday: Date;
  email: string;
  password: string;
  avatar?: string;
  role: string;
}

interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

@Table({ tableName: 'users' })
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare lastName: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare birthday: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
  })
  declare avatar?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare role: string;
}
