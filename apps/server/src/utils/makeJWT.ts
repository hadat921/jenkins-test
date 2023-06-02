import { UserSignDto } from "../dtos/user";
import jwt from "jsonwebtoken";

export function makeJWT(body: UserSignDto): string {
  const jwtUser = jwt.sign(
    { user: body },
    process.env.SECRET_KEY as jwt.Secret
  );
  return jwtUser;
}
