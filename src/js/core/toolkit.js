/*
* Author: stevenlee
* Date: 2018/6/20
* Description: ... 
*/


// 矩阵和数组相关的工具
const matrixToolkit = {
  makeRow(v = 0) {  //当前对象的makeRow方法
    const array = new Array(9)
    return array.fill(v)
  },

  makeMatrix(v = 0) {
    return Array.from({length: 9}, () => this.makeRow(v))
  },

  /*
  * Fisher-Yates 洗牌算法
  * 循环次数为数组长度减一
  * 每次循环从第一个元素开始，包括其自身向后随机往后抽取一个元素
  * 选中后交换当前元素与抽中元素
  * */
  shuffle(array) {
    return array.map((v, i, a) => {
      let index = ~~(Math.random() * (a.length - i)) + i;
      [a[i], a[index]] = [a[index], a[i]]
      return a[i]
    })
  },
  /**
   * 检查当前位置是否可填写
   * */
  checkFillable(matrix, n, rowIndex, colIndex) {
    //取出行、列、宫中所有数据
    const row = matrix[rowIndex]  //获取行数据
    const col = this.makeRow().map((v, i) => matrix[i][colIndex]) //获取列数据
    const {boxIndex} = boxToolkit.convertToBoxIndex(rowIndex, colIndex)  //获取宫数据
    const box = boxToolkit.getBoxCells(matrix, boxIndex)
    for (let i = 0; i < 9; i++) {
      if (row[i] === n || col[i] === n || box[i] === n) { //重复、不可填入
        return false
      }
    }
    return true   // 可以填入
  }
}

//宫坐标系工具
const boxToolkit = {
  getBoxCells(matrix, boxIndex) {
    const startRowIndex = Math.floor(boxIndex / 3) * 3
    const startColIndex = boxIndex % 3 * 3
    let result = []
    for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
      const rowIndex = startRowIndex + Math.floor(cellIndex / 3)
      const colIndex = startColIndex + Math.floor(cellIndex % 3)
      result.push(matrix[rowIndex][colIndex])
    }
    return result
  },

  /*
  * rowIndex 行索引
  * colIndex 列索引
  * boxIndex 宫索引
  * cellIndex 宫内序号
  * */
  convertToBoxIndex(rowIndex, colIndex) {
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 * 3 + colIndex % 3
    }
  },
  convertFromBoxIndex(boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 + cellIndex % 3
    }
  }
};

//工具集

module.exports = class Toolkit {
  //矩阵和数据相关的工具
  static get matrix() {
    return matrixToolkit;
  }

  //宫坐标系相关工具
  static get box() {
    return boxToolkit;
  }
};