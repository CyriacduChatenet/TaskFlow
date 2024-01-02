import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

import { TemplateService } from '../../template/template.service';
import { TemplateRepository } from '../../template/template.repository';
import { CreateTemplateDto } from '../../template/dto/create-template.dto';
import { APIQuery } from '../../types/query.type';
import { Template } from '../../template/entities/template.entity';

describe('TemplateService', () => {
  let service: TemplateService;
  let repo: TemplateRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplateService,
        {
          provide: TemplateRepository,
          useValue: { createTemplate: jest.fn(), findAllTemplates: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<TemplateService>(TemplateService);
    repo = module.get<TemplateRepository>(TemplateRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call createTemplate with correct parameters', async () => {
      const createTemplateDto: Template = {
        id: '',
        name: '',
        teams: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        boards: [],
      };
      const spy = jest
        .spyOn(repo, 'createTemplate')
        .mockImplementation(() => Promise.resolve(createTemplateDto));

      await service.create(createTemplateDto);

      expect(spy).toHaveBeenCalledWith(createTemplateDto);
    });

    it('should throw UnauthorizedException when createTemplate throws an error', async () => {
      const createTemplateDto: CreateTemplateDto = {
        name: '',
      };
      jest
        .spyOn(repo, 'createTemplate')
        .mockImplementation(() => Promise.reject(new Error()));

      await expect(service.create(createTemplateDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('findAll', () => {
    it('should call findAllTemplates with correct parameters', async () => {
      const queries: APIQuery = {
        /* fill with appropriate data */
      };

      const result = {
        data: [],
        count: 0,
        page: 1,
        limit: 10,
      };

      const spy = jest
        .spyOn(repo, 'findAllTemplates')
        .mockImplementation(() => Promise.resolve(result));

      await service.findAll(queries);

      expect(spy).toHaveBeenCalledWith(queries);
    });

    it('should throw NotFoundException when findAllTemplates throws an error', async () => {
      const queries: APIQuery = {
        /* fill with appropriate data */
      };
      jest
        .spyOn(repo, 'findAllTemplates')
        .mockImplementation(() => Promise.reject(new Error()));

      await expect(service.findAll(queries)).rejects.toThrow(NotFoundException);
    });
  });
});
