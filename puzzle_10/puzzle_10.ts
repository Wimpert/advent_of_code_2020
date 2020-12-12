import { readFileToNumbers } from "../utils/utils";

export function solve() {
  const rawInput = readFileToNumbers("../puzzle_10/input.txt").sort(
    (a, b) => b - a
  );
  // console.log(rawInput);
  // const removable = findDispensibleNumbers(rawInput);
  // console.log(removable);
  // console.log(Math.pow(2, removable.length));

  const pt2 = solvePartB(rawInput);
  console.log(pt2);

  // const max = rawInput.pop() + 3;
  // const length = rawInput.length + 2;
  // const x = Math.floor((max - length) / 2);
  // const y = length - x;
  // const pt1 = x * y;
  // console.log(x, y, pt1);
}

//const calcultateVariations = (numbers: Array<number>): number => {};

const findDispensibleNumbers = (number: Array<number>): Array<number> => {
  return number.filter((x, index, arr) =>
    canBeRemoved(arr[index - 1], arr[index + 1])
  );
};

const canBeRemoved = (prev, next) => {
  return prev - next < 3;
};

// See, I knew this problem wasn't about programming, but math :/
// https://brilliant.org/wiki/tribonacci-sequence/
const tribonacciSequence = [1, 1, 2, 4, 7, 13, 24, 44, 81, 149];
function getTribonacci(num) {
  if (num > tribonacciSequence.length)
    throw `Can't calculate tribonacci number for ${num}`;

  return tribonacciSequence[num - 1];
}

function solvePartB(adapters) {
  const maxJoltage = adapters.sort((x, y) => x - y)[adapters.length - 1];
  const a = adapters.concat([0, maxJoltage + 3]).sort((x, y) => x - y);

  let multiplier = 1;
  let currentRun = 1;
  for (let joltage of a) {
    if (adapters.includes(joltage + 1)) {
      currentRun++;
    } else {
      multiplier *= getTribonacci(currentRun);
      currentRun = 1;
    }
  }
  return multiplier;
}
