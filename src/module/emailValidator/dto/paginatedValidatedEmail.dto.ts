import { EmailValidator } from '../schema/emailValidator.schema';
import { PaginatedBaseDto } from 'src/module/base/dto/paginatedBase.dto';

export class PaginatedValidatedEmailDto extends PaginatedBaseDto {
  data: Array<EmailValidator>;
}
