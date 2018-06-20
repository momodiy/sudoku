/*
* Author: stevenlee
* Date: 2018/6/20
* Description: ... 
*/

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
    let arr = []
    array.map((v, i, k) => arr[i] = k[~~(Math.random() * (array.length - i)) + i])
    return arr
  }
}

module.exports = matrixToolkit;