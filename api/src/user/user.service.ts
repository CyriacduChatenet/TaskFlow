import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { APIQuery } from '../types/query.type';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.findUserByEmail(createUserDto.email);

      if (existingUser) {
        throw new ConflictException('Email already taken');
      }

      return this.userRepository.createUser(createUserDto);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async findAll(queries: APIQuery) {
    try {
      return this.userRepository.findAllUsers(queries);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findUserById(id: string) {
    try {
      const user = await this.userRepository.findOneUserById(id);

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneUserByEmail(email);

      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }

      return user;
    } catch (error) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findUserById(id);
      const userEmail = await this.findUserByEmail(updateUserDto.email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (userEmail && userEmail.id !== id) {
        throw new ConflictException('Email already taken');
      }

      return this.userRepository.updateUser(id, updateUserDto);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.findUserById(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return this.userRepository.deleteUser(id);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
