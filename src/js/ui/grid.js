/*
* Author: stevenlee
* Date: 2018/6/22
* Description: Generate Jiugongge
*/

const ToolKit = require("../core/toolkit");

class Grid {
  constructor(container) {
    this._$container = container;
  }

  build() {
    const matrix = ToolKit.matrix.makeMatrix()
    const rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom']
    const colGroupClasses = ['col_g_left', 'col_g_center', 'col_g_right']

    const $cells = matrix.map(rowValues => rowValues
      .map((cellValue, index) =>
        $("<span>")
          .addClass(colGroupClasses[index % 3])
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
}

module.exports = Grid;