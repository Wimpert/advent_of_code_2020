import { debug } from "console";
import { relative } from "path";
import { readFile } from "../utils/utils";

type EMPTY = "no other";

interface BagContent {
  colors: Array<String>;
  quantities: Array<number>;
}
const regex = /bag[s]{0,1}[,.]{1}/;

export function solve() {
  const rawInput = readFile("../puzzle_7/input.txt");
  const test = rawInput.map((line) => line.split("bags contain"));
  let bagColors = ["shiny gold"];
  //console.log(test);
  // const canBeContentOff = createCanBeContentOf(test);
  // const result: Set<string> = new Set();

  // while (bagColors.length) {
  //   const prevBagColor = bagColors;
  //   bagColors = [];
  //   for (let i = 0; i < prevBagColor.length; i++) {
  //     if (canBeContentOff.get(prevBagColor[i])) {
  //       Array.from(canBeContentOff.get(prevBagColor[i])).forEach((c) =>
  //         bagColors.push(c)
  //       );
  //     }
  //   }
  //   bagColors.forEach((c) => result.add(c));
  // }

  // const resultPT1 = result.size;

  const tree = mapInputToContents(test);
  const resultPt2 = getNumberOfBagInside("shiny gold", tree);
  console.log(resultPt2);
}

const mapInputToContents = (
  input: Array<Array<string>>
): Map<string, BagContent | EMPTY> => {
  const returnVal = new Map<string, BagContent | EMPTY>();

  input.forEach((line) => {
    const content = line[1].split(regex);
    returnVal.set(line[0].trim(), processContent(content));
  });

  return returnVal;
};

const processContent = (content: Array<string>): BagContent | EMPTY => {
  const bagContent = {
    colors: [],
    quantities: [],
  };

  for (let i = 0; i < content.length - 1; i++) {
    if (content[i].trim() === "no other") {
      return "no other";
    }
    const elements = content[i].trim().split(" ");
    bagContent.colors.push(`${elements[1].trim()} ${elements[2].trim()}`);
    bagContent.quantities.push(Number(elements[0]));
  }

  return bagContent;
};

const createCanBeContentOf = (
  input: Array<Array<string>>
): Map<string, Set<string>> => {
  const returnVal = new Map<string, Set<string>>();

  for (let i = 0; i < input.length; i++) {
    const element = input[i];

    if (element[1].indexOf("no other") === -1) {
      const content = element[1].trim().split(",");
      const t = content.map((l) => {
        const splitted = l.trim().split(" ");
        return `${splitted[1].trim()} ${splitted[2].trim()}`;
      });
      t.forEach((bag) => {
        let previous = returnVal.get(bag);
        if (previous) {
          previous.add(element[0].trim());
        } else {
          returnVal.set(bag, new Set<string>().add(element[0].trim()));
        }
      });
    }
  }

  return returnVal;
};

const getNumberOfBagInside = (color: String, tree): number => {
  debugger;
  if (tree.get(color) === undefined || tree.get(color) === "no other") {
    return 0;
  }

  const content: BagContent = tree.get(color);
  return content.colors.reduce(
    (acc, col, index) =>
      acc +
      content.quantities[index] +
      content.quantities[index] * getNumberOfBagInside(col, tree),
    0
  );
};
