import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as ResponseDecorator from '../common/response/decorator';
import { CalculatorService } from './service';
import { CalculateResponse } from './type';

@ApiTags('Calculator')
@Controller('')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Get(':expressions(*)')
  @HttpCode(200)
  @ApiOperation({
    operationId: 'calculate',
    summary: 'Calculate',
    description: 'Congestion Tax Calculation',
  })
  @ResponseDecorator.Successful(String)
  @ResponseDecorator.BadRequest()
  @ResponseDecorator.InternalServerError()
  calculate(@Param('expressions') expressions: string): CalculateResponse {
    return this.calculatorService.calculate(expressions);
  }
}
