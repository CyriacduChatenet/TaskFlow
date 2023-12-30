import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

import { TaskService } from '../../task/task.service';
import { TaskRepository } from '../../task/task.repository';
import { CreateTaskDto } from '../../task/dto/create-task.dto';
import { APIQuery } from '../../types/query.type';
import { Task } from '../../task/entities/task.entity';

describe('TaskService', () => {
  let service: TaskService;
  let repo;

  beforeEach(async () => {
    repo = {
      createTask: jest.fn(),
      findAllTasks: jest.fn(),
      findOneTaskById: jest.fn(),
      findOneTaskByTitle: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, { provide: TaskRepository, useValue: repo }],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repo = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const taskDto: CreateTaskDto = {
        title: '',
      };
      const task: Task = {
        id: '',
        title: '',
        description: '',
        user: {
          id: '',
          email: '',
          password: '',
          username: '',
          roles: '',
          isVerified: false,
          tasks: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          teams: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(repo, 'createTask').mockResolvedValue(task);

      expect(await service.create(taskDto)).toEqual(task);
    });

    it('should throw UnauthorizedException if error occurs', async () => {
      const taskDto: CreateTaskDto = {
        title: '',
      };

      jest.spyOn(repo, 'createTask').mockRejectedValue(new Error());

      await expect(service.create(taskDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
      const query: APIQuery = {};
      const tasks: {
        page: number;
        limit: number;
        count: number;
        data: Task[];
      } = {
        page: 1,
        limit: 10,
        count: 0,
        data: [],
      };

      jest.spyOn(repo, 'findAllTasks').mockResolvedValue(tasks);

      expect(await service.findAll(query)).toEqual(tasks);
    });

    it('should throw NotFoundException if no tasks found', async () => {
      const query: APIQuery = {};

      jest.spyOn(repo, 'findAllTasks').mockResolvedValue(null);

      await expect(service.findAll(query)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if error occurs', async () => {
      const query: APIQuery = {};

      jest.spyOn(repo, 'findAllTasks').mockRejectedValue(new Error());

      await expect(service.findAll(query)).rejects.toThrow(NotFoundException);
    });
  });
});
