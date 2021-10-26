import { HttpStatus, Injectable, Inject, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { map } from 'rxjs/operators';
import { lastValueFrom, Observable } from 'rxjs';
import { EmailInputDto } from './dto/emailInput.dto';
import { EmailValidatorRepository } from './emailValidator.repository';
import { CreateEmailValidatorDto } from './dto/createEmailValidator.dto';
import { PaginatedValidatedEmailDto } from './dto/paginatedValidatedEmail.dto';

@Injectable()
export class EmailValidatorService {
  constructor(
    private readonly emailValidatorRepository: EmailValidatorRepository,
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async findEmailValidationHistoryByPagination(
    @Query() query,
  ): Promise<PaginatedValidatedEmailDto> {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 100;
    const total = await this.emailValidatorRepository.count();
    const data = await this.emailValidatorRepository.paginatedFind(
      {},
      page,
      limit,
      undefined,
      { createdAt: 'desc' },
    );

    const pagedValidatedEmailDto = new PaginatedValidatedEmailDto();
    pagedValidatedEmailDto.data = data;
    pagedValidatedEmailDto.page = page;
    pagedValidatedEmailDto.total = total;
    pagedValidatedEmailDto.lastPage = Math.ceil(total / limit);

    return pagedValidatedEmailDto;
  }

  async verifyEmail(emailInputDto: EmailInputDto): Promise<{
    isEmailValid: boolean;
    httpStatus: HttpStatus;
    message: string;
  }> {
    const numverfiyUrl = `http://apilayer.net/api/check?access_key=${process.env.MAILBOXLAYER_API_KEY}&email=${emailInputDto.email}&smtp=1&format=1`;

    let responseMessage: string;

    const response$: Observable<any> = this.httpService.get(numverfiyUrl).pipe(
      map((res: AxiosResponse) => {
        return res.data;
      }),
    );

    const validateData: any = await lastValueFrom(response$);

    const createEmailValidatorDto = new CreateEmailValidatorDto({
      isEmailValid: validateData.format_valid || false,
      ...emailInputDto,
    });

    await this.emailValidatorRepository.create(createEmailValidatorDto);

    if (!validateData.error) {
      this.logger.info('called mailboxlayer successfully');

      responseMessage = 'email validation check completed';
    } else {
      let code: number, type: string;

      // eslint-disable-next-line prefer-const
      ({ code, type } = validateData.error);

      this.logger.error(
        `Issue with calling mailboxlayer - code: ${code}. info: ${type}`,
      );

      responseMessage = type;
    }

    return {
      isEmailValid: validateData.format_valid || false,
      httpStatus: HttpStatus.OK,
      message: responseMessage,
    };
  }
}
