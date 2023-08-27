export class Validator {
  isEmpty(value: string) {
    return value === '';
  }

  hasNotAllowed(value: string) {
    const regexp = /[^0-9.+\-*\/()^]/g;
    return regexp.test(value);
  }

  hasDuplicatedOperator(value: string) {
    const regexp = /[+\-*\/(^][+*\/)^]+/g;
    return regexp.test(value);
  }

  isAllowedFirst(value: string) {
    const regexp1 = /^[0-9\-(]/; // 숫자, -, ( 로만 시작
    const regexp2 = /^0{2}/; // 00 으로 시작하는 경우
    return regexp1.test(value) && !regexp2.test(value);
  }

  isAllowedLast(value: string) {
    const regexp = /[0-9)]$/;
    return regexp.test(value);
  }

  isCorrectBracketMate(value: string) {
    const stack = [];
    for (let cur of value) {
      if (cur === '(') {
        stack.push(cur);
      } else if (cur === ')') {
        const last = stack.pop();
        if (!last) return false;
      }
    }
    return stack.length === 0;
  }

  hasWrongBracket(value: string) {
    const regexp = /[0-9]\(|\)[0-9]/g;
    return regexp.test(value);
  }

  hasWrongDot(value: string) {
    const regexp1 = /([0-9]\.)([0-9]\.)+/g; // 1.1.1 인 경우
    const regexp2 = /[^0-9]\.|\.[^0-9]/g; // .) +. 인 경우
    return regexp1.test(value) || regexp2.test(value);
  }

  isValidExpression(value: string) {
    const valid =
      !this.isEmpty(value) &&
      !this.hasNotAllowed(value) &&
      !this.hasDuplicatedOperator(value) &&
      this.isAllowedFirst(value) &&
      this.isAllowedLast(value) &&
      this.isCorrectBracketMate(value) &&
      !this.hasWrongBracket(value);

    return valid;
  }
}
