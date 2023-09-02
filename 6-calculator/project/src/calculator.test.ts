import { describe, expect, test } from '@jest/globals';
import {
  changeToPostfixStack,
  calculateExpressionUsePostfix,
} from '@/calculator';

describe('changeToPostfixStack 함수 테스트', () => {
  const testFn = changeToPostfixStack;

  test('양수 우선 순위가 같은 부호끼리 (더하기,빼기 or 곱하기,나누기)', () => {
    expect(testFn('2+3-1')).toEqual([2, 3, '+', 1, '-']);
    expect(testFn('12+13-12')).toEqual([12, 13, '+', 12, '-']);
    expect(testFn('2*3/2')).toEqual([2, 3, '*', 2, '/']);
    expect(testFn('12/13*12')).toEqual([12, 13, '/', 12, '*']);
  });

  test('음수 혼합 우선 순위가 같은 부호끼리 (더하기,빼기 or 곱하기,나누기)', () => {
    expect(testFn('2+-3-1')).toEqual([2, -3, '+', 1, '-']);
    expect(testFn('-12+-13--12')).toEqual([-12, -13, '+', -12, '-']);
    expect(testFn('-2*-3/-2')).toEqual([-2, -3, '*', -2, '/']);
    expect(testFn('12/-13*-12')).toEqual([12, -13, '/', -12, '*']);
  });

  test('양수, 음수, 혼합 부호', () => {
    expect(testFn('2*-3-1')).toEqual([2, -3, '*', 1, '-']);
    expect(testFn('-12+-13*-12/13')).toEqual([
      -12,
      -13,
      -12,
      '*',
      13,
      '/',
      '+',
    ]);
    expect(testFn('-2+3/-2-2')).toEqual([-2, 3, -2, '/', '+', 2, '-']);
    expect(testFn('-1*2-3/4-5/6+7')).toEqual([
      -1,
      2,
      '*',
      3,
      4,
      '/',
      '-',
      5,
      6,
      '/',
      '-',
      7,
      '+',
    ]);
    expect(testFn('1+2*3-4/5+6')).toEqual([
      1,
      2,
      3,
      '*',
      '+',
      4,
      5,
      '/',
      '-',
      6,
      '+',
    ]);
  });

  test('괄호가 있는 경우', () => {
    expect(testFn('2*(-3-1)')).toEqual([2, -3, 1, '-', '*']);
    expect(testFn('(-1+-2)*(-3/4)')).toEqual([-1, -2, '+', -3, 4, '/', '*']);
    expect(testFn('((-2+3)-2)/2')).toEqual([-2, 3, '+', 2, '-', 2, '/']);
    expect(testFn('(-1*2-3)/4-5/(6+7)')).toEqual([
      -1,
      2,
      '*',
      3,
      '-',
      4,
      '/',
      5,
      6,
      7,
      '+',
      '/',
      '-',
    ]);
  });
});

describe('calculateExpression 함수 테스트', () => {
  const testFn = calculateExpressionUsePostfix;

  test('숫자만 입력된 경우', () => {
    expect(testFn('1')).toBe(1);
    expect(testFn('12')).toBe(12);
    expect(testFn('-1')).toBe(-1);
    expect(testFn('-12')).toBe(-12);
    expect(testFn('0.1')).toBe(0.1);
    expect(testFn('-0.1')).toBe(-0.1);
  });

  test('양수 모두 더하기인 경우', () => {
    expect(testFn('3+4')).toBe(7);
    expect(testFn('1+3+5')).toBe(9);
  });

  test('음수 모두 더하기인 경우', () => {
    expect(testFn('-3+-4')).toBe(-7);
    expect(testFn('-1+-3+-5')).toBe(-9);
  });

  test('혼합 모두 더하기인 경우', () => {
    expect(testFn('-3+4')).toBe(1);
    expect(testFn('1+-3+-5')).toBe(-7);
    expect(testFn('10+-30+25')).toBe(5);
  });

  test('혼합 모두 빼기인 경우', () => {
    expect(testFn('-3-4')).toBe(-7);
    expect(testFn('8-3-5')).toBe(0);
    expect(testFn('10-3-5')).toBe(2);
    expect(testFn('10-30-25')).toBe(-45);
  });

  test('양수 모두 곱하기인 경우', () => {
    expect(testFn('3*4')).toBe(12);
    expect(testFn('1*1*5')).toBe(5);
    expect(testFn('12*3*50')).toBe(1800);
  });

  test('양수 모두 나누기인 경우', () => {
    expect(testFn('13/13')).toBe(1);
    expect(testFn('6/-1/-1')).toBe(6);
  });

  test('혼합, 사칙연산', () => {
    expect(testFn('10+2*2/4')).toBe(11);
    expect(testFn('-6/-1+10*-6/-1')).toBe(66);
    expect(testFn('1+2*3-4/5+6')).toBe(12.2);
  });

  test('괄호, 혼합, 사칙연산', () => {
    expect(testFn('(10+2)*2/4')).toBe(6);
    expect(testFn('-6/(-9+10)*-6/-1')).toBe(-36);
    expect(testFn('(-6+(-9+10))*(-6+1)/-1')).toBe(-25);
  });

  test('제곱 연산', () => {
    expect(testFn('2^2*3')).toBe(12);
    expect(testFn('2*2^3')).toBe(16);
    expect(testFn('2*2+2^3')).toBe(12);
    expect(testFn('2*(2+2)^3')).toBe(128);
    expect(testFn('16*(2+2)^-2')).toBe(1);
    expect(testFn('((1+1)^(2*2))^2')).toBe(256);
    expect(testFn('2*2^2/4')).toBe(2);
  });
});
