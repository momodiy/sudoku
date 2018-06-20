/*
* Author: stevenlee
* Date: 2018/6/20
* Description:
*/

const makeRow = (v = 0) => {
  const array = new Array(9)
  return array.fill(v)
}

const makeMatrix = (v = 0) =>
  Array.from({length: 9},() => makeRow(v))


const a = makeMatrix()
console.log(a);
console.log(a[0][1]=2);
console.log(a);