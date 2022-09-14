import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from './service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatorService],
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hasPrecedence', () => {
    it('should return false when first operator = "(" and second operator = ")"', () => {
      expect(service.hasPrecedence('(', ')')).toBe(false);
    });

    it('should return false when first operator = "*" and second operator = "+"', () => {
      expect(service.hasPrecedence('*', '+')).toBe(false);
    });

    it('should return false when first operator = "*" and second operator = "-"', () => {
      expect(service.hasPrecedence('*', '-')).toBe(false);
    });

    it('should return false when first operator = "/" and second operator = "+"', () => {
      expect(service.hasPrecedence('/', '+')).toBe(false);
    });

    it('should return false when first operator = "/" and second operator = "-"', () => {
      expect(service.hasPrecedence('/', '-')).toBe(false);
    });

    it('should return true when first operator = "+" and second operator = "*"', () => {
      expect(service.hasPrecedence('+', '*')).toBe(true);
    });

    it('should return true when first operator = "-" and second operator = "*"', () => {
      expect(service.hasPrecedence('-', '*')).toBe(true);
    });

    it('should return true when first operator = "+" and second operator = "*"', () => {
      expect(service.hasPrecedence('+', '/')).toBe(true);
    });

    it('should return true when first operator = "-" and second operator = "*"', () => {
      expect(service.hasPrecedence('-', '/')).toBe(true);
    });
  });

  describe('applyOperator', () => {
    it('should return 6', () => {
      expect(service.applyOperator('+', 4, 2)).toBe(6);
    });

    it('should return -2', () => {
      expect(service.applyOperator('-', 4, 2)).toBe(-2);
    });

    it('should return 8', () => {
      expect(service.applyOperator('*', 4, 2)).toBe(8);
    });

    it('should return 0.5', () => {
      expect(service.applyOperator('/', 4, 2)).toBe(0.5);
    });
  });

  describe('calculate', () => {
    it('should return 8', () => {
      expect(service.calculate('3+5')).toBe('8');
    });

    it('should return 12.77', () => {
      expect(service.calculate('(3+9)/0.94')).toBe('12.77');
    });

    it('should return 4', () => {
      expect(service.calculate('(3+5)/(4-2)')).toBe('4');
    });

    it('should return 72', () => {
      expect(service.calculate('(5*(3+1)-2)*(3+1)')).toBe('72');
    });
  });
});
