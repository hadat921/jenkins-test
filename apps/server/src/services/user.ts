import {
  UserCreateDto,
  UserFindDto,
  UserSignDto,
  UserQueryDto,
} from "../dtos/user";
import { HttpException } from "../exceptions/HttpException";
import { User } from "../models/user";
import { isEmpty, omit } from "lodash";
import { hashPassword } from "./hash";
import jwt from "jsonwebtoken";
import { sequelize } from "../models";
import { IUserQueryOptions } from "../interfaces/user";
import { validateUserQueryParams } from "../utils/validateUserQueryParams";
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
      return omit(newUser.toJSON(), "password");
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

  public makeJWT(body: UserSignDto): string {
    const jwtUser = jwt.sign(
      { user: body },
      process.env.SECRET_KEY as jwt.Secret
    );
    return jwtUser;
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
