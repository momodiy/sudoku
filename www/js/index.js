/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* Author: stevenlee
* Date: 2018/6/20
* Description: ... 
*/

// 矩阵和数组相关的工具
var matrixToolkit = {
  makeRow: function makeRow() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    //当前对象的makeRow方法
    var array = new Array(9);
    return array.fill(v);
  },
  makeMatrix: function makeMatrix() {
    var _this = this;

    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return Array.from({ length: 9 }, function () {
      return _this.makeRow(v);
    });
  },


  /*
  * Fisher-Yates 洗牌算法
  * 循环次数为数组长度减一
  * 每次循环从第一个元素开始，包括其自身向后随机往后抽取一个元素
  * 选中后交换当前元素与抽中元素
  * */
  shuffle: function shuffle(array) {
    return array.map(function (v, i, a) {
      var index = ~~(Math.random() * (a.length - i)) + i;
      var _ref = [a[index], a[i]];
      a[i] = _ref[0];
      a[index] = _ref[1];

      return a[i];
    });
  },

  /**
   * 检查当前位置是否可填写
   * */
  checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
    //取出行、列、宫中所有数据
    var row = matrix[rowIndex]; //获取行数据
    var col = this.makeRow().map(function (v, i) {
      return matrix[i][colIndex];
    }); //获取列数据

    var _boxToolkit$convertTo = boxToolkit.convertToBoxIndex(rowIndex, colIndex),
        boxIndex = _boxToolkit$convertTo.boxIndex; //获取宫数据


    var box = boxToolkit.getBoxCells(matrix, boxIndex);
    for (var i = 0; i < 9; i++) {
      if (row[i] === n || col[i] === n || box[i] === n) {
        //重复、不可填入
        return false;
      }
    }
    return true; // 可以填入
  }
};

//宫坐标系工具
var boxToolkit = {
  getBoxCells: function getBoxCells(matrix, boxIndex) {
    var startRowIndex = Math.floor(boxIndex / 3) * 3;
    var startColIndex = boxIndex % 3 * 3;
    var result = [];
    for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
      var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
      var colIndex = startColIndex + Math.floor(cellIndex % 3);
      result.push(matrix[rowIndex][colIndex]);
    }
    return result;
  },


  /*
  * rowIndex 行索引
  * colIndex 列索引
  * boxIndex 宫索引
  * cellIndex 宫内序号
  * */
  convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 * 3 + colIndex % 3
    };
  },
  convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 + cellIndex % 3
    };
  }
};

//工具集

module.exports = function () {
  function Toolkit() {
    _classCallCheck(this, Toolkit);
  }

  _createClass(Toolkit, null, [{
    key: "matrix",

    //矩阵和数据相关的工具
    get: function get() {
      return matrixToolkit;
    }

    //宫坐标系相关工具

  }, {
    key: "box",
    get: function get() {
      return boxToolkit;
    }
  }]);

  return Toolkit;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
* Author: stevenlee
* Date: 2018/6/20
* Description:
*/

var Grid = __webpack_require__(2);
var PopupNumbers = __webpack_require__(6);
var grid = new Grid($("#container"));
grid.build();
grid.layout();

var popupNumbers = new PopupNumbers($("#popupNumbers"));

grid.bindPopup(popupNumbers);

$('#check').on('click', function (e) {
  if (grid.check()) {
    alert('成功');
  }
});

$('#reset').on('click', function (e) {
  grid.reset();
});

$('#clear').on('click', function (e) {
  grid.clear();
});

$('#rebuild').on('click', function (e) {
  grid.rebuild();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* Author: stevenlee
* Date: 2018/6/22
* Description: Generate Jiugongge
*/

var ToolKit = __webpack_require__(0);
var Sudoku = __webpack_require__(3);
var Checker = __webpack_require__(5);

var Grid = function () {
  function Grid(container) {
    _classCallCheck(this, Grid);

    this._$container = container;
  }

  _createClass(Grid, [{
    key: 'build',
    value: function build() {
      var sudoku = new Sudoku();
      sudoku.make();
      var matrix = sudoku.solutionMatrix; //调试模式：默认填入所有项

      // const matrix = sudoku.puzzleMatrix

      var rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom'];
      var colGroupClasses = ['col_g_left', 'col_g_center', 'col_g_right'];

      var $cells = matrix.map(function (rowValues) {
        return rowValues.map(function (cellValue, index) {
          return $("<span>").addClass(colGroupClasses[index % 3]).addClass(cellValue ? 'fixed' : 'empty').text(cellValue);
        });
      });

      var $divArray = $cells.map(function ($spanArray, index) {
        return $("<div>").addClass("row").addClass(rowGroupClasses[index % 3]).append($spanArray);
      });

      this._$container.append($divArray);
    }
  }, {
    key: 'layout',
    value: function layout() {
      var width = $('span:first', this._$container).width();
      $('span', this._$container).height(width).css({
        "line-height": width + 'px',
        "font-size": width < 32 ? width / 2 + 'px' : ''
      });
    }

    //对应检查按钮，检查数独结果（标记失败的项或提示成功）

  }, {
    key: 'check',
    value: function check() {
      //this map is a jquery function $.map((index,item)=>{...})
      var data = this._$container.children().map(function (rolIndex, div) {
        return $(div).children().map(function (colIndex, span) {
          return +$(span).text() || 0;
        });
      }).toArray().map(function ($data) {
        return $data.toArray();
      });

      var checker = new Checker(data);
      if (checker.check()) {
        return true;
      }
      //  检查不成功
      var marks = checker.matrixMarks;
      console.log(marks);
      this._$container.children().each(function (rolIndex, div) {
        $(div).children().each(function (colIndex, span) {
          if ($(span).hasClass('fixed') || marks[rolIndex][colIndex]) {
            $(span).removeClass('error');
          } else {
            $(span).addClass('error');
          }
        });
      });
    }

    //对应重置按钮，重置之前的数独状态

  }, {
    key: 'reset',
    value: function reset() {
      this._$container.find('span:not(.fixed)').removeClass('error mark1 mark2').addClass('empty').text(0);
    }

    //对应清理按钮，清除错误标记

  }, {
    key: 'clear',
    value: function clear() {
      this._$container.find("span.error").removeClass('error');
    }

    //对应重建按钮，重新生成数独游戏

  }, {
    key: 'rebuild',
    value: function rebuild() {
      this._$container.empty();
      this.build();
      this.layout();
    }
  }, {
    key: 'bindPopup',
    value: function bindPopup(popupNumbers) {
      //事件代理，将click事件绑定到container上
      this._$container.on('click', 'span', function (e) {
        var $cell = $(e.target);
        if ($cell.is('.fixed')) return;
        popupNumbers.popup($cell);
      });
    }
  }]);

  return Grid;
}();

module.exports = Grid;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* Author: stevenlee
* Date: 2018/6/22
* Description: Generate sudoku games
*   1. Generate a complete Sudoku array
*   2. Random removal some item
*/

var Generator = __webpack_require__(4);

module.exports = function () {
  function Sudoku() {
    _classCallCheck(this, Sudoku);

    var generator = new Generator();
    generator.generate();
    this.solutionMatrix = generator.matrix;
  }

  _createClass(Sudoku, [{
    key: 'make',
    value: function make() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

      // const shouldRid = Math.random() * 9 < level
      this.puzzleMatrix = this.solutionMatrix.map(function (row) {
        return row.map(function (cell) {
          return Math.random() * 9 < level ? 0 : cell;
        });
      });
    }
  }]);

  return Sudoku;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* Author: stevenlee
* Date: 2018/6/22
* Description: Generate Sudoku solutions
*/

var Toolkit = __webpack_require__(0);

module.exports = function () {
  function Generator() {
    _classCallCheck(this, Generator);
  }

  _createClass(Generator, [{
    key: "generate",
    value: function generate() {
      while (!this.internalGenerate()) {
        console.warn("try again");
      }
    }
  }, {
    key: "internalGenerate",
    value: function internalGenerate() {
      this.matrix = Toolkit.matrix.makeMatrix();
      // console.log(this.matrix);
      this.orders = Toolkit.matrix.makeMatrix() //随机序列矩阵
      .map(function (row) {
        return row.map(function (v, i) {
          return i;
        });
      }).map(function (row) {
        return Toolkit.matrix.shuffle(row);
      });
      // console.log(this.orders);

      // Toolkit.matrix.makeRow()
      //   .every()

      for (var n = 1; n <= 9; n++) {
        if (!this.fillNumber(n)) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: "fillNumber",
    value: function fillNumber(n) {
      return this.fillRow(n, 0);
    }
  }, {
    key: "fillRow",
    value: function fillRow(n, rowIndex) {
      if (rowIndex > 8) {
        return true;
      }

      var row = this.matrix[rowIndex];
      var orders = this.orders[rowIndex];

      for (var i = 0; i < 9; i++) {
        var colIndex = orders[i];
        if (row[colIndex]) {
          // 当前位置已经有值，跳过
          continue;
        }
        //  检查这个位置是否可填入 n
        if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
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
  }]);

  return Generator;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* Author: stevenlee
* Date: 2018/6/22
* Description: Generate data solutions
*/

var checkArray = function checkArray(array) {
  var length = array.length;
  var marks = new Array(length).fill(true); // 用于标记数组中错误的项
  array.map(function (v, i, a) {
    if (!marks[i]) return;
    // 是否有效 有效：'t' 无效：'f'

    if (!v && v !== 0) {
      return marks[i] = false;
    }
    //  是否重复 从 i+1~~9 是否和i位置数据重复
    for (var j = i + 1; j < length; j++) {
      if (v === array[j]) {
        marks[i] = marks[j] = false;
      }
    }
  });
  return marks;
};

/*
* 输入 matrix 用户完成的数独数据 9*9
* 处理 对matrix行列宫进行检查 并填写marks
* 输出 检查是否成功、marks
* */

var Toolkit = __webpack_require__(0);

module.exports = function () {
  function Checker(matrix) {
    _classCallCheck(this, Checker);

    this._matrix = matrix;
    this._matrixMarks = Toolkit.matrix.makeMatrix(true);
  }

  _createClass(Checker, [{
    key: 'check',
    value: function check() {
      this.checkRows();
      this.checkCols();
      this.checkBoxes();

      // 检查是否成功
      this._success = this._matrixMarks.every(function (row) {
        return row.every(function (mark) {
          return mark;
        });
      });
      return this._success;
    }
  }, {
    key: 'checkRows',
    value: function checkRows() {
      for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
        var row = this._matrix[rowIndex];
        var marks = checkArray(row);

        for (var colIndex = 0; colIndex < marks.length; colIndex++) {
          if (!marks[colIndex]) {
            this._matrixMarks[rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: 'checkCols',
    value: function checkCols() {
      for (var colIndex = 0; colIndex < 9; colIndex++) {
        var cols = [];
        for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
          cols[rowIndex] = this._matrix[rowIndex][colIndex];
        }

        var marks = checkArray(cols);
        for (var _rowIndex = 0; _rowIndex < marks.length; _rowIndex++) {
          if (!marks[_rowIndex]) {
            this._matrixMarks[_rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: 'checkBoxes',
    value: function checkBoxes() {
      for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
        var boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
        var marks = checkArray(boxes);
        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
          if (!marks[cellIndex]) {
            var _Toolkit$box$convertF = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex),
                rowIndex = _Toolkit$box$convertF.rowIndex,
                colIndex = _Toolkit$box$convertF.colIndex;

            this._matrixMarks[rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: 'matrixMarks',
    get: function get() {
      return this._matrixMarks;
    }
  }, {
    key: 'isSuccess',
    get: function get() {
      return this._success;
    }
  }]);

  return Checker;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* Author: stevenlee
* Date: 2018/6/22
* Description: 处理弹出的操作面板
*/

module.exports = function () {
  function PopupNumbers($panel) {
    var _this = this;

    _classCallCheck(this, PopupNumbers);

    this._$panel = $panel.hide().removeClass('hidden');

    this._$panel.on('click', 'span', function (e) {
      var $cell = _this._targetCell;

      var $span = $(e.target);

      //  Backfill style
      if ($span.hasClass('mark1')) {
        if ($cell.hasClass('mark1')) {
          $cell.removeClass('mark1');
        } else {
          $cell.removeClass('mark2').addClass('mark1');
        }
      } else if ($span.hasClass('mark2')) {
        if ($cell.hasClass('mark2')) {
          $cell.removeClass('mark2');
        } else {
          $cell.removeClass('mark1').addClass('mark2');
        }
      } else $span.hasClass('empty');
      {
        // Remove number
        $cell.text(0).addClass('empty');
      }
      _this.hide();

      //  Backfill number
      $cell.removeClass('empty').text($span.text());
    });
  }

  _createClass(PopupNumbers, [{
    key: 'popup',
    value: function popup($cell) {
      this._targetCell = $cell;

      var _$cell$position = $cell.position(),
          left = _$cell$position.left,
          top = _$cell$position.top;

      this._$panel.css({
        left: left + 'px',
        top: top + 'px'
      }).show();
    }
  }, {
    key: 'hide',
    value: function hide() {
      this._$panel.hide();
    }
  }]);

  return PopupNumbers;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map