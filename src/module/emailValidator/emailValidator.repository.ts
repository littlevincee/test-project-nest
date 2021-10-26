import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';
import {
  EmailValidator,
  EmailValidatorDocument,
} from './schema/emailValidator.schema';

@Injectable()
export class EmailValidatorRepository extends EntityRepository<EmailValidatorDocument> {
  constructor(
    @InjectModel(EmailValidator.name)
    EmailValidatorModel: Model<EmailValidatorDocument>,
  ) {
    super(EmailValidatorModel);
  }
}
