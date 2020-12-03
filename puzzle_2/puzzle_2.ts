import { readFile } from "../utils/utils";

export function solve() {
  const rawInput = readFile("../puzzle_2/input.txt");
  const passWords = rawInput.map((input) => {
    const splitted = input.split(":")[0];
    const password = input.split(":")[1].trim();

    const letter = splitted.split(" ")[1];
    const limits = splitted.split(" ")[0];

    const min = Number(limits.split("-")[0]);
    const max = Number(limits.split("-")[1]);

    return new Password(password, { min, max, letter });
  });

  const answer = passWords.filter((p) => p.isValidPartTwo()).length;
  console.log(answer);
}

class Password {
  constructor(
    private readonly password: string,
    private readonly restrictions: { min: number; max: number; letter: string }
  ) {}

  isValid(): boolean {
    const count = this.password
      .split("")
      .reduce(
        (acc, char) => (char === this.restrictions.letter ? ++acc : acc),
        0
      );
    return this.restrictions.min <= count && count <= this.restrictions.max;
  }

  isValidPartTwo(): boolean {
    const splitted = this.password.split("");
    return (
      (splitted[this.restrictions.min - 1] === this.restrictions.letter &&
        splitted[this.restrictions.max - 1] !== this.restrictions.letter) ||
      (splitted[this.restrictions.max - 1] === this.restrictions.letter &&
        splitted[this.restrictions.min - 1] !== this.restrictions.letter)
    );
  }
}
