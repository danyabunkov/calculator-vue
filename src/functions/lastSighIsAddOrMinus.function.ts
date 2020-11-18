export function lastSighIsAddOrMinus(str: string): boolean {
  return  str[str.length - 2] === '+' || str[str.length - 2] === '-';
}
