"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve = void 0;
const utils_1 = require("../utils/utils");
function solve() {
    const numbers = utils_1.readFileToNumbers("../puzzle_1/input.txt");
    let found = false;
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 1; j < numbers.length; j++) {
            for (let k = 2; k < numbers.length; k++) {
                const sum = numbers[i] + numbers[j] + numbers[k];
                if (sum === 2020) {
                    console.log(numbers[i], numbers[j], numbers[k]);
                    console.log(numbers[i] * numbers[j] * numbers[k]);
                    found = true;
                    break;
                }
                if (found) {
                    break;
                }
            }
            if (found) {
                break;
            }
        }
    }
}
exports.solve = solve;
//# sourceMappingURL=puzzle_1.js.map