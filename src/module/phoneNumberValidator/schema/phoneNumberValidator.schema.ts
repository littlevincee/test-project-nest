import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from '../../base/schema/base.schema';

export type PhoneNumberValidatorDocument = PhoneNumberValidator & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class PhoneNumberValidator extends Base {
  @Prop({ required: true })
  countryCode: string;

  @Prop({ required: true })
  phoneNumber: number;

  @Prop()
  isPhoneNumberValid: boolean;
}

export const PhoneNumberValidatorSchema =
  SchemaFactory.createForClass(PhoneNumberValidator);
