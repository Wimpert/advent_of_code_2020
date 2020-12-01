"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileToNumbers = exports.readFile = void 0;
const fs = require('fs');
const path = require("path");
function readFile(location, splitter = '\n') {
    return fs.readFileSync(path.resolve(__dirname, location), 'utf8').split(splitter);
}
exports.readFile = readFile;
function readFileToNumbers(location, splitter) {
    return readFile(location, splitter).map(s => Number(s));
}
exports.readFileToNumbers = readFileToNumbers;
//# sourceMappingURL=utils.js.map