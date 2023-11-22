import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  public async signin(@Body() signinUserInputDTO: SigninDto) {
    return this.authService.signin(signinUserInputDTO);
  }

  @Post('signup')
  public signup(@Body() signupUserInputDTO: CreateUserDto) {
    return this.authService.signup(signupUserInputDTO);
  }
}
