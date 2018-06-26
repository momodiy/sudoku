/*
* Author: stevenlee
* Date: 2018/6/22
* Description: Generate sudoku games
*   1. Generate a complete Sudoku array
*   2. Random removal some item
*/

const Generator = require('./generator')

module.exports = class Sudoku {

  constructor() {
    const generator = new Generator()
    generator.generate()
    this.solutionMatrix = generator.matrix
  }

  make(level = 5) {
    // const shouldRid = Math.random() * 9 < level
    this.puzzleMatrix = this.solutionMatrix.map(row => row.map(cell => Math.random() * 9 < level ? 0 : cell))

  }
}
