import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamRepository } from './team.repository';
import { APIQuery } from '../types/query.type';

@Injectable()
export class TeamService {
  constructor(private readonly teamRepository: TeamRepository) {}

  async create(createTeamDto: CreateTeamDto) {
    try {
      await this.teamRepository.createTeam(createTeamDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll(queries: APIQuery) {
    try {
      return await this.teamRepository.findAllTeams(queries);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOneById(id: string) {
    try {
      return await this.teamRepository.findOneTeamById(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOneByName(name: string) {
    try {
      return await this.teamRepository.findOneTeamByName(name);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    try {
      return await this.teamRepository.updateTeam(id, updateTeamDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.teamRepository.deleteTeam(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
