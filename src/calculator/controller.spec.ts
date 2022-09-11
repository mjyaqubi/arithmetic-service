import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorController } from './controller';
import { CalculatorService } from './service';

describe('CalculatorController', () => {
  let controller: CalculatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculatorController],
      providers: [CalculatorService],
    }).compile();

    controller = module.get<CalculatorController>(CalculatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /:expressions(*)', () => {
    it('should return 8', () => {
      expect(controller.calculate('3+5')).toBe('8');
    });

    it('should return 12.77', () => {
      expect(controller.calculate('(3+9)/0.94')).toBe('12.77');
    });

    it('should return 4', () => {
      expect(controller.calculate('(3+5)/(4-2)')).toBe('4');
    });

    it('should return 72', () => {
      expect(controller.calculate('(5*(3+1)-2)*(3+1)')).toBe('72');
    });
  });
});
