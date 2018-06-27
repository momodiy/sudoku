"use strict";
/*
* Author: stevenlee
* Date: 2018/6/20
* Description:
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = __importDefault(require("./ui/grid"));
const popupnumbers_1 = __importDefault(require("./ui/popupnumbers"));
const grid = new grid_1.default($("#container"));
grid.build();
grid.layout();
const popupNumbers = new popupnumbers_1.default($("#popupNumbers"));
grid.bindPopup(popupNumbers);
$('#check').on('click', e => {
    if (grid.check()) {
        alert('成功');
    }
});
$('#reset').on('click', e => {
    grid.reset();
});
$('#clear').on('click', e => {
    grid.clear();
});
$('#rebuild').on('click', e => {
    grid.rebuild();
});
