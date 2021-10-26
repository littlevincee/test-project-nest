import { IsBoolean, IsEmail } from 'class-validator';

export class CreateEmailValidatorDto {
  constructor(init?: Partial<CreateEmailValidatorDto>) {
    Object.assign(this, init);
  }

  @IsEmail()
  email: string;

  @IsBoolean()
  isEmailValid: boolean;
}
