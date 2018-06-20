/*
* Author: stevenlee
* Date: 2018/6/20
* Description:
*/


const tookKit = require('./toolkit')

matrix = tookKit.makeMatrix()

console.log(matrix)

const a = Array.from({length: 10}, (v, i) => i)

console.log(a);
console.log(tookKit.shuffle(a));


