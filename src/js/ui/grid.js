/*
* Author: stevenlee
* Date: 2018/6/22
* Description: Generate Jiugongge
*/

const ToolKit = require("../core/toolkit")
const Sudoku = require('../core/sudoku')
const Checker = require('../core/checker')

class Grid {
  constructor(container) {
    this._$container = container;
  }

  build() {
    const sudoku = new Sudoku()
    sudoku.make()
    // const matrix = sudoku.solutionMatrix  //调试模式：默认填入所有项

    const matrix = sudoku.puzzleMatrix

    const rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom']
    const colGroupClasses = ['col_g_left', 'col_g_center', 'col_g_right']

    const $cells = matrix.map(rowValues => rowValues
      .map((cellValue, index) =>
        $("<span>")
          .addClass(colGroupClasses[index % 3])
          .addClass(cellValue ? 'fixed' : 'empty')
          .text(cellValue)
      ));

    const $divArray = $cells.map(($spanArray, index) =>
      $("<div>")
        .addClass("row")
        .addClass(rowGroupClasses[index % 3])
        .append($spanArray)
    )

    this._$container.append($divArray)
  }

  layout() {
    const width = $('span:first', this._$container).width()
    $('span', this._$container)
      .height(width)
      .css({
        "line-height": `${width}px`,
        "font-size": width < 32 ? `${width / 2}px` : ''
      })
  }

  //对应检查按钮，检查数独结果（标记失败的项或提示成功）
  check() {
    //this map is a jquery function $.map((index,item)=>{...})
    const data = this._$container.children()
      .map((rolIndex, div) => $(div).children()
        .map((colIndex, span) => +$(span).text() || 0))
      .toArray()
      .map($data => $data.toArray())


    const checker = new Checker(data)
    if (checker.check()) {
      return true
    }
    //  检查不成功
    const marks = checker.matrixMarks
    console.log(marks);
    this._$container.children()
      .each((rolIndex, div) => {
        $(div).children().each((colIndex, span) => {
          if ($(span).hasClass('fixed') || marks[rolIndex][colIndex]) {
            $(span).removeClass('error')
          } else {
            $(span).addClass('error')
          }
        })
      })

  }

  //对应重置按钮，重置之前的数独状态
  reset() {
this._$container.find('span:not(.fixed)')
  .removeClass('error mark1 mark2')
  .addClass('empty')
  .text(0)
  }

  //对应清理按钮，清除错误标记
  clear() {
this._$container.find("span.error")
  .removeClass('error')
  }

  //对应重建按钮，重新生成数独游戏
  rebuild() {
    this._$container.empty()
    this.build()
    this.layout()
  }


  bindPopup(popupNumbers) {
    //事件代理，将click事件绑定到container上
    this._$container.on('click', 'span', e => {
      const $cell = $(e.target)
      if($cell.is('.fixed'))return
      popupNumbers.popup($cell)
    })
  }
}

module.exports = Grid;