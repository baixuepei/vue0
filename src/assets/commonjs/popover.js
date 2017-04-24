
/**
 * @file popover.js 弹出框组件
 *
 */
import vue from "vue"
let alert,      // 提示框
    confirm,    // 确认框
    warningConfirm,
    operatePromptRight,
    operatePromptError, //操作提示框
    operateError,
    prompt,     //确认提示为空
    loading = Loading || new Loading(),
    addOverlay, // 加入遮罩层
    addPopover, // 加入弹出层
    overlay,    // 引用遮罩层
    popover,    // 引用弹出层
    toast,      // 吐司效果
    destroy,  // 销毁dom节点
    showModuleAlert //显示模块弹框
let noop = function () {
};

addOverlay = function () {
    $(document.body).append('<div id="overlay" class="hide"></div>');
    overlay = $("#overlay");
};

addPopover = function () {
    $(document.body).append('<div id="popover-wrapper"></div>');
    popover = $("#popover-wrapper");
};

destroy = function () {
    overlay.remove();
    popover.remove();
};

/**
 * @method alert
 */


alert = function (args) {
    /**
     * @param args {Object} e.g. {message: "你确定？"}
     */
    var message = args.message || "",
        callback = args.callback || noop;

    var html = "<div id='fix-alert' class='popover-alert' style='width: 100%;height: 100%;position: fixed;left: 0;top: 0;z-index: 9999;'>" +
        "<div class='success-end' style='width: 410px;height: 200px;box-shadow:0 0 9px #eeeff4;background: #fff;line-height: 150px;text-align: center;color: #333;position: absolute;left: 0;top:0;right:0;bottom:0;margin: auto;'>" +
        "<div style='display: inline-block;'>" +
        "<p>" + message + "</p>" +
        "</div>" +
        "<button class='btn bg-deep-blue dt-btn' style='width: 98px;height: 33px;display: block;margin: 0 auto;'>确 定</button>" +
        "</div>" +
        "</div>";
    if (overlay && popover) {
        destroy();
    }
    if($(".popover-alert").length == 0) {
        addOverlay();
        addPopover();
        popover.append(html);
        overlay.removeClass("hide");
        $(".dt-btn").focus();
        document.getElementsByClassName('dt-btn')[0].onkeydown = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13) {
                // enter 键
                event.returnValue = false;
                callback();
                destroy();
            }
        };
        $(".dt-btn").on('click', function () {
            callback();
            destroy();
        });
    }
};


/**
 * @method confirm
 */
confirm = function (args) {
    /**
     * @param args {Object} e.g. {message: "你确定？"}
     */
    var title = args.title || null,     // 弹窗title
        htmlMessage = args.html || null,
        message = args.message || "",
        confirmCb = args.confirmCb || noop,
        cancelCb = args.cancelCb || noop,
        confirmBtn = args.confirmBtn || "确认",
        cancelBtn = args.cancelBtn || "取消";

    var html = '<div class="popover popover-comfirm"><header>';
    if (title !== null) {
        html += '<h2 class="popover-title">';
        html += title;
        html += '</h2>';
    }
    html += '</header><div class="popover-content">';

    if (htmlMessage !== null) {
        html += htmlMessage;
    } else {
        html += '<p class="popover-message">';
        html += message;
        html += '</p>';
    }

    html += '</div><footer><div class="button-cta-group-2 clearfix"><button id="confirmBtn" class="button-cta"><h2>';
    html += confirmBtn;
    html += '</h2></button><button id="cancelBtn" class="button-cta"><h2>';
    html += cancelBtn;
    html += '</h2></button></div></footer></div>';
    if($('.popover-comfirm').length == 0) {
        addOverlay();
        addPopover();
        popover.append(html);
        overlay.removeClass("hide");
        $("#confirmBtn").on('click', function () {
            confirmCb();
            destroy();
        });
        $("#cancelBtn").on('click', function () {
            cancelCb();
            destroy();
        });
    }
};
/**
 * @method warning confirm
 */
warningConfirm = function (args) {
    var title = args.title || '',
        message = args.message || '',
        confirmBtn = args.confirmBtn || "确认",
        cancelBtn = args.cancelBtn || "取消",
        confirmCb = args.confirmCb || noop,
        cancelCb = args.cancelCb || noop;
    var html = '<div class="warning-confirm-box"'
    +'style="font-size: 18px;text-align: center;width: 30%;margin: 15% auto;background: #fff;padding: 30px;">'
        + '<header style="color:#4383ea;height:50px;line-height: 50px;">' + title　+ '</header>'
    + '<div class="tips" style="color:#7d818a;font-size: 12px;height:30px;line-height:30px;">' + message　+ '</div>'
        +'<div class="btn-group" style="margin-top:40px;">'
       + '<button id="cancel-confirm" class="btn btn-small-info" style="margin-right:10px">' + cancelBtn　+ '</button>'
        +'<button class="btn btn-small" id="delete-confirm">' + confirmBtn　+ '</button>'
        +'</div>'
        +'</div>';
    if ($(".warning-confirm-box").length == 0) {
        addOverlay();
        addPopover();
        popover.append(html);
        overlay.removeClass("hide");
        $("#delete-confirm").focus().on('click', function () {
            confirmCb();
            destroy();
        });
        $("#cancel-confirm").focus().on('click', function () {
            cancelCb();
            destroy();
        });
    }

};
/**
 * @method operatePrompt
 */
operatePromptRight = function (args) {
    /**
     * @param args {Object} e.g. {message: "你确定？"}
     */
    var message = args.message || "";
    var html = "<div class='confirm dialog-success'>" +
        "<div class='confirm-box' id='confirm-box-alert' style='width: 410px;height: 200px;padding:20px;background:#fff'>" +
        "<div class='confirm-text' style='padding-left:110px;margin-top:20px;'>" +
        "<p class='pull-left'>" +
        "<img src='static/images/success.png' alt='' style='padding-right:15px;'/>" +
        "</p>" +
        "<p class='pull-left' style='color:#6fcd83 ;display: inline-block;line-height: 41px;'>" + message + "</p>" +
        "</div>" +
        "<div class='btn-box text-center' style='clear:both;padding-top:30px;'>" +
        "<button class='btn bg-deep-blue true confirm-btn ' style='width:140px '>确 认</button>" +
        "</div>" +
        "</div>" +
        "</div>";

    if ($(".dialog-success").length == 0) {
        addOverlay();
        addPopover();
        popover.append(html);
        overlay.removeClass("hide");
        $(".confirm-btn").focus().on('click', function () {
            destroy();
        });
    }
};


/**
 * @method operatePromptError
 */
operatePromptError = function (args) {
    /**
     * @param args {Object} e.g. {message: "你确定？"}
     */
    var message = args.message || "",
        upMessage = args.upMessage || "";
    var html = "<div class='confirm dialog-error'>" +
        "<div class='confirm-box' id='confirm-box-error' style='width: 410px;height: 200px;padding:20px;background:#fff'>" +
        "<div class='confirm-text' style='padding-left:120px;margin-top:20px;'>" +
        "<p class='pull-left'>" +
        "<img src='static/images/mistake.png' alt='' style='padding-right:15px;'/>" +
        "</p>";
    if (!upMessage) {
        html += "<p class='pull-left' style='color:#fd5c48 ;display: inline-block;line-height: 41px;'>" + message + "</p>"
    } else {
        html += "<span class='pull-left'  style='color:#fd5c48 ;display: inline-block;font-size:16px;text-align: left;'>" + upMessage + "<br>" + "<i style='font-style:normal; font-size:14px;color:#A7A7A7'>" + message + "</i>" +
            "</span>";
    }
    html += "</div>" +
        "<div class='btn-box text-center' style='clear:both;padding-top:30px '>" +
        "<button class='btn bg-deep-blue true confirm-btn ' style='width:140px'>确 定</button>" +
        "</div>" +
        "</div>" +
        "</div>";

    if ($(".dialog-error").length == 0) {
        addOverlay();
        addPopover();
        popover.append(html);
        overlay.removeClass("hide");
        $(".confirm-btn").focus().on('click', function () {
            destroy();
        });
    }
};

/**
 * @method operateError
 */
operateError = function (args) {
    /**
     * @param args {Object} e.g. {message: "你确定？"}
     */
    var message = args.message || "",
        upMessage = args.upMessage || "",
        informPersonName = JSON.parse(args.informPersonName )|| "";

    var html = "<div class='confirm dialog-error'>" +
        "<div class='confirm-box' style='width: 410px;height: 200px;padding:20px;'>" +
        "<div class='confirm-text clearfix' style='padding-left:90px;'>" +
        "<p class='pull-left'>" +
        "<img src='static/images/mistake.png' alt='' style='padding-right:15px;'/>" +
        "</p>";
    if (!upMessage) {
        html += "<p class='pull-left' style='color:#fd5c48 ;display: inline-block;line-height: 41px;'>" + message + "</p>"
    } else {
        html += "<span class='pull-left'  style='color:#fd5c48 ;display: inline-block;font-size:16px;text-align: left;'>" + upMessage + "<br>" + "<i style='font-style:normal; font-size:14px;color:#A7A7A7'>" + message + "</i>" +
            "</span>";
    }
    html += "</div>" +
        "<div style='text-align: center;padding-left:10px;font-size: 12px;color:#333;margin-top:10px;max-height: 85px;overflow: scroll'>";
    for(var i=0;i<informPersonName.length;i++){
        html+= "<span style='margin-left: 10px'>"+informPersonName[i]+"</span>";
    }
    html+="</div>"+
        "<div class='btn-box' style='clear:both;position: absolute;left: 135px;bottom: 20px ;'>" +
        "<button class='btn bg-deep-blue true confirm-btn ' style='width:140px'>确 定</button>" +
        "</div>" +
        "</div>" +
        "</div>";

    if ($(".dialog-error").length == 0) {
        addOverlay();
        addPopover();
        popover.append(html);
        overlay.removeClass("hide");
        $(".confirm-btn").focus().on('click', function () {
            destroy();
        });
    }
};




/**
 * @method prompt
 */


prompt = function (args) {
    /**
     * @param args {Object} e.g. {message: "你确定？"}
     */
    var params = args.params || "",
        confirmSubmit = args.confirmSubmit || noop;
    console.log(params);

    var html = "<div class='confirm popover-prompt'>" +
        "<div class='confirm-box' style='width: 410px;height: 200px;'>" +
        "<p class='confirm-text'>确定执行操作 ?</p>" +
        "<p class='error' style='margin-top: 15px'>操作后将不可恢复</p>" +
        "<div class='btn-group' style='margin-top: 30px;'>" +
        "<button class='btn bg-deep-blue true confirm-btn'  style='margin-right: 15px;'>确 认</button>" +
        "<button class='btn btn-default false  cancel-btn'>取 消</button>" +
        "</div>" +
        "</div>" +
        "</div>";
    if($(".popover-prompt").length == 0) {
        addOverlay();
        addPopover();
        popover.append(html);
        overlay.removeClass("hide");
        $(".confirm-btn").on('click', function () {
            //confirmSubmit(params);
            destroy();
        });
        $(".cancel-btn").on('click', function () {
            destroy();
        });
    }
};


/**
 * @method toast
 * 土司效果
 * 调用时传入提示信息参数以： {message:'提示内容'}格式
 */
toast = function (args) {
    /**
     * @param args {Object} e.g. {message: "你确定？"}
     */
    var message = args.message || "";
    var div = $("<div class=' popover-toast'>");
    div.append('<div id="floater"></div><p class="popover-message">' + message + '</p>');
    $("body").append(div);

    setTimeout(function () {//动画先将透明度降到0，然后移除
        $('.popover-toast').eq(0).animate({opacity: '0'}, "slow").remove();
    }, 1000);
};

/**
 * 加载遮罩效果
 * 调用后记得要移除
 * 使用：popover.loading.show();
 * 移除：popover.loading.hide();
 */
function Loading() {
    this.on = false;
}

loading.show = function () {
    if (!this.on) {
        var load = $("<div class='popover-loading'><div class='load-img'><img src='static/images/loading.gif'/> <p class='load-msg'>请稍候...</p></div></div>");
        /*load.css({'position':'fixed','left':0,'top':0,'z-index':'100','width':'100%','height':'100%','background': '#8a8787', 'opacity': '.6',
         'vertical-align': 'middle','text-align':'center','font-size':'1.2rem'});*/
        $("body").append(load);
        this.on = true;
    }
};

loading.hide = function () {
    var load;
    if (this.on) {
        load = $(".popover-loading");
        load.remove();
        this.on = false;
    }
};


showModuleAlert = function (args) {
    /**
     * @param args {Object} e.g. {message: "你确定？"}
     */
    var params = args.title || "";
        //confirmSubmit = args.confirmSubmit || noop;
    console.log(params);

    var html = "<div class='mask' >" +
        "<div class='add-show-module text-left'>" +
        "<div class='header'>" + params+
        "</div>"+
        "<div class='clearfix'>"+
        "<div class='col-xs-5'>"+
        "<p>系统名称(不得超过10个字)</p>"+
        "<input type='text' class='form-control'>"+
        "</div>"+
        "<div class='col-xs-7'>"+
        "<p>添加图片(300*400px)</p>"+
        "<input type='text' class='form-control'>"+
        "<button type='button' class='btn btn-primarys bg-deep-blue'>选择文件</button>"+
        "</div>"+
        "</div>"+
        "<div class='add-website'>"+
        "<p>网址链接</p>"+
        "<input type='text' class='form-control'>"+
        "<button type='button' class='btn btn-primarys bg-deep-blue' style='width:82px;'>上传</button>"+
        "</div>"+
        "<div class='add-des'>"+
        "<p>系统简介（不超过20个字）</p>"+
        "<input type='text' class='form-control'>"+
        "</div>"+
        "<div class='text-center modify-show mu-row'>"+
        "<button class='btn bg-deep-blue width-140 save btn-save' >保 存</button>"+
    "<button class='btn bg-white border-deep-blue width-140 cancel-modifyInfo btn-cancel' >取 消</button>"+
    "</div>"+
    "</div>"+
    "</div>"


    if ($(".mask").length == 0) {
        addOverlay();
        addPopover();
        popover.append(html);
        overlay.removeClass("hide");
        $(".btn-save").focus().on('click', function () {
            destroy();
        });
        $(".btn-cancel").focus().on('click', function () {
            destroy();
        });
    }

};





module.exports = {
    alert: alert,
    confirm: confirm,
    warningConfirm:warningConfirm,
    operatePromptRight: operatePromptRight,
    operatePromptError: operatePromptError,
    operateError:operateError,
    prompt: prompt,
    toast: toast,
    loading: loading,
    showModuleAlert:showModuleAlert
};
