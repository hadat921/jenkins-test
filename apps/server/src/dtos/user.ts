import { IsString, IsNumber } from "class-validator";

export class UserCreateDto {
  @IsString()
  username!: string;

  @IsString()
  password!: string;

  @IsString()
  walletAddress!: string;
}

export class UserFindDto {
  @IsString()
  username!: string;
  @IsString()
  password!: string;
}

export class UserSignDto {
  @IsString()
  username!: string;
}

export class UserQueryDto extends UserFindDto {
  @IsNumber()
  page!: number;

  @IsNumber()
  limit!: number;
}
