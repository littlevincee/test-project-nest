import { IsNumber, IsString, Min } from 'class-validator';

export class PhoneNumberInputDto {
  @IsString()
  @Min(2)
  readonly countryCode: string;

  @IsNumber()
  readonly phoneNumber: number;
}
