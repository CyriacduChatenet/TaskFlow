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

import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationType } from '../types/notification.type';
import { APIQuery } from '../types/query.type';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  findAll(@Query() queries: APIQuery) {
    return this.notificationService.findAll(queries);
  }

  @Get('id/:id')
  findOneById(@Param('id') id: string) {
    return this.notificationService.findOneById(id);
  }

  @Get('type/:type')
  findOneByType(@Param('type') type: NotificationType) {
    return this.notificationService.findOneByType(type);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  remove(@Param('id') id: string) {
    return this.notificationService.remove(id);
  }
}
