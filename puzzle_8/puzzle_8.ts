import { readFile } from "../utils/utils";

export function solve() {
  const rawInput = readFile("../puzzle_8/input.txt");
  const computer = new Computer(
    rawInput.map((line) => {
      const splitted = line.split(" ");
      const instruction = new Instruction(
        splitted[0] as InstructionValue,
        Number(splitted[1])
      );
      return instruction;
    })
  );

  // const pt1 = computer.run();
  // console.log(pt1);

  const pt2 = computer.optimize();
  console.log(pt2);
}

enum InstructionValue {
  NOOP = "nop",
  ACCUMULATOR = "acc",
  JUMP = "jmp",
}

class Instruction {
  constructor(
    public readonly value: InstructionValue,
    public readonly argument: number
  ) {}
}

class Computer {
  public pointerLocation = 0;
  public pointerValue = 0;
  public iteration = 1;
  public readonly instructions: Array<{
    instruction: Instruction;
    visitedAt: Array<number>;
  }>;
  constructor(public readonly inst: Array<Instruction>) {
    this.instructions = inst.map((i) => ({ instruction: i, visitedAt: [] }));
  }

  run(): { value: number; infinite: boolean } {
    while (
      this.pointerLocation < this.instructions.length &&
      !this.instructions[this.pointerLocation].visitedAt.length
    ) {
      this.instructions[this.pointerLocation].visitedAt.push(this.iteration);
      this.iteration++;
      const instruction = this.instructions[this.pointerLocation].instruction;
      switch (instruction.value) {
        case InstructionValue.NOOP:
          this.pointerLocation++;
          break;
        case InstructionValue.ACCUMULATOR:
          this.pointerValue = this.pointerValue + instruction.argument;
          this.pointerLocation++;
          break;
        case InstructionValue.JUMP:
          this.pointerLocation = this.pointerLocation + instruction.argument;
          break;
      }
    }
    return {
      value: this.pointerValue,
      infinite: this.pointerLocation < this.instructions.length,
    };
  }

  optimize(): { value: number; infinite: boolean } {
    for (let index = 0; index < this.instructions.length; index++) {
      if (
        this.instructions[index].instruction.value === InstructionValue.JUMP
      ) {
        const newInstructions = this.instructions.map(
          (inst, instructionIndex) => {
            return index === instructionIndex
              ? { ...inst.instruction, value: InstructionValue.NOOP }
              : inst.instruction;
          }
        );
        const result = new Computer(newInstructions).run();
        if (!result.infinite) {
          return result;
        }
      }

      if (
        this.instructions[index].instruction.value === InstructionValue.NOOP
      ) {
        const newInstructions = this.instructions.map(
          (inst, instructionIndex) => {
            return index === instructionIndex
              ? { ...inst.instruction, value: InstructionValue.JUMP }
              : inst.instruction;
          }
        );
        const result = new Computer(newInstructions).run();
        if (!result.infinite) {
          return result;
        }
      }
    }

    return null;
  }
}
