import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { APIQuery } from '../types/query.type';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      return await this.taskRepository.createTask(createTaskDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll(queries: APIQuery) {
    try {
      const tasks = await this.taskRepository.findAllTasks(queries);

      if (!tasks) {
        throw new NotFoundException('Tasks not found');
      }

      return tasks;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOneById(id: string) {
    try {
      const task = await this.taskRepository.findOneTaskById(id);

      if (!task) {
        throw new NotFoundException(`Task  with id ${id} not found`);
      }

      return task;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOneByTitle(title: string) {
    try {
      const task = await this.taskRepository.findOneTaskByTitle(title);

      if (!task) {
        throw new NotFoundException(`Task  with title ${title} not found`);
      }

      return task;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.taskRepository.findOneTaskById(id);

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      return await this.taskRepository.updateTask(id, updateTaskDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async remove(id: string) {
    try {
      const task = await this.taskRepository.findOneTaskById(id);

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      return await this.taskRepository.deleteTask(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
