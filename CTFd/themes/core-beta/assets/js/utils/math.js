export function cumulativeSum(arr) {
  let sum = 0;
  return arr.map(val => sum += Number(val));
}
