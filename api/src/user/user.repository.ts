import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export class UserRepository extends Repository<User> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.create(createUserDto);
    return this.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.createQueryBuilder('user').getMany();
  }

  async findOneUserById(id: string): Promise<User> {
    return this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  async findOneUserByEmail(email: string): Promise<User> {
    return this.createQueryBuilder('user')
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
