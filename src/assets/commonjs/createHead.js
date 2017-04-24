/**
 *      @ Author:Bates Wang
 *      @ Time: 2016/7/18.
 */
function isPc(){
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}
if(!isPc()){
    (function(){
        var
            phoneScreenWidth = window.screen.width,
            createMeta = document.createElement("meta"),
            initScale = phoneScreenWidth/1280;
        var metaAttr = {
            "name":"viewport",
            "content":"initial-scale="+ initScale +", user-scalable=no, width=1280"
        };
        for(var key in metaAttr){
            createMeta[key] = metaAttr[key];
        }
        document.getElementsByTagName("head")[0].appendChild(createMeta);
    })();
}else{
    document.getElementsByTagName("head")[0].innerHTML+='<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">'
}