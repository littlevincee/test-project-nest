import { Body, Controller, Res, Post, Get, Query } from '@nestjs/common';
import { EmailValidatorService } from './emailValidator.service';
import { EmailInputDto } from './dto/emailInput.dto';
import { Response } from 'express';
import { PaginatedValidatedEmailDto } from './dto/paginatedValidatedEmail.dto';

@Controller('/api/email-validator')
export class EmailValidatorController {
  constructor(private readonly emailValidatorService: EmailValidatorService) {}

  @Get('getPaginatedEmailValidationHistory')
  async findEmailValidationHistoryByPagination(
    @Query() query,
  ): Promise<PaginatedValidatedEmailDto> {
    return this.emailValidatorService.findEmailValidationHistoryByPagination(
      query,
    );
  }

  @Post('verify')
  async verifyEmail(
    @Body() emailInputDto: EmailInputDto,
    @Res() res: Response,
  ) {
    const result = await this.emailValidatorService.verifyEmail(emailInputDto);

    res
      .status(result.httpStatus)
      .json({ isEmailValid: result.isEmailValid, message: result.message });
  }
}
