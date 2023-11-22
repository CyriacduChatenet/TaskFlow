import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOneByEmail: jest.fn(),
          }, // provide a mock implementation of UserService or an actual instance
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          }, // provide a mock implementation of JwtService or an actual instance
        },
        {
          provide: 'bcrypt',
          useValue: {
            compare: jest.fn(),
          }, // provide a mock implementation of bcrypt or an actual instance
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return a user when the email and password match', async () => {
      const user: User = {
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

      const bcryptCompareSpy = jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(user);
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(user);

      const result = await service.validateUser(user.email, user.password);
      const expectedUser = { ...user };
      delete expectedUser.password;
      expect(result).toEqual(expectedUser);
      expect(bcryptCompareSpy).toHaveBeenCalledWith(
        user.password,
        user.password,
      );
    });

    it('should throw an error when no user is found', async () => {
      const user: User = {
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

      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(null);

      await expect(
        service.validateUser(user.email, user.password),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw an error when the password does not match', async () => {
      const user: User = {
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
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(user);

      await expect(
        service.validateUser(user.email, user.password),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('signin', () => {
    it('should throw an error if no user is found', async () => {
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(null);
      await expect(
        service.signin({ email: 'test@test.com', password: 'password' }),
      ).rejects.toThrow();
    });

    it('should return a jwt if valid user is provided', async () => {
      const user: User = {
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

      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(user);
      jest
        .spyOn(jwtService, 'sign')
        .mockReturnValue(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwiaWQiOiJjOTA2MWEwOS1kNzdhLTRjNTUtOGZkZS1mMTczODMyZTVlNzkiLCJyb2xlcyI6InVzZXIiLCJpYXQiOjE3MDA2NDU0NDgsImV4cCI6MTcwMTI1MDI0OH0.OVSw8ZTRIfW0OpNoY1LEQSS6oaeGYX6H3cd6he9gb9s',
        );
      const result = await service.signin({
        email: 'test@test.com',
        password: 'password',
      });
      expect(result).toEqual({
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwiaWQiOiJjOTA2MWEwOS1kNzdhLTRjNTUtOGZkZS1mMTczODMyZTVlNzkiLCJyb2xlcyI6InVzZXIiLCJpYXQiOjE3MDA2NDU0NDgsImV4cCI6MTcwMTI1MDI0OH0.OVSw8ZTRIfW0OpNoY1LEQSS6oaeGYX6H3cd6he9gb9s',
      });
    });
  });
});
