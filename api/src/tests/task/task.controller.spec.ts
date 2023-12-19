import { Test, TestingModule } from '@nestjs/testing';

import { TaskController } from '../../task/task.controller';
import { TaskService } from '../../task/task.service';
import { CreateTaskDto } from '../../task/dto/create-task.dto';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            create: jest.fn().mockResolvedValue('mockTask'),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a task', async () => {
      const dto: CreateTaskDto = {
        title: 'mockTitle',
        description: 'mockDescription',
      };
      expect(await controller.create(dto)).toBe('mockTask');
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  // Add more tests for other methods here
});
