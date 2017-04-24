import Vue from "vue"
import pubMethod from "assets/commonjs/public-method"

Vue.filter('formateTime', function (value) {
    var dateObj = new Date(+value);
    return '' + dateObj.getFullYear() + '-' + pubMethod.zeroPre(dateObj.getMonth() + 1) + '-' + pubMethod.zeroPre(dateObj.getDate())
        + ' ' + pubMethod.zeroPre(dateObj.getHours()) + ':' + pubMethod.zeroPre(dateObj.getMinutes()) + ':' + pubMethod.zeroPre(dateObj.getSeconds());
    return value
})

Vue.filter('toSBC',{
    read:function(value){
        var result = "";
        var len = value.length;
        for(var i=0;i<len;i++){
            var cCode = value.charCodeAt(i);
            //全角与半角相差（除空格外）：65248（十进制）
            cCode = (cCode>=0xFF01 && cCode<=0xFF5E)?(cCode - 65248) : cCode;
            //处理空格
            cCode = (cCode==0x03000)?0x0020:cCode;
            result += String.fromCharCode(cCode);
        }
        return result;
    },
    write:function(value){
        var result = "";
        var len = value.length;
        for(var i=0;i<len;i++){
            var cCode = value.charCodeAt(i);
            //全角与半角相差（除空格外）：65248（十进制）
            cCode = (cCode>=0xFF01 && cCode<=0xFF5E)?(cCode - 65248) : cCode;
            //处理空格
            cCode = (cCode==0x03000)?0x0020:cCode;
            result += String.fromCharCode(cCode);
        }
        return result;
    }
})

Vue.filter('fieldIsEmpty',function(value){
    if(!value) {
        return '&nbsp;';
    } else {
        return value;
    }
})

Vue.filter('onlyNumber', {
    read: function (value) {
        return value.replace(/[^0-9]/g,'')
    },
    write: function (value) {
        return value.replace(/[^0-9]/g,'')
    }
})

Vue.filter('transToChar', {
    read: function (value) {
        return value.replace(/[^a-zA-Z,]/g,'').toUpperCase()
    },
    write: function (value) {
        return value.replace(/[^a-zA-Z,]/g,'').toUpperCase()
    }
})
Vue.filter('transToCharNumber', {
    read: function (value) {
        return value.replace(/[^a-zA-Z0-9,]/g,'').toUpperCase()
    },
    write: function (value) {
        return value.replace(/[^a-zA-Z0-9,]/g,'').toUpperCase()
    }
})

Vue.filter('removeBlankSpace', {
    read: function (value) {
        return value.replace(/\s/g,'');
    },
    write: function (value) {
        return value.replace(/\s/g,'');
    }
});


//Vue.filter('iconUrlFilters', {
//    read: function (value) {
//        return value.substring(0,30);
//    },
//    write: function (value) {
//        return value.substring(0,30);
//    }
//})
