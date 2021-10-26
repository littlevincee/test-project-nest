import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { MongooseConfigService } from './shared/service/mongooseConfigService';
import { PhoneNumberValidatorModule } from './module/phoneNumberValidator/phoneNumberValidator.module';
import { EmailValidatorModule } from './module/emailValidator/emailValidator.module';

const format = winston.format;

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    WinstonModule.forRoot({
      exitOnError: false,
      format: format.combine(
        format.timestamp({
          format: 'HH:mm:ss YY/MM/DD',
        }),
        format.splat(),
        format.printf((info) => {
          return `${info.timestamp} ${info.level}: ${info.message}`;
        }),
      ),
      transports: [
        new winston.transports.DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '10m',
          maxFiles: '14d',
        }),
      ],
    }),
    PhoneNumberValidatorModule,
    EmailValidatorModule,
  ],
  providers: [],
})
export class AppModule {}
