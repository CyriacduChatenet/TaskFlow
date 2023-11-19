import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.findOneByEmail(createUserDto.email);

      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      return await this.userRepository.createUser(createUserDto);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async findAll() {
    return await this.userRepository.findAllUsers();
  }

  async findOneById(id: string) {
    const user = await this.userRepository.findOneUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOneById(id);
      const userEmail = await this.findOneByEmail(updateUserDto.email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (userEmail && userEmail.id !== id) {
        throw new ConflictException('Email already taken');
      }

      return await this.userRepository.updateUser(id, updateUserDto);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.findOneById(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return await this.userRepository.deleteUser(id);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
