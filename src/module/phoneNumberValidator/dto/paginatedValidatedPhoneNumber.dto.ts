import { PhoneNumberValidator } from '../schema/phoneNumberValidator.schema';
import { PaginatedBaseDto } from 'src/module/base/dto/paginatedBase.dto';

export class PaginatedValidatedPhoneNumberDto extends PaginatedBaseDto {
  data: Array<PhoneNumberValidator>;
}
