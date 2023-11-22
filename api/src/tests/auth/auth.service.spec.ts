import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {}, // provide a mock implementation of UserService or an actual instance
        },
        {
          provide: JwtService,
          useValue: {}, // provide a mock implementation of JwtService or an actual instance
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
