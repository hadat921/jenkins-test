import {
  UserCreateDto,
  UserFindDto,
  UserSignDto,
  UserQueryDto,
} from "../dtos/user";
import { HttpException } from "../exceptions/HttpException";
import { User } from "../models/user";
import { omit } from "../utils/responseJson";
import { hashPassword } from "./hash";
import { sequelize } from "../models";
import { IUserQueryOptions } from "../interfaces/user";
import { isEmpty } from "../utils/checkType";
export default class UserService {
  public async createUser(userData: UserCreateDto) {
    if (isEmpty(userData)) {
      throw new HttpException(400, "Not enough data");
    }
    const foundUserByUsername = await User.findOne({
      where: { username: userData.username },
      raw: true,
    });
    if (!isEmpty(foundUserByUsername)) {
      throw new HttpException(409, "Username has existed");
    }
    const trans = await sequelize.transaction();
    try {
      const newUser = await User.create(
        {
          username: userData.username,
          password: userData.password,
        },
        { transaction: trans }
      );
      await newUser.save();
      await trans.commit();
      return omit(newUser, ["password"]);
    } catch (error) {
      await trans.rollback();
      throw new HttpException(409, "Create user failed");
    }
  }

  public async findUserByUserData(userData: UserFindDto): Promise<UserSignDto> {
    const foundUser = await User.findOne({
      where: {
        username: userData.username,
        password: hashPassword(userData.password),
      },
    });
    if (isEmpty(foundUser)) {
      throw new HttpException(404, "User not exits");
    }
    const body: UserSignDto = {
      username: foundUser?.getDataValue("username") as string,
    };
    return body;
  }

  public async findAllUser(
    queryParams: UserQueryDto
  ): Promise<{ userList: UserFindDto[] }> {
    const queryOptions: IUserQueryOptions = {
      where: {},
      attributes: ["username", "id", "email"],
      limit: queryParams.limit || 10,
      offset: (queryParams.page - 1) * queryParams.limit || 1,
    };
    const userList = await User.findAll(queryOptions);
    return { userList };
  }
}
