import { Injectable } from '@nestjs/common';
import { evaluate } from 'mathjs';
import { CalculateResponse } from './type';

@Injectable()
export class CalculatorService {
  calculate(expressions: string): CalculateResponse {
    const result = evaluate(expressions).toFixed(2);
    return new Number(result).toString();
  }
}
