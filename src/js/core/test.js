"use strict";
/*
* Author: stevenlee
* Date: 2018/6/25
* Description: 测试代码-洗牌算法重构
*/
let s1 = array => {
    const endIndex = array.length - 2;
    for (let i = 0; i <= endIndex; i++) {
        const j = ~~(Math.random() * (array.length - i)) + i;
        [array[i], array[j]] = [array[j], array[i]]; //注：结构赋值语句之前一定要加分号
    }
    return array;
};
let s2 = array => array.map((v, i, a) => {
    let index = ~~(Math.random() * (a.length - i)) + i;
    [a[i], a[index]] = [a[index], a[i]];
    return a[i];
});
let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(s1(a));
console.log(s2(a));
