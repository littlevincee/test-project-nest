import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from '../../base/schema/base.schema';

export type EmailValidatorDocument = EmailValidator & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class EmailValidator extends Base {
  @Prop({ required: true })
  email: string;

  @Prop()
  isEmailValid: boolean;
}

export const EmailValidatorSchema =
  SchemaFactory.createForClass(EmailValidator);
