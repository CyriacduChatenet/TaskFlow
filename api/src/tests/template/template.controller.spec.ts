import { Test, TestingModule } from '@nestjs/testing';

import { TemplateController } from '../../template/template.controller';
import { TemplateService } from '../../template/template.service';
import { UpdateTemplateDto } from '../../template/dto/update-template.dto';
import { APIQuery } from '../../types/query.type';
import { Template } from '../../template/entities/template.entity';
import { TemplateRepository } from '../../template/template.repository';

describe('TemplateController', () => {
  let controller: TemplateController;
  let service: TemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateController],
      providers: [
        TemplateService,
        {
          provide: TemplateRepository,
          useValue: { createTemplate: jest.fn(), findAllTemplates: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<TemplateController>(TemplateController);
    service = module.get<TemplateService>(TemplateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a template', async () => {
    const dto: Template = {
      name: '',
      id: '',
      teams: [],
      boards: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(service, 'create').mockImplementation(async () => dto);

    expect(await controller.create(dto)).toBe(dto);
  });

  it('should find all templates', async () => {
    const query: APIQuery = {
      /* fill with valid data */
    };
    const result = {
      data: [],
      count: 0,
      page: 1,
      limit: 10,
    };

    jest.spyOn(service, 'findAll').mockImplementation(async () => result);

    expect(await controller.findAll(query)).toBe(result);
  });

  // Assuming that update and remove methods exist in your TemplateController
  it('should update a template', async () => {
    const result = {
      generatedMaps: [],
      raw: [],
      affected: 1,
    };
    jest
      .spyOn(service, 'update')
      .mockImplementation(() => Promise.resolve(result));

    expect(await controller.update('1', new UpdateTemplateDto())).toBe(result);
  });

  it('should remove a template', async () => {
    const result = {
      generatedMaps: [],
      raw: [],
      affected: 1,
    };
    jest
      .spyOn(service, 'remove')
      .mockImplementation(() => Promise.resolve(result));

    expect(await controller.remove('1')).toBe(result);
  });
});
