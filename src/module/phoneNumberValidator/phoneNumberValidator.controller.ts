import { Body, Controller, Res, Post, Get, Query } from '@nestjs/common';
import { PhoneNumberValidatorService } from './phoneNumberValidator.service';
import { PhoneNumberInputDto } from './dto/phoneNumberInput.dto';
import { Response } from 'express';
import { PaginatedValidatedPhoneNumberDto } from './dto/paginatedValidatedPhoneNumber.dto';

@Controller('/api/phone-number-validator')
export class PhoneNumberValidatorController {
  constructor(
    private readonly phoneNumberValidatorService: PhoneNumberValidatorService,
  ) {}

  @Get('getPaginatedPhoneNumberValidationHistory')
  async findPhoneNumberValidationHistoryByPagination(
    @Query() query,
  ): Promise<PaginatedValidatedPhoneNumberDto> {
    return this.phoneNumberValidatorService.findPhoneNumberValidationHistoryByPagination(
      query,
    );
  }

  @Post('verify')
  async verifyPhoneNumber(
    @Body() phoneNumberInputDto: PhoneNumberInputDto,
    @Res() res: Response,
  ) {
    const result = await this.phoneNumberValidatorService.verifyPhoneNumber(
      phoneNumberInputDto,
    );

    res.status(result.httpStatus).json({
      isPhoneNumberValid: result.isPhoneNumberValid,
      message: result.message,
    });
  }
}
