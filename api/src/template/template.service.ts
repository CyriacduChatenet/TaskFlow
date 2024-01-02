import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { TemplateRepository } from './template.repository';
import { APIQuery } from '../types/query.type';

@Injectable()
export class TemplateService {
  constructor(private readonly templateRepository: TemplateRepository) {}

  create(createTemplateDto: CreateTemplateDto) {
    try {
      return this.templateRepository.createTemplate(createTemplateDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  findAll(queries: APIQuery) {
    try {
      return this.templateRepository.findAllTemplates(queries);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  findOne(id: string) {
    try {
      return this.templateRepository.findOneTemplateById(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  update(id: string, updateTemplateDto: UpdateTemplateDto) {
    try {
      return this.templateRepository.updateTemplate(id, updateTemplateDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  remove(id: string) {
    try {
      return this.templateRepository.deleteTemplate(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
