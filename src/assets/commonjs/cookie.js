/**
 * @file Cookie 组件
 */

let setCookie, getCookie, removeCookie, defaults;
defaults = {
    name:'',        // cookie 名字
    value: '',      // 值
    expires: '',    // 周期，可选
    path: '/',      // 路径
    domain: '',     // 域名
    secure: ''
};
setCookie = function (options) {
    var config = $.extend({}, defaults, options);
    var cdata = config.name + "=" + config.value;
    if(config.expires) {
        var d = new Date();
        d.setTime(d.getTime() + config.expires * 24 * 60 * 60 * 1000);
        cdata += "; expires=" + d.toGMTString();
    }
    cdata +=config.path ? ("; path=" + config.path) : "" ;
    cdata +=config.domain ? ("; domain=" + config.domain) : "" ;
    cdata +=config.secure ? ("; secure=" + config.secure) : "" ;
    document.cookie = cdata;
};
getCookie = function (name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) {
        return decodeURIComponent(arr[2]);
    } else {
        return null;
    }
};
removeCookie = function (name) {
    setCookie(name,"",-1);
};

module.exports = {
    setCookie: setCookie,
    getCookie: getCookie,
    removeCookie: removeCookie
};
