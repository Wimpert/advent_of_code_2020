import { readFileToNumbers } from "../utils/utils";

export function solve() {
  const numbers = readFileToNumbers("../puzzle_1/input.txt");

  let found = false;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 1; j < numbers.length; j++) {
      for (let k = 2; k < numbers.length; k++) {
        const sum = numbers[i] + numbers[j] + numbers[k];
        if (sum === 2020) {
          console.log(numbers[i], numbers[j], numbers[k]);
          console.log(numbers[i] * numbers[j] * numbers[k]);

          found = true;
          break;
        }
        if (found) {
          break;
        }
      }

      if (found) {
        break;
      }
    }
  }
}
