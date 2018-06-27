/*
* Author: stevenlee
* Date: 2018/6/20
* Description: ... 
*/

export interface IBoxCoord {
    boxIndex: number;
    cellIndex: number;
}

export interface IRolColCoord {
    colIndex: number;
    rowIndex: number;
}

//宫坐标系工具
const boxToolkit = {
    getBoxCells(matrix: number[][], boxIndex: number): number[] {
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
    convertToBoxIndex(rowIndex: number, colIndex: number): IBoxCoord {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        }
    },
    convertFromBoxIndex(boxIndex: number, cellIndex: number): IRolColCoord {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        }
    }
};


// 矩阵和数组相关的工具
class MatrixToolkit {

    /*
    * 重载
    * 在这里，指定参数时与不指定参数时调用不同的方法
    * 也就可以做到传入参数时指定参数类型为泛型T
    * 不指定参数时使用默认参数
    *
    * 泛型：
    * 定义一个T类型
    * 传入的参数为T类型
    * 返回值也是T类型
    * qc：`v:T = 0` 这里会报错，因为T类型不能得到一个number类型的值
    * */

    static makeRow(): number[];
    static makeRow<T>(v: T): T[];
    static makeRow(v: any = 0): any[] {  //当前对象的makeRow方法
        const array = new Array(9)
        return array.fill(v)
    }


    static makeMatrix(): number[][];
    static makeMatrix<T>(v: T): T[][];
    static makeMatrix(v: any = 0): any[][] {
        return Array.from({length: 9}, () => this.makeRow(v))
    }


    /*
    * Fisher-Yates 洗牌算法
    * 循环次数为数组长度减一
    * 每次循环从第一个元素开始，包括其自身向后随机往后抽取一个元素
    * 选中后交换当前元素与抽中元素
    * */

    static shuffle<T>(array: T[]): T[] {
        return array.map((v, i, a) => {
            let index = ~~(Math.random() * (a.length - i)) + i;
            [a[i], a[index]] = [a[index], a[i]]
            return a[i]
        })
    }


    /**
     * 检查当前位置是否可填写
     * */
    static checkFillable(matrix: number[][], n: number, rowIndex: number, colIndex: number): boolean {
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


//工具集

export class Toolkit {
    //矩阵和数据相关的工具
    //显示定义返回值类型为MatrixToolkit的类型
    static get matrix(): typeof MatrixToolkit {
        return MatrixToolkit;
    }

    //宫坐标系相关工具
    static get box() {
        return boxToolkit;
    }
};

export default Toolkit;