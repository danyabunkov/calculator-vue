export function calculateResult(str: string): number {

  let sign: string = '+';
  let result: number = 0;

  /** идем по массиву строк, если это '+' или '-', то запоминаем знак, если число, то складываем */
  str.trim().split(' ').forEach(el => {
    if (el === '+' || el === '-') {
      sign = el;
    } else {
      sign === '+'
        ? result += +el
        : result -= +el;
    }
  });

  return result;
}
