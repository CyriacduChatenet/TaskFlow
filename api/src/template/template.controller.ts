import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { APIQuery } from '../types/query.type';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templateService.create(createTemplateDto);
  }

  @Get()
  findAll(@Query() queries: APIQuery) {
    return this.templateService.findAll(queries);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.templateService.findOneById(id);
  }

  @Get('name/:name')
  findOneByName(@Param('name') name: string) {
    return this.templateService.findOneByName(name);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  update(
    @Param('id') id: string,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ) {
    return this.templateService.update(id, updateTemplateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  remove(@Param('id') id: string) {
    return this.templateService.remove(id);
  }
}
