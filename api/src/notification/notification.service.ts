import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationType } from '../types/notification.type';
import { NotificationRepository } from './notification.repository';
import { APIQuery } from '../types/query.type';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  create(createNotificationDto: CreateNotificationDto) {
    try {
      return this.notificationRepository.createNotification(
        createNotificationDto,
      );
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  findAll(queries: APIQuery) {
    try {
      return this.notificationRepository.findAllNotifications(queries);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  findOneById(id: string) {
    try {
      return this.notificationRepository.findOneNotificationById(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  findOneByType(type: NotificationType) {
    try {
      return this.notificationRepository.findOneNotificationByType(type);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  update(id: string, updateNotificationDto: UpdateNotificationDto) {
    try {
      return this.notificationRepository.updateNotification(
        id,
        updateNotificationDto,
      );
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  remove(id: string) {
    try {
      return this.notificationRepository.deleteNotification(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
