import { Test, TestingModule } from '@nestjs/testing';

import { APIQuery } from '../../types/query.type';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UpdateUserDto } from '../../user/dto/update-user.dto';
import { User } from '../../user/entities/user.entity';
import { UserController } from '../../user/user.controller';
import { UserService } from '../../user/user.service';
import { UserRepository } from '../../user/user.repository';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {}, // Provide your mock here
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should return the result of userService.create', async () => {
      const dto: CreateUserDto = {
        email: 'test3@test.com',
        password: 'root',
        username: 'test3',
      };
      const result: User = {
        createdAt: new Date('2023-11-22T08:23:43.812Z'),
        updatedAt: new Date('2023-11-22T08:23:43.812Z'),
        deletedAt: null,
        id: 'c9061a09-d77a-4c55-8fde-f173832e5e79',
        email: 'test1@test.com',
        password: 'root',
        username: 'test1',
        roles: 'user',
        isVerified: false,
      };
      jest
        .spyOn(userService, 'create')
        .mockImplementation(() => Promise.resolve(result));

      expect(await userController.create(dto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return the result of userService.findAll', async () => {
      const query: APIQuery = {};
      const result: {
        page: number;
        limit: number;
        count: number;
        data: User[];
      } = {
        page: 1,
        limit: 20,
        count: 2,
        data: [
          {
            createdAt: new Date('2023-11-22T08:23:43.812Z'),
            updatedAt: new Date('2023-11-22T08:23:43.812Z'),
            deletedAt: null,
            id: 'c9061a09-d77a-4c55-8fde-f173832e5e79',
            email: 'test1@test.com',
            password: 'root',
            username: 'test1',
            roles: 'user',
            isVerified: false,
          },
          {
            createdAt: new Date('2023-11-22T08:23:50.680Z'),
            updatedAt: new Date('2023-11-22T08:23:50.680Z'),
            deletedAt: null,
            id: 'f841acad-d4d7-40bc-a388-ea2cfaf3c51e',
            email: 'test2@test.com',
            password: 'root',
            username: 'test2',
            roles: 'user',
            isVerified: false,
          },
        ],
      };
      jest
        .spyOn(userService, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await userController.findAll(query)).toBe(result);
    });
  });

  describe('findOneById', () => {
    it('should return the result of userService.findOneById', async () => {
      const id = 'f841acad-d4d7-40bc-a388-ea2cfaf3c51e';
      const result = {
        createdAt: new Date('2023-11-22T08:23:50.680Z'),
        updatedAt: new Date('2023-11-22T08:23:50.680Z'),
        deletedAt: null,
        id: 'f841acad-d4d7-40bc-a388-ea2cfaf3c51e',
        email: 'test2@test.com',
        password: 'root',
        username: 'test2',
        roles: 'user',
        isVerified: false,
      };
      jest
        .spyOn(userService, 'findOneById')
        .mockImplementation(() => Promise.resolve(result));

      expect(await userController.findOneById(id)).toBe(result);
    });
  });

  describe('update', () => {
    it('should return the result of userService.update', async () => {
      const id = 'f841acad-d4d7-40bc-a388-ea2cfaf3c51e';
      const dto: UpdateUserDto = {
        email: 'test2@test.com',
        password: 'test2',
        username: 'root',
      };
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };
      jest
        .spyOn(userService, 'update')
        .mockImplementation(() => Promise.resolve(result));

      expect(await userController.update(id, dto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should return the result of userService.delete', async () => {
      const id = 'f841acad-d4d7-40bc-a388-ea2cfaf3c51e';
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };
      jest
        .spyOn(userService, 'remove')
        .mockImplementation(() => Promise.resolve(result));

      expect(await userController.remove(id)).toBe(result);
    });
  });
});
