import { readFile } from "../utils/utils";

export function solve() {
  const rawInput = readFile("../puzzle_4/input.txt", "\n\n");
  const passports = rawInput.map((line) => new Passport(line));
  const answer = passports.filter((p) => p.isValid()).length;
  console.log(answer);
}

class Passport {
  static VALID_KEYS = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  static VALID_EYE_COLORS = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

  static HAIR_COLOR_REGEX = /^#[0-9A-F]{6}$/i;
  static PID_REGEX = /^\d{9}$/;

  byr: string;
  iyr: string;
  eyr: string;
  hgt: string;
  hcl: string;
  ecl: string;
  pid: string;
  cid: string;

  constructor(data: string) {
    data
      .split("\n")
      .join(" ")
      .split(" ")
      .forEach((keyValue) => {
        const [key, value] = keyValue.split(":");
        this[key] = value;
      });
  }

  isValid(): boolean {
    const keys = Object.keys(this);
    for (let i = 0; i < Passport.VALID_KEYS.length; i++) {
      if (!(keys.indexOf(Passport.VALID_KEYS[i]) !== -1)) {
        return false;
      }
    }
    return this.allFieldAreValid();
  }

  allFieldAreValid(): boolean {
    const byrValid = 1920 <= Number(this.byr) && Number(this.byr) <= 2002;
    const iyrValid = 2010 <= Number(this.iyr) && Number(this.iyr) <= 2020;
    const eyrValid = 2020 <= Number(this.eyr) && Number(this.eyr) <= 2030;
    const hgtValid = this.validateHgt();
    const hclValid = Passport.HAIR_COLOR_REGEX.test(this.hcl);
    const eclValid = Passport.VALID_EYE_COLORS.indexOf(this.ecl) !== -1;
    const pidValid = Passport.PID_REGEX.test(this.pid);

    return (
      byrValid &&
      iyrValid &&
      eyrValid &&
      hgtValid &&
      hclValid &&
      eclValid &&
      pidValid
    );
  }

  private validateHgt(): boolean {
    if (this.hgt.indexOf("cm") !== -1) {
      const heigth = Number(this.hgt.split("cm")[0]);
      return 150 <= heigth && heigth <= 193;
    } else if (this.hgt.indexOf("in") !== -1) {
      const heigth = Number(this.hgt.split("in")[0]);
      return 59 <= heigth && heigth <= 76;
    } else {
      return false;
    }
  }
}
