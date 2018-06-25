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

console.log(checkArray([0, 1, 2, 3, 5, 5, 5, 6, 7, 8, 9,12,3]));
console.log(checkArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));