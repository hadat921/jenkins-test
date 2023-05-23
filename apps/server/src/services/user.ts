import { UserCreateDto, UserFindDto, UserSignDto } from "../dtos/user";
import { HttpException } from "../exceptions/HttpException";
import { User } from "../models/user";
import { isEmpty } from "lodash";
import { hashPassword } from "./hash";
import jwt from "jsonwebtoken";
import { sequelize } from "../models";

export default class UserService {

  public async createUser(userData: UserCreateDto) {
    if (isEmpty(userData)) {
      throw new HttpException(400, "Not enough data");
    }

    const foundUserByUsername = await User.findOne({ where: { username: userData.username } });
    if (!isEmpty(foundUserByUsername)) {
      throw new HttpException(409, "Username has existed");
    }
    const trans = await sequelize.transaction();
    try {
     const newUser = await User.create({
        username: userData.username,
        password: userData.password,

      }, { transaction: trans });
      await newUser.save();
      await trans.commit();
      return newUser;
    } catch (error) {
      await trans.rollback();
      throw new HttpException(409, "Create user failed");
    }
  }

  public async findUserByUserData(userData: UserFindDto): Promise<UserSignDto> {
    const foundUser = await User.findOne({ where: { username: userData.username, password: hashPassword(userData.password) } });
    if (isEmpty(foundUser)) {
      throw new HttpException(409, "User not exits");
    }
    const body: UserSignDto = {
      username: foundUser?.getDataValue("username") as string
    }
    return body;
  }

  public makeJWT(body: UserSignDto): string {
    const jwtUser = jwt.sign({ user: body }, process.env.SECRET_KEY as jwt.Secret);
    return jwtUser
  }
  public async findAllUser(): Promise<{userList : UserFindDto[]}>{
   const userList = await User.findAll({
    attributes : [
      "username",
      "id",
      "email"
    ]
   })
   return {userList}
  }

}
