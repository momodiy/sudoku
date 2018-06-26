/*
* Author: stevenlee
* Date: 2018/6/20
* Description:
*/

const Grid = require("./ui/grid")
const PopupNumbers = require('./ui/popupnumbers')
const grid = new Grid($("#container"))
grid.build()
grid.layout()

const popupNumbers = new PopupNumbers($("#popupNumbers"))

grid.bindPopup(popupNumbers)