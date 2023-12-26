import { IsString } from 'class-validator';

export class UpdateTeamDto {
  @IsString()
  name: string;
}
