import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '../../auth/auth.controller';
import { AuthService } from '../../auth/auth.service';
import { SigninDto } from '../../auth/dto/signin.dto';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { User } from '../../user/entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signin: jest.fn(),
            signup: jest.fn(),
          }, // provide a mock implementation of AuthService or an actual instance
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call signin method of AuthService when signin is called', async () => {
    const dto: SigninDto = {
      email: 'test1@test.com',
      password: 'root',
    };
    jest.spyOn(authService, 'signin').mockImplementation(() =>
      Promise.resolve({
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwiaWQiOiJjOTA2MWEwOS1kNzdhLTRjNTUtOGZkZS1mMTczODMyZTVlNzkiLCJyb2xlcyI6InVzZXIiLCJpYXQiOjE3MDA2NDU0NDgsImV4cCI6MTcwMTI1MDI0OH0.OVSw8ZTRIfW0OpNoY1LEQSS6oaeGYX6H3cd6he9gb9s',
      }),
    );
    await controller.signin(dto);
    expect(authService.signin).toHaveBeenCalledWith(dto);
  });

  it('should call signup method of AuthService when signup is called', async () => {
    const dto: CreateUserDto = {
      email: 'test3@test.com',
      password: 'root',
      username: 'test3',
    };
    const user: User = {
      createdAt: new Date('2023-11-22T08:23:43.812Z'),
      updatedAt: new Date('2023-11-22T08:23:43.812Z'),
      deletedAt: null,
      id: 'c9061a09-d77a-4c55-8fde-f173832e5e79',
      email: 'test3@test.com',
      password: 'root',
      username: 'test3',
      roles: 'user',
      isVerified: false,
      tasks: [],
      teams: [],
    };
    jest
      .spyOn(authService, 'signup')
      .mockImplementation(() => Promise.resolve({ user }));
    await controller.signup(dto);
    expect(authService.signup).toHaveBeenCalledWith(dto);
  });
});
