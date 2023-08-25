export class Validator {
  expression;
  constructor() {
    this.expression = undefined;
  }

  get validatorExpression() {
    return this.expression;
  }

  set validatorExpression(value) {
    this.expression = value;
  }

  isEmpty(value?: string) {
    const target = value ?? this.expression;
    return target === '';
  }

  hasNotAllowed(value?: string) {
    const target = value ?? this.expression;
    const regexp = /[^0-9.+\-*\/()]/g;
    return regexp.test(target);
  }

  hasDuplicatedOperator(value?: string) {
    const target = value ?? this.expression;
    const regexp = /[+\-*\/(][+*\/)]+/g;
    return regexp.test(target);
  }

  isAllowedFirst(value?: string) {
    const target = value ?? this.expression;
    const regexp1 = /^[0-9\-(]/; // 숫자, -, ( 로만 시작
    const regexp2 = /0{2}/; // 00 으로 시작하는 경우
    return regexp1.test(target) && !regexp2.test(target);
  }

  isAllowedLast(value?: string) {
    const target = value ?? this.expression;
    const regexp = /[0-9)]$/;
    return regexp.test(target);
  }

  isCorrectBracketMate(value?: string) {
    const target = value ?? this.expression;
    const stack = [];
    for (let cur of target) {
      if (cur === '(') {
        stack.push(cur);
      } else if (cur === ')') {
        const last = stack.pop();
        if (!last) return false;
      }
    }
    return stack.length === 0;
  }

  hasWrongBracket(value?: string) {
    const target = value ?? this.expression;
    const regexp = /[0-9]\(|\)[0-9]/g;
    return regexp.test(target);
  }

  hasWrongDot(value?: string) {
    const target = value ?? this.expression;
    const regexp1 = /([0-9]\.)([0-9]\.)+/g; // 1.1.1 인 경우
    const regexp2 = /[^0-9]\.|\.[^0-9]/g; // .) +. 인 경우
    return regexp1.test(target) || regexp2.test(target);
  }

  validate() {
    const valid =
      !this.isEmpty() &&
      !this.hasNotAllowed() &&
      !this.hasDuplicatedOperator() &&
      this.isAllowedFirst() &&
      this.isAllowedLast() &&
      this.isCorrectBracketMate() &&
      !this.hasWrongBracket();

    return valid;
  }
}
