import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { Template } from './entities/template.entity';
import { TemplateRepository } from './template.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Template])],
  controllers: [TemplateController],
  providers: [TemplateService, TemplateRepository],
})
export class TemplateModule {}
