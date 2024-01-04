import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import { APIQuery } from '../types/query.type';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationType } from '../types/notification.type';

export class NotificationRepository extends Repository<Notification> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Notification, dataSource.createEntityManager());
  }

  async createNotification(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const notification = this.create(createNotificationDto);
    return this.save(notification);
  }

  async findAllNotifications(queries: APIQuery): Promise<{
    page: number;
    limit: number;
    count: number;
    data: Notification[];
  }> {
    let { page, limit, type } = queries;

    page = page ? +page : 1;
    limit = limit ? +limit : 10;

    const query = this.createQueryBuilder('notification').leftJoinAndSelect(
      'notification.user',
      'user',
    );

    if (type) query.andWhere('notification.type = :type', { type });

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

  async findOneNotificationById(id: string): Promise<Notification> {
    return this.createQueryBuilder('notification')
      .leftJoinAndSelect('notification.user', 'user')
      .where('notification.id = :id', { id })
      .getOne();
  }

  async findOneNotificationByType(
    type: NotificationType,
  ): Promise<Notification> {
    return this.createQueryBuilder('notification')
      .leftJoinAndSelect('notification.user', 'user')
      .where('Notification.type = :type', { type })
      .getOne();
  }

  async updateNotification(
    id: string,
    updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.update(id, updateNotificationDto);
  }

  async deleteNotification(id: string) {
    return this.softDelete(id);
  }
}
