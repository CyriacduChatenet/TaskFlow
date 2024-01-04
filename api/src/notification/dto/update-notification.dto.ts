import { IsString } from 'class-validator';

import { NotificationType } from '../../types/notification.type';

export class UpdateNotificationDto {
  @IsString()
  label: string;

  @IsString()
  type: NotificationType;
}
