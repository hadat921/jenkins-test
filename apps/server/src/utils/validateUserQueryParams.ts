import { UserQueryDto } from "../dtos/user";
import { HttpException } from "../exceptions/HttpException";
import _ from "lodash";

export function validateUserQueryParams(queryParams: UserQueryDto) {
  if (_.isNaN(Number(queryParams.page)) || Number(queryParams.page) < 1) {
    throw new HttpException(400, "page must be greater than or equal to 1");
  }

  if (_.isNaN(Number(queryParams.limit)) || Number(queryParams.limit) < 1) {
    throw new HttpException(400, "limit must be greater than or equal to 1");
  }
}
