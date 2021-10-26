import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';
import {
  PhoneNumberValidator,
  PhoneNumberValidatorDocument,
} from './schema/phoneNumberValidator.schema';

@Injectable()
export class PhoneNumberValidatorRepository extends EntityRepository<PhoneNumberValidatorDocument> {
  constructor(
    @InjectModel(PhoneNumberValidator.name)
    phoneNumberValidatorModel: Model<PhoneNumberValidatorDocument>,
  ) {
    super(phoneNumberValidatorModel);
  }
}
