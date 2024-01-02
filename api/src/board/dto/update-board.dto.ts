import { IsString } from 'class-validator';

export class UpdateBoardDto {
  @IsString()
  name: string;
}
