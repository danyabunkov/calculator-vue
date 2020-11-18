export function calculateResult(str: string): number {

  let sign: string = '+';
  let result: number = 0;

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
