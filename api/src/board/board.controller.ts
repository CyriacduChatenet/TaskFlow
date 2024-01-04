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

import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { APIQuery } from '../types/query.type';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get()
  findAll(@Query() query: APIQuery) {
    return this.boardService.findAll(query);
  }

  @Get('id/:id')
  findOneById(@Param('id') id: string) {
    return this.boardService.findOneById(id);
  }

  @Get('name/:name')
  findOneByName(@Param('name') name: string) {
    return this.boardService.findOneByName(name);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  remove(@Param('id') id: string) {
    return this.boardService.remove(id);
  }
}
