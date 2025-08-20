import { allowedNodeEnvironmentFlags } from 'process';
import {
  Column,
  DataType,
  Table,
  Model,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/model/user.model';

interface CategoryAttributes {
  id: number;
  title: string;
}

@Table({ tableName: 'categories' })
export class Category extends Model {
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
  declare title: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'user_id'
  })
  declare userId: number;

  @BelongsTo(() => User, {foreignKey: 'userId', targetKey: 'id'})
  declare user: User
}
