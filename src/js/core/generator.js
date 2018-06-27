"use strict";
/*
* Author: stevenlee
* Date: 2018/6/22
* Description: Generate Sudoku solutions
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = __importDefault(require("./toolkit"));
class Generator {
    generate() {
        while (!this.internalGenerate()) {
            console.warn("try again");
        }
    }
    internalGenerate() {
        this.matrix = toolkit_1.default.matrix.makeMatrix();
        // console.log(this.matrix);
        this.orders = toolkit_1.default.matrix.makeMatrix() //随机序列矩阵
            .map(row => row.map((v, i) => i))
            .map(row => toolkit_1.default.matrix.shuffle(row));
        // console.log(this.orders);
        // Toolkit.matrix.makeRow()
        //   .every()
        for (let n = 1; n <= 9; n++) {
            if (!this.fillNumber(n)) {
                return false;
            }
        }
        return true;
    }
    fillNumber(n) {
        return this.fillRow(n, 0);
    }
    fillRow(n, rowIndex) {
        if (rowIndex > 8) {
            return true;
        }
        const row = this.matrix[rowIndex];
        const orders = this.orders[rowIndex];
        for (let i = 0; i < 9; i++) {
            const colIndex = orders[i];
            if (row[colIndex]) { // 当前位置已经有值，跳过
                continue;
            }
            //  检查这个位置是否可填入 n
            if (!toolkit_1.default.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                continue;
            }
            row[colIndex] = n;
            // 去下一行填写n，填写失败，则继续在当前行寻找下一个位置
            if (!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0;
                continue;
            }
            return true;
        }
        return false;
    }
}
exports.Generator = Generator;
exports.default = Generator;
