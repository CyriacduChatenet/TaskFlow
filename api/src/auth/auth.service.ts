import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { SigninDto } from './dto/signin.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  public async signin(user: SigninDto) {
    try {
      const findUser = await this.userService.findOneByEmail(user.email);

      if (!findUser) {
        throw new UnauthorizedException('User not found');
      }

      const payload = {
        email: findUser.email,
        id: findUser.id,
        roles: findUser.roles,
      };

      return {
        accessToken: this.jwtService.sign(payload),
      };
    } catch (err) {
      throw new UnauthorizedException('Unauthorized to signin', err.message);
    }
  }

  public async signup(signupUserInputDTO: CreateUserDto) {
    try {
      const userInDB = await this.userService.findOneByEmail(
        signupUserInputDTO.email,
      );

      if (userInDB) {
        throw new UnauthorizedException('User already exists');
      }

      const password = await bcrypt.hash(signupUserInputDTO.password, 12); // Increased hashing rounds

      const user = await this.userService.create({
        ...signupUserInputDTO,
        password,
      });

      return {
        user,
      };
    } catch (err) {
      throw new UnauthorizedException('Unauthorized to signup', err.message);
    }
  }
}
