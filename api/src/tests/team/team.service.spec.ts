import { Test, TestingModule } from '@nestjs/testing';

import { TeamService } from '../../team/team.service';
import { TeamRepository } from '../../team/team.repository';
import { CreateTeamDto } from '../../team/dto/create-team.dto';
import { UpdateTeamDto } from '../../team/dto/update-team.dto';

describe('TeamService', () => {
  let service: TeamService;
  let repo: TeamRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamService, { provide: TeamRepository, useValue: {} }],
    }).compile();

    service = module.get<TeamService>(TeamService);
    repo = module.get<TeamRepository>(TeamRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a team', async () => {
    const team: CreateTeamDto = {
      name: '',
    };
    jest.spyOn(repo, 'createTeam').mockResolvedValueOnce(null);
    await expect(service.create(team)).resolves.not.toThrow();
  });

  it('should find all teams', async () => {
    const queries = {
      /* fill with valid data */
    };
    jest.spyOn(repo, 'findAllTeams').mockResolvedValueOnce({
      page: 1,
      limit: 10,
      count: 0,
      data: [],
    });
    await expect(service.findAll(queries)).resolves.not.toThrow();
  });

  it('should find one team by id', async () => {
    const id = 'some-id';
    jest.spyOn(repo, 'findOneTeamById').mockResolvedValueOnce({
      id: '',
      name: '',
      users: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await expect(service.findOneById(id)).resolves.not.toThrow();
  });

  it('should find one team by name', async () => {
    const name = 'some-name';
    jest.spyOn(repo, 'findOneTeamByName').mockResolvedValueOnce({
      id: '',
      name: '',
      users: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await expect(service.findOneByName(name)).resolves.not.toThrow();
  });

  it('should update a team', async () => {
    const id = 'some-id';
    const team: UpdateTeamDto = {
      name: '',
    };
    jest.spyOn(repo, 'updateTeam').mockResolvedValueOnce(undefined);
    await expect(service.update(id, team)).resolves.not.toThrow();
  });

  it('should remove a team', async () => {
    const id = 'some-id';
    jest.spyOn(repo, 'deleteTeam').mockResolvedValueOnce(undefined);
    await expect(service.remove(id)).resolves.not.toThrow();
  });
});
