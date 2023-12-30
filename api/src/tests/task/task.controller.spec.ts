import { Test, TestingModule } from '@nestjs/testing';

import { TaskController } from '../../task/task.controller';
import { TaskService } from '../../task/task.service';
import { CreateTaskDto } from '../../task/dto/create-task.dto';
import { UpdateTaskDto } from '../../task/dto/update-task.dto';
import { Task } from '../../task/entities/task.entity';
import { TaskRepository } from '../../task/task.repository';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        TaskService,
        {
          provide: TaskRepository,
          useValue: {}, // Provide your mock here
        },
      ],
    }).compile();

    taskController = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const result: Task = {
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
      jest
        .spyOn(taskService, 'create')
        .mockImplementation(() => Promise.resolve(result));

      expect(await taskController.create(new CreateTaskDto())).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result: {
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
      jest
        .spyOn(taskService, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await taskController.findAll({ page: 1, limit: 10 })).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a task', async () => {
      const result: Task = {
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
      jest
        .spyOn(taskService, 'findOneById')
        .mockImplementation(() => Promise.resolve(result));

      expect(await taskController.findOneById('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };
      jest
        .spyOn(taskService, 'update')
        .mockImplementation(() => Promise.resolve(result));

      expect(await taskController.update('1', new UpdateTaskDto())).toBe(
        result,
      );
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };
      jest
        .spyOn(taskService, 'remove')
        .mockImplementation(() => Promise.resolve(result));

      expect(await taskController.remove('1')).toBe(result);
    });
  });
});
