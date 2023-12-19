import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { APIQuery } from '../types/query.type';

export class TeamRepository extends Repository<Team> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Team, dataSource.createEntityManager());
  }

  async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    const team = this.create(createTeamDto);
    return this.save(team);
  }

  async findAllTeams(
    queries: APIQuery,
  ): Promise<{ page: number; limit: number; count: number; data: Team[] }> {
    let { page, limit, name } = queries;

    page = page ? +page : 1;
    limit = limit ? +limit : 10;

    const query = this.createQueryBuilder('team').leftJoinAndSelect(
      'team.users',
      'users',
    );

    if (name) query.andWhere('team.name = :name', { name });

    return {
      page,
      limit,
      count: await query.getCount(),
      data: await query
        .skip((page - 1) * limit)
        .take(limit)
        .getMany(),
    };
  }

  async findOneTeamById(id: string): Promise<Team> {
    return this.createQueryBuilder('team')
      .leftJoinAndSelect('team.users', 'users')
      .where('team.id = :id', { id })
      .getOne();
  }

  async findOneTeamByName(name: string): Promise<Team> {
    return this.createQueryBuilder('team')
      .leftJoinAndSelect('team.users', 'users')
      .where('team.name = :name', { name })
      .getOne();
  }

  async updateTeam(id: string, updateTeamDto: CreateTeamDto) {
    return this.update(id, updateTeamDto);
  }

  async deleteTeam(id: string) {
    return this.softDelete(id);
  }
}
