import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateEstateDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  user?: User;
}
