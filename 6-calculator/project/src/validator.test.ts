import { describe, expect, test } from '@jest/globals';
import { Validator } from '@/validator';

describe('Validator 테스트', () => {
  const validator = new Validator();

  test('isEmpty 확인', () => {
    const testFn = validator.isEmpty;
    expect(testFn('')).toBeTruthy();
    expect(testFn('1+1')).toBeFalsy();
  });

  test('hasNotAllowed 확인', () => {
    const testFn = validator.hasNotAllowed;
    expect(testFn('1.1')).toBeFalsy();
    expect(testFn('11*(1-2)+2/5')).toBeFalsy();
    expect(testFn('11*(1-2)+2^5')).toBeFalsy();
    expect(testFn('1+1')).toBeFalsy();
    expect(testFn('1=1')).toBeTruthy();
    expect(testFn('1+as1')).toBeTruthy();
    expect(testFn('1+11%')).toBeTruthy();
  });

  test('hasDuplicatedOperator 확인', () => {
    const testFn = validator.hasDuplicatedOperator;
    expect(testFn('1+-1')).toBeFalsy();
    expect(testFn('1*(1-2)+2/5')).toBeFalsy();
    expect(testFn('1-(-1-2)*-2/5')).toBeFalsy();
    expect(testFn('1++1')).toBeTruthy();
    expect(testFn('1+1-*1')).toBeTruthy();
    expect(testFn('1//1')).toBeTruthy();
    expect(testFn('1+/1')).toBeTruthy();
    expect(testFn('1(+1)')).toBeTruthy();
    expect(testFn('(1+1-)')).toBeTruthy();
    expect(testFn('2^^2')).toBeTruthy();
  });

  test('isAllowedFirst 확인', () => {
    const testFn = validator.isAllowedFirst;
    expect(testFn('-1+1')).toBeTruthy();
    expect(testFn('1*(1-2)+2/5')).toBeTruthy();
    expect(testFn('(1+1)')).toBeTruthy();
    expect(testFn('12.1')).toBeTruthy();
    expect(testFn('0+1')).toBeTruthy();
    expect(testFn('00+1)')).toBeFalsy();
    expect(testFn(')1+1-1')).toBeFalsy();
    expect(testFn('.1/1')).toBeFalsy();
    expect(testFn('*1+1')).toBeFalsy();
    expect(testFn('^1+1')).toBeFalsy();
  });

  test('isAllowedLast 확인', () => {
    const testFn = validator.isAllowedLast;
    expect(testFn('-1+1')).toBeTruthy();
    expect(testFn('1*(1-2)+2/5')).toBeTruthy();
    expect(testFn('(1+1)')).toBeTruthy();
    expect(testFn('1+1-1(')).toBeFalsy();
    expect(testFn('1/1/')).toBeFalsy();
    expect(testFn('1+1.')).toBeFalsy();
    expect(testFn('1+2^')).toBeFalsy();
  });

  test('isCorrectBracketMate 확인', () => {
    const testFn = validator.isCorrectBracketMate;
    expect(testFn('((-1+1))+(1+1)')).toBeTruthy();
    expect(testFn('(1*((1-2)+2/5))')).toBeTruthy();
    expect(testFn('(1+1)')).toBeTruthy();
    expect(testFn('(1+1)(-1')).toBeFalsy();
    expect(testFn('1/((1)')).toBeFalsy();
    expect(testFn('(1+)1+1)).')).toBeFalsy();
  });

  test('hasWrongBracket 확인', () => {
    const testFn = validator.hasWrongBracket;
    expect(testFn('(-1+1)+(1+1)')).toBeFalsy();
    expect(testFn('1+(1+1)')).toBeFalsy();
    expect(testFn('1(1+1)-1')).toBeTruthy();
    expect(testFn('1/(1+1)1')).toBeTruthy();
  });

  test('hasWrongDot 확인', () => {
    const testFn = validator.hasWrongDot;
    expect(testFn('0.1+1')).toBeFalsy();
    expect(testFn('1+1.1)')).toBeFalsy();
    expect(testFn('(1+1).1')).toBeTruthy();
    expect(testFn('1..1+1')).toBeTruthy();
    expect(testFn('1*.1+1')).toBeTruthy();
    expect(testFn('1.1+.1')).toBeTruthy();
    expect(testFn('1.1.1+1')).toBeTruthy();
  });
});
