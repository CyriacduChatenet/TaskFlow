import { IsString } from 'class-validator';

export class SigninDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
