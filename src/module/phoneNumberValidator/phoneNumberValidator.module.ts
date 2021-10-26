import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { PhoneNumberValidatorController } from './phoneNumberValidator.controller';
import { PhoneNumberValidatorService } from './phoneNumberValidator.service';
import { PhoneNumberValidatorRepository } from './phoneNumberValidator.repository';
import {
  PhoneNumberValidator,
  PhoneNumberValidatorSchema,
} from './schema/phoneNumberValidator.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhoneNumberValidator.name, schema: PhoneNumberValidatorSchema },
    ]),
    HttpModule,
  ],
  controllers: [PhoneNumberValidatorController],
  providers: [PhoneNumberValidatorService, PhoneNumberValidatorRepository],
})
export class PhoneNumberValidatorModule {}
