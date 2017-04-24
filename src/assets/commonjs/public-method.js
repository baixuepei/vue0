/**
 * @file public-method.js 公共方法
 *
 */
import _ from "lodash"
import constant from "./constant.js";
let getDateStr,
    swapItems,
    upRecord,
    downRecord,
    zeroPre;    // 将一位数字以前置'0'的方式补全，返回补全后的字符串

zeroPre = function (digit) {
    var str;
    if (digit < 10) {
        str = '0' + digit;
    } else {
        str = '' + digit;
    }
    return str;
}


/**
 * params: addDayCount
 * 0：today; -1: yesterday; 1 : tomorrow
 */
getDateStr = function (addDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+addDayCount);
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;
    var d = dd.getDate();
    return y+"-"+(m<10?("0"+m):m)+"-"+(d<10?("0"+d):d);
}
//array delete value
Array.prototype.removeByValue = function(val) {
    for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
}
/*array exchange  up and down*/
// 交换数组元素
swapItems = function(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
}

// 上移
upRecord = function(arr, $index) {
    if($index == 0) {
        return;
    }
    swapItems(arr, $index, $index - 1);
}

// 下移
downRecord = function(arr, $index) {
    if($index == arr.length -1) {
        return;
    }
    swapItems(arr, $index, $index + 1);
}

module.exports = {
    getDateStr: getDateStr,
    swapItems: swapItems,
    upRecord: upRecord,
    downRecord: downRecord,
    zeroPre: zeroPre
}
