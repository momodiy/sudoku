"use strict";
/*
* Author: stevenlee
* Date: 2018/6/22
* Description: 处理弹出的操作面板
*/
Object.defineProperty(exports, "__esModule", { value: true });
class PopupNumbers {
    constructor($panel) {
        this._$panel = $panel.hide().removeClass('hidden');
        this._$panel.on('click', 'span', e => {
            const $cell = this._targetCell;
            const $span = $(e.target);
            //  Backfill style
            if ($span.hasClass('mark1')) {
                if ($cell.hasClass('mark1')) {
                    $cell.removeClass('mark1');
                }
                else {
                    $cell.removeClass('mark2').addClass('mark1');
                }
            }
            else if ($span.hasClass('mark2')) {
                if ($cell.hasClass('mark2')) {
                    $cell.removeClass('mark2');
                }
                else {
                    $cell.removeClass('mark1').addClass('mark2');
                }
            }
            else
                ($span.hasClass('empty'));
            {
                // Remove number
                $cell.text(0).addClass('empty');
            }
            this.hide();
            //  Backfill number
            $cell.removeClass('empty').text($span.text());
        });
    }
    popup($cell) {
        this._targetCell = $cell;
        let { left, top } = $cell.position();
        left = left > 288 ? left + 7 - 43.75 * 2 : left;
        this._$panel.css({
            left: `${left}px`,
            top: `${top}px`
        }).show();
    }
    hide() {
        this._$panel.hide();
    }
}
exports.PopupNumbers = PopupNumbers;
exports.default = PopupNumbers;
