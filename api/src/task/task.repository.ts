import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import { APIQuery } from '../types/query.type';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

export class TaskRepository extends Repository<Task> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.create(createTaskDto);
    return this.save(task);
  }

  async findAllTasks(
    queries: APIQuery,
  ): Promise<{ page: number; limit: number; count: number; data: Task[] }> {
    let { page, limit, title } = queries;

    page = page ? +page : 1;
    limit = limit ? +limit : 10;

    const query = this.createQueryBuilder('task');

    if (title) query.andWhere('task.title = :title', { title });

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

  async findOneTaskById(id: string): Promise<Task> {
    return this.createQueryBuilder('task')
      .where('task.id = :id', { id })
      .getOne();
  }

  async findOneTaskByTitle(title: string): Promise<Task> {
    return this.createQueryBuilder('task')
      .where('task.title = :title', { title })
      .getOne();
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    return this.update(id, updateTaskDto);
  }

  async deleteTask(id: string) {
    return this.softDelete(id);
  }
}
