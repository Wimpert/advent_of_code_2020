import { readFile, readFileToNumbers } from "../utils/utils";

export function solve() {
  const rawInput = readFileToNumbers("../puzzle_9/input.txt");
  const SIZE = 25;
  //let pt1;
  // for (let i = SIZE; i < rawInput.length; i++) {
  //   const element = rawInput[i];
  //   if (!checkElementAt(rawInput, i, SIZE)) {
  //     pt1 = element;
  //     break;
  //   }
  // }
  //console.log(pt1);
  //const numberToFind = 127;
  const numberToFind = 88311122;

  let found = false;
  let windowSize = 3;

  while (!found) {
    const result = findMatchingWindow(rawInput, numberToFind, windowSize);
    if (!result) {
      windowSize++;
    } else {
      const sorted = result.sort();
      console.log(sorted);
      console.log(sorted[0] + sorted[sorted.length - 1]);
      found = true;
    }
  }
}

const checkElementAt = (
  input: Array<number>,
  position: number,
  windowSize: number
): boolean => {
  const numbers = input
    .slice(position - windowSize, position)
    .sort((a, b) => b - a);
  const indexToStartFrom = findIndexFirstSmallerNumber(
    numbers,
    input[position]
  );

  for (let i = indexToStartFrom; i < numbers.length; i++) {
    if (numbers.indexOf(input[position] - numbers[i], i) !== -1) {
      return true;
    }
  }
  return false;
};

const findIndexFirstSmallerNumber = (
  input: Array<number>,
  ref: number
): number => input.findIndex((i) => i < ref);

const findMatchingWindow = (
  input: Array<number>,
  target: number,
  windowSize: number
): Array<number> => {
  let startIndex = 0;
  while (startIndex < input.length - windowSize) {
    const slice = input.slice(startIndex, startIndex + windowSize);
    const sum = slice.reduce((acc, curr) => acc + curr, 0);
    if (sum === target) {
      return slice;
    }
    startIndex++;
  }
  return null;
};
