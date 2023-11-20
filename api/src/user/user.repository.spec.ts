import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  const mockUser = new User(); // Create a mock User instance for testing

  const mockDataSource = {
    createEntityManager: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'root',
          password: 'root',
          database: 'postgres',
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // Use the actual TypeORM Repository class for testing
        },
        {
          provide: 'DataSourceToken', // Use your actual data source token here
          useValue: mockDataSource,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      email: '',
      password: '',
      username: '',
      roles: '',
    };
    jest.spyOn(userRepository, 'create').mockReturnValue(mockUser);
    jest.spyOn(userRepository, 'save').mockResolvedValueOnce(mockUser);

    const result = await userRepository.createUser(createUserDto);

    expect(result).toEqual(mockUser);
  });

  it('should find all users', async () => {
    jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValue({
      getMany: jest.fn().mockResolvedValueOnce([mockUser]),
    } as any);

    const result = await userRepository.findAllUsers();

    expect(result).toEqual([mockUser]);
  });

  it('should find one user by id', async () => {
    jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValue({
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValueOnce(mockUser),
    } as any);

    const result = await userRepository.findOneUserById('');

    expect(result).toEqual(mockUser);
  });

  it('should find one user by email', async () => {
    jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValue({
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValueOnce(mockUser),
    } as any);

    const result = await userRepository.findOneUserByEmail('');

    expect(result).toEqual(mockUser);
  });

  it('should update a user', async () => {
    jest.spyOn(userRepository, 'update').mockResolvedValueOnce({} as any);

    const result = await userRepository.updateUser('', {} as any);

    expect(result).toEqual({});
  });

  it('should delete a user', async () => {
    jest.spyOn(userRepository, 'softDelete').mockResolvedValueOnce({} as any);

    const result = await userRepository.deleteUser('');

    expect(result).toEqual({});
  });
});
