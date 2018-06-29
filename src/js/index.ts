/*
* Author: stevenlee
* Date: 2018/6/20
* Description:
*/

import Grid from "./ui/grid"
import PopupNumbers from './ui/popupnumbers'
import swal from 'sweetalert'

const grid = new Grid($("#container"))
grid.build()
grid.layout()

const popupNumbers = new PopupNumbers($("#popupNumbers"))

grid.bindPopup(popupNumbers)

$('#check').on('click', e => {
    grid.check()
        ? swal("成功", "  游戏检查通过，你太牛逼啦！", "success")
        : swal("错误", "  背景标注为红色的部分为漏填或填写错误，请仔细检查后再次尝试。", "error")
})

$('#reset').on('click', e => {
    grid.reset()
})

$('#clear').on('click', e => {
    grid.clear()
})

$('#rebuild').on('click', e => {
    grid.rebuild()
})
