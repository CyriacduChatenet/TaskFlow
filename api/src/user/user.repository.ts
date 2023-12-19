import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { APIQuery } from '../types/query.type';

export class UserRepository extends Repository<User> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.create(createUserDto);
    return this.save(user);
  }

  async findAllUsers(
    queries: APIQuery,
  ): Promise<{ page: number; limit: number; count: number; data: User[] }> {
    let { page, limit, createdAt, email } = queries;

    page = page ? +page : 1;
    limit = limit ? +limit : 10;

    const query = this.createQueryBuilder('user').leftJoinAndSelect(
      'user.tasks',
      'tasks',
    );

    if (email) query.andWhere('user.email = :email', { email });

    if (createdAt) query.andWhere('user.createdAt = :createdAt', { createdAt });

    return {
      page,
      limit,
      count: await query.getCount(),
      data: await query
        .skip((page - 1) * limit)
        .take(limit)
        .getMany(),
    };
  }

  async findOneUserById(id: string): Promise<User> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.tasks', 'tasks')
      .where('user.id = :id', { id })
      .getOne();
  }

  async findOneUserByEmail(email: string): Promise<User> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.tasks', 'tasks')
      .where('user.email = :email', { email })
      .getOne();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.update(id, updateUserDto);
  }

  async deleteUser(id: string) {
    return this.softDelete(id);
  }
}
