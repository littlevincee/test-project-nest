import { IsBoolean, IsNumber, IsString, Min } from 'class-validator';

export class CreatePhoneNumberValidatorDto {
  constructor(init?: Partial<CreatePhoneNumberValidatorDto>) {
    Object.assign(this, init);
  }

  @IsString()
  @Min(2)
  countryCode: string;

  @IsNumber()
  phoneNumber: number;

  @IsBoolean()
  isPhoneNumberValid: boolean;
}
