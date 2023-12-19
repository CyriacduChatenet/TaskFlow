import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

import { UserService } from '../../user/user.service';
import { UserRepository } from '../../user/user.repository';

describe('UserService', () => {
  let service: UserService;
  let mockUserRepository;

  beforeEach(async () => {
    mockUserRepository = {
      createUser: jest.fn(),
      findAllUsers: jest.fn(),
      findOneUserByEmail: jest.fn(),
      findOneUserById: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find user by email', async () => {
    mockUserRepository.findOneUserByEmail.mockResolvedValue('user');
    expect(await service.findUserByEmail('test@test.com')).toBe('user');
  });

  it('should throw NotFoundException when user not found by email', async () => {
    mockUserRepository.findOneUserByEmail.mockRejectedValueOnce(null);
    await expect(service.findUserByEmail('test@test.com')).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should update user', async () => {
    mockUserRepository.findOneUserByEmail.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
    });
    mockUserRepository.updateUser.mockRejectedValue('error');

    await expect(
      service.update('1', {
        email: 'test2@test.com',
        password: 'root',
        username: 'test2',
      }),
    ).rejects.toThrowError(UnauthorizedException);
  });

  it('should throw ConflictException when email already taken', async () => {
    mockUserRepository.findOneUserById.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
    });
    mockUserRepository.findOneUserByEmail.mockResolvedValue({
      id: '2',
      email: 'test2@test.com',
    });
    expect(
      service.update('1', {
        email: 'test2@test.com',
        password: 'root',
        username: 'test2',
        roles: 'user',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException when error occurs in update', async () => {
    mockUserRepository.findOneUserById.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
    });
    mockUserRepository.findOneUserByEmail.mockResolvedValue(null);
    mockUserRepository.updateUser.mockRejectedValue(
      new UnauthorizedException('error'),
    );

    await expect(
      service.update('1', {
        email: 'test2@test.com',
        password: 'root',
        username: 'test2',
        roles: 'user',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should create user', async () => {
    mockUserRepository.findOneUserByEmail.mockResolvedValue(null);
    mockUserRepository.createUser.mockResolvedValue('createdUser');

    const createUserDto = {
      email: 'test@test.com',
      password: 'root',
      username: 'test',
      roles: 'user',
    };

    expect(await service.create(createUserDto)).toBe('createdUser');
  });

  it('should throw ConflictException when creating a user with existing email', async () => {
    mockUserRepository.findOneUserByEmail.mockResolvedValue('existingUser');

    const createUserDto = {
      email: 'test@test.com',
      password: 'root',
      username: 'test',
      roles: 'user',
    };

    await expect(service.create(createUserDto)).rejects.toThrowError(
      UnauthorizedException,
    );
  });

  it('should find all users', async () => {
    mockUserRepository.findAllUsers.mockResolvedValue(['user1', 'user2']);

    expect(await service.findAll({ page: 1, limit: 10 })).toEqual([
      'user1',
      'user2',
    ]);
  });

  it('should find user by ID', async () => {
    mockUserRepository.findOneUserById.mockResolvedValue('userById');

    expect(await service.findUserById('1')).toBe('userById');
  });

  it('should remove user by ID', async () => {
    mockUserRepository.findOneUserById.mockResolvedValue({
      id: 'userToRemoveId',
      email: 'test@test.com',
      password: 'root',
      username: 'test',
      roles: 'user',
    });
    mockUserRepository.deleteUser.mockResolvedValue('removedUser');

    expect(await service.remove('userToRemoveId')).toBe('removedUser');
  });
});
