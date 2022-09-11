import { Module } from '@nestjs/common';
import { CalculatorController } from './controller';
import { CalculatorService } from './service';

@Module({
  controllers: [CalculatorController],
  providers: [CalculatorService],
})
export class CalculatorModule {}
