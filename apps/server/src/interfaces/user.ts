import {
  Model,
  Optional,
} from "sequelize";
export interface IUserAttributes {
  id?: number,
  username: string,
  password: string,
  email?: number
}

export interface IUserCreationAttributes extends Optional<IUserAttributes, "id"> { }

export interface UserInstance extends Model<IUserAttributes, IUserCreationAttributes>,
  IUserAttributes {
}
