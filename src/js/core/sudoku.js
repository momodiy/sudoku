"use strict";
/*
* Author: stevenlee
* Date: 2018/6/22
* Description: Generate sudoku games
*   1. Generate a complete Sudoku array
*   2. Random removal some item
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = __importDefault(require("./generator"));
class Sudoku {
    constructor() {
        const generator = new generator_1.default();
        generator.generate();
        this.solutionMatrix = generator.matrix;
    }
    make(level = 5) {
        // const shouldRid = Math.random() * 9 < level
        this.puzzleMatrix = this.solutionMatrix.map(row => row.map(cell => Math.random() * 9 < level ? 0 : cell));
    }
}
exports.Sudoku = Sudoku;
exports.default = Sudoku;
