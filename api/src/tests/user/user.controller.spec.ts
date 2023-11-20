import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from '../../user/user.controller';
import { UserService } from '../../user/user.service';
import { UserRepository } from '../../user/user.repository';
import { User } from '../../user/entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: UserRepository, useValue: {} }, // provide a mock UserRepository
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const mockUser: User = {
      email: 'test@test.com',
      password: 'root',
      id: 'iugftyhujil',
      username: 'test1',
      roles: 'user',
      isVerified: false,
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
    };

    jest.spyOn(service, 'create').mockResolvedValue(mockUser);

    expect(await controller.create(mockUser)).toBe(mockUser);
    expect(service.create).toHaveBeenCalledWith(mockUser);
    expect(service.create).toHaveBeenCalledTimes(1);
  });

  it('should find all users', async () => {
    const mockUser: User = {
      email: 'test@test.com',
      password: 'root',
      id: 'iugftyhujil',
      username: 'test1',
      roles: 'user',
      isVerified: false,
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
    };

    const mockUsers: User[] = [mockUser];

    jest.spyOn(service, 'findAll').mockResolvedValue(mockUsers);

    expect(await controller.findAll()).toBe(mockUsers);
    expect(service.findAll).toHaveBeenCalledWith();
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find one user by id', async () => {
    const mockUser: User = {
      email: 'test@test.com',
      password: 'root',
      id: 'iugftyhujil',
      username: 'test1',
      roles: 'user',
      isVerified: false,
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
    };

    jest.spyOn(service, 'findOneById').mockResolvedValue(mockUser);

    expect(await controller.findOneById('')).toBe(mockUser);
    expect(service.findOneById).toHaveBeenCalledWith('');
    expect(service.findOneById).toHaveBeenCalledTimes(1);
  });

  it('should find one user by email', async () => {
    const mockUser: User = {
      email: 'test@test.com',
      password: 'root',
      id: 'iugftyhujil',
      username: 'test1',
      roles: 'user',
      isVerified: false,
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
    };

    jest.spyOn(service, 'findOneByEmail').mockResolvedValue(mockUser);

    expect(await controller.findOneByEmail('')).toBe(mockUser);
    expect(service.findOneByEmail).toHaveBeenCalledWith('');
    expect(service.findOneByEmail).toHaveBeenCalledTimes(1);
  });

  // Add more tests here for each method in your controller
});
