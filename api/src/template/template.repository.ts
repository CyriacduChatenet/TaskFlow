import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Template } from './entities/template.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { APIQuery } from '../types/query.type';

export class TemplateRepository extends Repository<Template> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Template, dataSource.createEntityManager());
  }

  async createTemplate(
    createTemplateDto: CreateTemplateDto,
  ): Promise<Template> {
    const template = this.create(createTemplateDto);
    return this.save(template);
  }

  async findAllTemplates(
    queries: APIQuery,
  ): Promise<{ page: number; limit: number; count: number; data: Template[] }> {
    let { page, limit, name } = queries;

    page = page ? +page : 1;
    limit = limit ? +limit : 10;

    const query = this.createQueryBuilder('template')
      .leftJoinAndSelect('template.teams', 'teams')
      .leftJoinAndSelect('template.boards', 'boards');

    if (name) query.andWhere('template.name = :name', { name });

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

  async findOneTemplateById(id: string): Promise<Template> {
    return this.createQueryBuilder('template')
      .leftJoinAndSelect('template.teams', 'teams')
      .leftJoinAndSelect('template.boards', 'boards')
      .where('template.id = :id', { id })
      .getOne();
  }

  async findOneTemplateByName(name: string): Promise<Template> {
    return this.createQueryBuilder('template')
      .leftJoinAndSelect('template.teams', 'teams')
      .leftJoinAndSelect('template.boards', 'boards')
      .where('template.name = :name', { name })
      .getOne();
  }

  async updateTemplate(id: string, updateTemplateDto: CreateTemplateDto) {
    return this.update(id, updateTemplateDto);
  }

  async deleteTemplate(id: string) {
    return this.softDelete(id);
  }
}
