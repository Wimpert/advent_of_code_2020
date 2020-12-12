import { readFile } from "../utils/utils";

// Yeah, Jetty!
var Jetty = require("jetty");

// Create a new Jetty object. This is a through stream with some additional
// methods on it. Additionally, connect it to process.stdout
var jetty = new Jetty(process.stdout);

type Seat = "L" | "." | "#";
type Seats = Array<Array<Seat>>;

export async function solve() {
  const rawInput = readFile("../puzzle_11/input.txt").map((line) =>
    line.trim().split("")
  );
  let seats = rawInput as Seats;
  for (let i = 0; i < 150; i++) {
    debugger;
    seats = run2(seats);
    print(`${i}\n`.concat(printSeats(seats)));
    //console.log(`${i}\n`.concat(printSeats(seats)));
    //printSeatsWithJetty(seats);
    await sleep(30);
  }
  console.log(countAllOccupiedSeat(seats));
  return new Promise<void>((resolve, reject) => {
    resolve();
  });
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const run = (rawInput): Seats => {
  return (rawInput = rawInput.map((line: Array<Seat>, lineIndex) => {
    return line.map((seat: Seat, seatIndex: number) =>
      handleSeats(seat, lineIndex, seatIndex, rawInput)
    );
  }));
};

const run2 = (rawInput): Seats => {
  return (rawInput = rawInput.map((line: Array<Seat>, lineIndex) => {
    return line.map((seat: Seat, seatIndex: number) =>
      handleSeats2(seat, lineIndex, seatIndex, rawInput)
    );
  }));
};

const handleSeats = (
  seat: Seat,
  lineIndex: number,
  seatIndex: number,
  allSeats: Seats
) => {
  switch (seat) {
    case ".":
      return seat;
    case "L":
      return getNumberOfOccupiedSeats(lineIndex, seatIndex, allSeats) === 0
        ? "#"
        : "L";
    case "#":
      return getNumberOfOccupiedSeats(lineIndex, seatIndex, allSeats) >= 4
        ? "L"
        : "#";
    default:
      throw new Error("Unknown seat");
  }
};

const handleSeats2 = (
  seat: Seat,
  lineIndex: number,
  seatIndex: number,
  allSeats: Seats
) => {
  switch (seat) {
    case ".":
      return seat;
    case "L":
      return getNumberOfOccupiedVisibleSeats(lineIndex, seatIndex, allSeats) ===
        0
        ? "#"
        : "L";
    case "#":
      return getNumberOfOccupiedVisibleSeats(lineIndex, seatIndex, allSeats) >=
        5
        ? "L"
        : "#";
    default:
      throw new Error("Unknown seat");
  }
};

const getNumberOfOccupiedSeats = (
  lineIndex: number,
  seatIndex: number,
  allSeats: Seats
) => {
  let occupiedSeats = 0;
  for (let i = lineIndex - 1; i <= lineIndex + 1; i++) {
    if (i === lineIndex) {
      occupiedSeats =
        occupiedSeats +
        countSeatsInRow([
          getSeat(i, seatIndex - 1, allSeats),
          getSeat(i, seatIndex + 1, allSeats),
        ]);
    } else {
      occupiedSeats =
        occupiedSeats +
        countSeatsInRow([
          getSeat(i, seatIndex - 1, allSeats),
          getSeat(i, seatIndex, allSeats),
          getSeat(i, seatIndex + 1, allSeats),
        ]);
    }
  }
  return occupiedSeats;
};

const getSeat = (lineIndex, seatIndex, seats): Seat => {
  if (lineIndex === -1 || lineIndex >= seats.length) {
    return ".";
  }
  if (seatIndex === -1 || seatIndex >= seats[0].length) {
    return ".";
  }
  return seats[lineIndex][seatIndex];
};

const getSeatPT2 = (lineIndex, seatIndex, seats): Seat | "$" => {
  if (lineIndex === -1 || lineIndex >= seats.length) {
    return "$";
  }
  if (seatIndex === -1 || seatIndex >= seats[0].length) {
    return "$";
  }
  return seats[lineIndex][seatIndex];
};

const printSeats = (input: Seats): string => {
  return input.reduce((acc, line) => {
    return `${acc}${line.reduce((acc, s) => `${acc}${s}`, "").concat("\n")}`;
  }, "");
};

const countAllOccupiedSeat = (seats: Seats): number => {
  return seats.reduce((acc, row) => acc + countSeatsInRow(row), 0);
};

const getNumberOfOccupiedVisibleSeats = (
  lineIndex: number,
  seatIndex: number,
  allSeats: Seats
): number => {
  const directions = [
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
  ] as Array<[number, number]>;

  let numberFound = 0;

  for (let i = 0; i < directions.length; i++) {
    if (
      lookInDirection(lineIndex, seatIndex, directions[i], allSeats) === "#"
    ) {
      ++numberFound;
    }
  }

  return numberFound;
};

const lookInDirection = (
  lineIndex: number,
  seatIndex: number,
  direction: [number, number],
  allSeats: Seats
): Seat => {
  let foundSeat = ".";
  const coor = [lineIndex, seatIndex];
  while (foundSeat === ".") {
    coor[0] = coor[0] + direction[0];
    coor[1] = coor[1] + direction[1];
    foundSeat = getSeatPT2(coor[0], coor[1], allSeats);
  }

  return foundSeat === "$" ? "." : (foundSeat as Seat);
};

const countSeatsInRow = (row: Array<Seat>): number => {
  return row.reduce((seatAcc, seat) => (seat === "#" ? ++seatAcc : seatAcc), 0);
};

const print = (s: string) => {
  // Clear the screen
  jetty.clear();

  // write something
  jetty.moveTo([0, 0]);
  //jetty.nuke();
  jetty.text(s);
};

const printSeatsWithJetty = (seats: Seats) => {
  jetty.clear();

  for (let i = 0; i < seats.length; i++) {
    const line = seats[i];
    for (let j = 0; j < line.length; j++) {
      const seat = line[j];
      jetty.moveTo([i, j]);
      jetty.text(seat);
    }
    jetty.moveTo([i, line.length]);
    jetty.text("\n");
  }
};
