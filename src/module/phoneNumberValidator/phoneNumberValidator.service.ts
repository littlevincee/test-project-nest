import { HttpStatus, Injectable, Inject, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { map } from 'rxjs/operators';
import { lastValueFrom, Observable } from 'rxjs';
import { PhoneNumberInputDto } from './dto/phoneNumberInput.dto';
import { PhoneNumberValidatorRepository } from './phoneNumberValidator.repository';
import { CreatePhoneNumberValidatorDto } from './dto/createPhoneNumberValidator.dto';
import { PaginatedValidatedPhoneNumberDto } from './dto/paginatedValidatedPhoneNumber.dto';

@Injectable()
export class PhoneNumberValidatorService {
  constructor(
    private readonly phoneNumberValidatorRepository: PhoneNumberValidatorRepository,
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async findPhoneNumberValidationHistoryByPagination(
    @Query() query,
  ): Promise<PaginatedValidatedPhoneNumberDto> {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 100;
    const total = await this.phoneNumberValidatorRepository.count();
    const data = await this.phoneNumberValidatorRepository.paginatedFind(
      {},
      page,
      limit,
      undefined,
      { createdAt: 'desc' },
    );

    const pagedValidatedPhoneNumberDto = new PaginatedValidatedPhoneNumberDto();
    pagedValidatedPhoneNumberDto.data = data;
    pagedValidatedPhoneNumberDto.page = page;
    pagedValidatedPhoneNumberDto.total = total;
    pagedValidatedPhoneNumberDto.lastPage = Math.ceil(total / limit);

    return pagedValidatedPhoneNumberDto;
  }

  async verifyPhoneNumber(phoneNumberInputDto: PhoneNumberInputDto): Promise<{
    isPhoneNumberValid: boolean;
    httpStatus: HttpStatus;
    message: string;
  }> {
    const numverfiyUrl = `http://apilayer.net/api/validate?access_key=${process.env.NUMVERIFY_API_KEY}&number=${phoneNumberInputDto.phoneNumber}&country_code=${phoneNumberInputDto.countryCode}&format=1`;

    let responseMessage: string;

    const response$: Observable<any> = this.httpService.get(numverfiyUrl).pipe(
      map((res: AxiosResponse) => {
        return res.data;
      }),
    );

    const validateData: any = await lastValueFrom(response$);

    const createPhoneNumberValidatorDto = new CreatePhoneNumberValidatorDto({
      isPhoneNumberValid: validateData.valid || false,
      ...phoneNumberInputDto,
    });

    await this.phoneNumberValidatorRepository.create(
      createPhoneNumberValidatorDto,
    );

    if (!validateData.error) {
      this.logger.info('called numverfiy successfully');

      responseMessage = 'phone number validation check completed';
    } else {
      let code: number, info: string;

      // eslint-disable-next-line prefer-const
      ({ code, info } = validateData.error);

      this.logger.error(
        `Issue with calling numverfiy - code: ${code}. info: ${info}`,
      );

      responseMessage = info;
    }

    return {
      isPhoneNumberValid: validateData.valid || false,
      httpStatus: HttpStatus.OK,
      message: responseMessage,
    };
  }
}
