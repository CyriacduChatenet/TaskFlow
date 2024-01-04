import { IsString } from 'class-validator';

import { NotificationType } from '../../types/notification.type';

export class CreateNotificationDto {
  @IsString()
  label: string;

  @IsString()
  type: NotificationType;
}
