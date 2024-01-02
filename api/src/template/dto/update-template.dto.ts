import { IsString } from 'class-validator';

export class UpdateTemplateDto {
  @IsString()
  name: string;
}
