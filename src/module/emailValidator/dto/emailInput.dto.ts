import { IsEmail } from 'class-validator';

export class EmailInputDto {
  @IsEmail()
  readonly email: string;
}
