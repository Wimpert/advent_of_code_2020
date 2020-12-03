import { readFile } from "../utils/utils";

export function solve() {
  const rawInput = readFile("../puzzle_3/input.txt");

  const map = constructMap(rawInput);
  const slopes: Array<Slope> = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ];

  const answer = slopes.reduce((acc, slope) => {
    let counter = 0;
    let position: Coordinates = { x: 0, y: 0 };

    while (position.y < map.length) {
      const object = map[position.y][position.x];
      if (object === "#") {
        counter++;
      }
      position = move(position, map, slope);
    }
    return acc * counter;
  }, 1);

  console.log(answer);
}

type Map = Array<Array<"." | "#">>;

const constructMap = (input: Array<string>): Map => {
  return input.map((line) => line.split("")) as Map;
};

type Coordinates = {
  x: number;
  y: number;
};

type Slope = Coordinates;

const move = (
  coordinates: Coordinates,
  map: Map,
  slope: Slope
): Coordinates => {
  const returnVal = { ...coordinates };

  returnVal.x = (coordinates.x + slope.x) % map[0].length;
  returnVal.y = coordinates.y + slope.y;

  return returnVal;
};
