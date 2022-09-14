import { Injectable } from '@nestjs/common';
import { evaluate } from 'mathjs';
import { CalculateResponse } from './type';

@Injectable()
export class CalculatorService {
  calculateWithMathJS(expressions: string): CalculateResponse {
    const result = evaluate(expressions).toFixed(2);
    return new Number(result).toString();
  }

  calculate(expressions: string): CalculateResponse {
    let tokens = expressions.split('');

    // Stack for numbers: 'values'
    let values = [];

    // Stack for Operators: 'operators'
    let operators = [];

    for (let i = 0; i < tokens.length; i++) {
      // Current token is a whitespace, skip it
      if (tokens[i] == ' ') {
        continue;
      }

      // Current token is a number,
      // push it to stack for numbers
      if ((tokens[i] >= '0' && tokens[i] <= '9') || tokens[i] === '.') {
        let sbuf = '';

        // There may be more than
        // one digits in number
        while (
          (i < tokens.length && tokens[i] >= '0' && tokens[i] <= '9') ||
          tokens[i] === '.'
        ) {
          sbuf = sbuf + tokens[i++];
        }

        values.push(parseFloat(sbuf));

        // Right now the i points to
        // the character next to the digit,
        // since the for loop also increases
        // the i, we would skip one
        //  token position; we need to
        // decrease the value of i by 1 to
        // correct the offset.
        i--;
      }

      // Current token is an opening
      // brace, push it to 'ops'
      else if (tokens[i] == '(') {
        operators.push(tokens[i]);
      }

      // Closing brace encountered,
      // solve entire brace
      else if (tokens[i] == ')') {
        while (operators[operators.length - 1] != '(') {
          values.push(
            this.applyOperator(operators.pop(), values.pop(), values.pop()),
          );
        }
        operators.pop();
      }

      // Current token is an operator.
      else if (
        tokens[i] == '+' ||
        tokens[i] == '-' ||
        tokens[i] == '*' ||
        tokens[i] == '/'
      ) {
        // While top of 'operators' has same
        // or greater precedence to current
        // token, which is an operator.
        // Apply operator on top of 'operators'
        // to top two elements in values stack
        while (
          operators.length > 0 &&
          this.hasPrecedence(tokens[i], operators[operators.length - 1])
        ) {
          values.push(
            this.applyOperator(operators.pop(), values.pop(), values.pop()),
          );
        }

        // Push current token to 'operators'.
        operators.push(tokens[i]);
      }
    }

    // Entire expression has been
    // parsed at this point, apply remaining
    // ops to remaining values
    while (operators.length > 0) {
      values.push(
        this.applyOperator(operators.pop(), values.pop(), values.pop()),
      );
    }

    // Top of 'values' contains
    // result, return it
    const result = values.pop().toFixed(2);
    return new Number(result).toString();
  }

  // Returns true if 'operator2' has
  // higher or same precedence as 'operator1',
  // otherwise returns false.
  hasPrecedence(operator1, operator2) {
    if (operator2 == '(' || operator2 == ')') {
      return false;
    }
    if (
      (operator1 == '*' || operator1 == '/') &&
      (operator2 == '+' || operator2 == '-')
    ) {
      return false;
    } else {
      return true;
    }
  }

  // A utility method to apply an
  // operator 'operator' on operands 'a'
  // and 'b'. Return the result.
  applyOperator(operator, b: number, a: number): number {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        if (b == 0) {
          document.write('Cannot divide by zero');
        }
        return a / b;
    }
    return 0;
  }
}
