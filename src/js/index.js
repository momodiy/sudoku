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
const sweetalert_1 = __importDefault(require("sweetalert"));
const grid = new grid_1.default($("#container"));
grid.build();
grid.layout();
const popupNumbers = new popupnumbers_1.default($("#popupNumbers"));
grid.bindPopup(popupNumbers);
$('#check').on('click', e => {
    grid.check()
        ? sweetalert_1.default("成功", "  游戏检查通过，你太牛逼啦！", "success") && grid.clear()
        : sweetalert_1.default("错误", "  背景标注为红色的部分为漏填或填写错误，请仔细检查后再次尝试。", "error");
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
