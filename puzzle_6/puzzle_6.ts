import { access } from "fs";
import { readFile } from "../utils/utils";

export function solve() {
  const rawInput: Array<Array<string>> = readFile(
    "../puzzle_6/input.txt",
    "\n\n"
  ).map((line) => line.split("\n"));

  const pr1 = rawInput.reduce(
    (acc, curr: Array<string>) => acc + countUniqueQuestions(curr),
    0
  );

  const result = rawInput.reduce(
    (acc, curr: Array<string>) => acc + findCommonQuestions(curr),
    0
  );
  console.log(result);
}

const countUniqueQuestions = (questions: Array<string>): number =>
  questions.reduce((acc, letters) => {
    letters.split("").forEach((letter) => acc.add(letter));
    return acc;
  }, new Set<string>()).size;

const findCommonQuestions = (questions: Array<string>): number => {
  let result = questions[0].split("");
  for (let i = 1; i < questions.length; i++) {
    const elements = questions[i].split("");
    result = result.filter((r) => elements.indexOf(r) !== -1);
    if (result.length === 0) {
      break;
    }
  }
  return result.length;
};
