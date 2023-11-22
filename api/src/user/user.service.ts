import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { APIQuery } from '../types/query.type';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.findOneByEmail(createUserDto.email);

      if (user) {
        throw new ConflictException('Email already taken');
      }

      const newUser = await this.userRepository.createUser(createUserDto);
      return newUser;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async findAll(queries: APIQuery) {
    try {
      return await this.userRepository.findAllUsers(queries);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async findOneById(id: string) {
    try {
      return await this.userRepository.findOneUserById(id);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.userRepository.findOneUserByEmail(email);
    } catch (err) {
      throw new NotFoundException(err);
    }
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
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.findOneById(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return await this.userRepository.deleteUser(id);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
