import { Test, TestingModule } from '@nestjs/testing';

import { TeamController } from '../../team/team.controller';
import { TeamService } from '../../team/team.service';
import { CreateTeamDto } from '../../team/dto/create-team.dto';
import { APIQuery } from '../../types/query.type';
import { Team } from '../../team/entities/team.entity';

jest.mock('../../team/team.service');

describe('TeamController', () => {
  let controller: TeamController;
  let service: TeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [TeamService],
    }).compile();

    controller = module.get<TeamController>(TeamController);
    service = module.get<TeamService>(TeamService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a team', async () => {
    const dto: CreateTeamDto = {
      name: '',
    };
    let result: void;
    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(dto)).toBe(result);
  });

  it('should find all teams', async () => {
    const query: APIQuery = {
      /* fill with appropriate data */
    };
    const result: {
      page: number;
      limit: number;
      count: number;
      data: Team[];
    } = {
      page: 1,
      limit: 10,
      count: 0,
      data: [],
    };
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll(query)).toBe(result);
  });

  it('should find a team by id', async () => {
    const id = 'testId';
    const result: Team = {
      id: '',
      name: '',
      users: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      templates: [],
    };
    jest.spyOn(service, 'findOneById').mockResolvedValue(result);

    expect(await controller.findOneById(id)).toBe(result);
  });

  it('should find a team by name', async () => {
    const name = 'testName';
    const result: Team = {
      id: '',
      name: '',
      users: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      templates: [],
    };
    jest.spyOn(service, 'findOneByName').mockResolvedValue(result);

    expect(await controller.findOneByName(name)).toBe(result);
  });
});
