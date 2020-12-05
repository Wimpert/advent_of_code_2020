import { readFile } from "../utils/utils";

const FRONT = "F";
const BACK = "B";
const LEFT = "L";
const RIGHT = "R";

const START_ROWS = { min: 0, max: 127 };
const START_SEATS = { min: 0, max: 7 };

export function solve() {
  const rawInput = (readFile("../puzzle_5/input.txt", "\n\n") as any) as string;
  const boadringPasses = rawInput[0].split("\n").map((line) => {
    const rows = line.slice(0, 7);
    const row: number = rows.split("").reduce((acc, curr) => {
      debugger;
      switch (curr) {
        case FRONT:
          return { ...acc, max: acc.max - Math.ceil((acc.max - acc.min) / 2) };
        case BACK:
          return { ...acc, min: acc.min + Math.ceil((acc.max - acc.min) / 2) };
      }
    }, START_ROWS).min;
    const seats = line.slice(7);
    const seat: number = seats.split("").reduce((acc, curr) => {
      switch (curr) {
        case LEFT:
          return { ...acc, max: acc.max - Math.ceil((acc.max - acc.min) / 2) };
        case RIGHT:
          return { ...acc, min: acc.min + Math.ceil((acc.max - acc.min) / 2) };
      }
    }, START_SEATS).min;
    const answer = row * 8 + seat;
    return { row, seat, answer };
  });

  //const part1 = boadringPasses.reduce((acc, curr) => Math.max(acc, curr.answer), 0);

  boadringPasses.sort((a, b) => a.answer - b.answer);
  const part2 =
    boadringPasses.find(
      (val, index) => val.answer + 1 !== boadringPasses[index + 1].answer
    ).answer + 1;
  console.log(part2);
}
