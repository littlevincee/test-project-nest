import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { EmailValidatorController } from './emailValidator.controller';
import { EmailValidatorService } from './emailValidator.service';
import { EmailValidatorRepository } from './emailValidator.repository';
import {
  EmailValidator,
  EmailValidatorSchema,
} from './schema/emailValidator.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailValidator.name, schema: EmailValidatorSchema },
    ]),
    HttpModule,
  ],
  controllers: [EmailValidatorController],
  providers: [EmailValidatorService, EmailValidatorRepository],
})
export class EmailValidatorModule {}
