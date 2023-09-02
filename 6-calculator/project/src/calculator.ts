enum Operators {
  plus = '+',
  minus = '-',
  times = '*',
  obelus = '/',
  square = '^',
}

enum Brackets {
  frontBracket = '(',
  backBracket = ')',
}

type TOperatorFn = (a: number, b: number) => number;

const subtract: TOperatorFn = (a, b) => a - b;
const sum: TOperatorFn = (a, b) => a + b;
const multiply: TOperatorFn = (a, b) => a * b;
const divide: TOperatorFn = (a, b) => a / b;
const square: TOperatorFn = (a, b) => a ** b;

const operatorFnTable: Record<Operators, TOperatorFn> = {
  [Operators.minus]: subtract,
  [Operators.plus]: sum,
  [Operators.times]: multiply,
  [Operators.obelus]: divide,
  [Operators.square]: square,
};

const operatorImportanceTable: Record<Operators & Brackets, number> = {
  [Operators.minus]: 1,
  [Operators.plus]: 1,
  [Operators.times]: 2,
  [Operators.obelus]: 2,
  [Operators.square]: 3,
  [Brackets.frontBracket]: 4,
  [Brackets.backBracket]: 4,
};

const isOperator = (str: any) => {
  return Object.values(Operators).includes(str);
};

const isBracket = (str: any) => {
  return Object.values(Brackets).includes(str);
};

// 식 그대로 계산하기
const calculateExpression = (expression: string) =>
  Function(`return ${expression}`)();

// 올바른 계산식을 받아 후위표기식 배열로 변경
// 음수 기호(-)는 여러번 있는 경우도 올바른 계산식으로 한다. (ex. '3+---2')
export const changeToPostfixStack = (
  expression: string,
): (string | number)[] => {
  const infixStack = expression.split('');
  infixStack.reverse();
  const operatorStack = [];
  const postfixStack = [];
  let number = '';
  // 최초 숫자가 음수일 때
  if (infixStack[infixStack.length - 1] === Operators.minus) {
    infixStack.pop();
    number += '-';
  }
  let continuousFlag = false;
  let minusFlag = false;

  // 연산자인 경우 기존 연산자와 현재 연산자의 우선순위를 비교한다.
  // 기존 연산자의 우선순위가 높거나 같은 경우 기존 연산자를 빼서 postfixStack 에 넣는다.
  // 기존 연산자의 우선순위가 낮을 경우 operatorStack 에 넣는다.
  // 단 '(' 는 postfixStack 에 넣지 않으며, ')' 를 만나면 operatorStack 의 모든 연산자를 옮긴다.
  while (infixStack.length) {
    const curStr = infixStack.pop();

    if (isBracket(curStr)) {
      if (number !== '') {
        postfixStack.push(+number);
        number = '';
      }

      if (curStr === Brackets.backBracket) {
        continuousFlag = false;
        while (operatorStack.length) {
          const prev = operatorStack.pop();
          if (prev !== Brackets.frontBracket) {
            postfixStack.push(prev);
          } else {
            break;
          }
        }
        continue;
      }
      if (curStr === Brackets.frontBracket) {
        continuousFlag = true;
        operatorStack.push(curStr);
        continue;
      }
    }

    if (isOperator(curStr)) {
      // 연속된 연산자일 때는 무조건 음수용 마이너스
      if (continuousFlag && curStr === Operators.minus) {
        minusFlag = !minusFlag;
        continue;
      }
      continuousFlag = true;

      if (number !== '') {
        postfixStack.push(+number);
        number = '';
      }

      const prevOperator = operatorStack[operatorStack.length - 1];

      if (!operatorStack.length || prevOperator === Brackets.frontBracket) {
        operatorStack.push(curStr);
      } else {
        const curOperatorImportance = operatorImportanceTable[curStr];

        for (let i = operatorStack.length - 1; i >= 0; i--) {
          const prevOperator = operatorStack[i];
          if (prevOperator === Brackets.frontBracket) break;
          const prevOperatorImportance = operatorImportanceTable[prevOperator];
          if (prevOperatorImportance >= curOperatorImportance) {
            postfixStack.push(operatorStack.pop());
          }
        }
        operatorStack.push(curStr);
      }
    }
    // 숫자일 때
    else {
      if (minusFlag) {
        number += '-';
      }
      minusFlag = false;
      continuousFlag = false;
      number += curStr;
    }
  }

  // 종료 후 남은 숫자와 기호 넣어주기
  if (number !== '') {
    postfixStack.push(+number);
  }
  while (operatorStack.length) {
    const prev = operatorStack.pop();
    if (prev !== Brackets.frontBracket) {
      postfixStack.push(prev);
    } else {
      break;
    }
  }

  return postfixStack;
};

// 올바른 후위표기 배열을 받아 계산한다.
const calculatePostfixStack = (stack: (string | number)[]): number => {
  const numberStack = [];
  stack.reverse();
  while (stack.length) {
    const cur = stack.pop();
    if (isOperator(cur)) {
      const b = numberStack.pop();
      const a = numberStack.pop();
      const operatorFn = operatorFnTable[cur];
      const result = operatorFn(a, b);
      numberStack.push(result);
    } else {
      numberStack.push(cur);
    }
  }

  return numberStack[0] as number;
};

export const calculateExpressionUsePostfix = (expression: string) => {
  const postfixStack = changeToPostfixStack(expression);
  const result = calculatePostfixStack(postfixStack);
  return result;
};
