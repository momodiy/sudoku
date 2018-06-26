/*
* Author: stevenlee
* Date: 2018/6/22
* Description: Generate data solutions
*/

const checkArray = array => {
  const length = array.length
  const marks = new Array(length).fill(true) // 用于标记数组中错误的项
  array.map((v, i, a) => {
    if (!marks[i]) return
    // 是否有效 有效：'t' 无效：'f'

    if (!v && v !== 0) {
      return marks[i] = false
    }
    //  是否重复 从 i+1~~9 是否和i位置数据重复
    for (let j = i + 1; j < length; j++) {
      if (v === array[j]) {
        marks[i] = marks[j] = false
      }
    }
  })
  return marks
}

/*
* 输入 matrix 用户完成的数独数据 9*9
* 处理 对matrix行列宫进行检查 并填写marks
* 输出 检查是否成功、marks
* */

const Toolkit = require('./toolkit')

class Checker {

  constructor(matrix) {
    this._matrix = matrix
    this._matrixMarks = Toolkit.matrix.makeMatrix(true)
  }

  get matrixMarks() {
    return this._matrixMarks
  }

  get isSuccess() {
    return this._success
  }

  check() {
    this.checkRows()
    this.checkCols()
    this.checkBoxes()

    // 检查是否成功
    this._success = this._matrixMarks.every(row => row.every(mark => mark))
    return this._success
  }

  checkRows() {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      const row = this._matrix[rowIndex]
      const marks = checkArray(row)

      for (let colIndex = 0; colIndex < marks.length; colIndex++) {
        if (!marks[colIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false
        }
      }
    }
  }

  checkCols() {
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      const cols = []
      for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        cols[rowIndex] = this._matrix[rowIndex][colIndex]
      }

      const marks = checkArray(cols)
      for (let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
        if (!marks[rowIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false
        }
      }
    }
  }

  checkBoxes() {
    for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
      const boxes = Toolkit.box.getBoxCells(matrix, boxIndex)
      const marks = checkArray(boxes)
      for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
        if (!marks[cellIndex]) {
          const {rowIndex, colIndex} = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex)
          this._matrixMarks[rowIndex][colIndex] = false
        }
      }
    }
  }
}