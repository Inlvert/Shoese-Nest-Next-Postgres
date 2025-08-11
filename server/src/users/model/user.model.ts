import { Column, DataType, Table, Model } from 'sequelize-typescript';

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  birthday: Date;
  email: string;
  password: string;
  avatar: string;
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
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  birthday: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  avatar: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;
}
