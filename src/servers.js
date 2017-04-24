import Vue from "vue";
import popover from "src/assets/commonjs/popover.js";
import constant from "src/assets/commonjs/constant.js";
import _ from "lodash";

let doLogin,
    logout,
    getUserInfo,
    userHeartbeat,
    getNavigationCount,
    getNavigation,
    addNavigation,
    deleteNavigation,
    updateNavigation,
    searchContentColumns,
    getContentColumnsCount,
    getContentColumns,
    addContentColumn,
    deleteContentColumn,
    updateContentColumn;

let options = {};
let optionsPost = {};

let transParamsToOptions = function (params) {
    options.params = params;
};

let transParamsToOptionsPost = function (params) {
    var paramsjson = JSON.stringify(params);
    optionsPost = {requestData: paramsjson};
};

let verifyAccessToken = function (self, res) {
    if ((res && res.resultCode && res.resultCode == -1) || (res && res[0] && res[0].resultCode && res[0].resultCode == -1)) {
        sessionStorage.clear();
        clearInterval(self.timer);
        var callback = function () {
            self.$route.router.go({name: "login"});
        };
        popover.loading.hide();
        popover.alert({message: "登录失效，请重新登录", callback: callback})
        return 0;
    } else {
        return 1;
    }
};

let handleError = function(self,res){
    popover.loading.hide();
    console.log(res);
    switch(res.status){
        case 401:
            sessionStorage.clear();
            clearInterval(self.timer);
            var callback = function () {
                self.$route.router.go({name: "login"});
            };
            popover.alert({message: res.body, callback: callback})
            break;
        case 500:
            popover.alert({message: "系统异常，请重新刷新"})
            /*self.showErrorPage = true;
            self.errorTipsText = "系统异常，请重新刷新";*/
            break;
        case 503:
            popover.alert({message: "服务器暂停服务"})
            /*self.showErrorPage = true;
            self.errorTipsText = "服务器暂停服务";*/
            break;
        case 0:
            /*self.showErrorPage = true;
            self.errorTipsText = "网络不稳定，请稍后重试";*/
            break;
        default:
            popover.alert({message: res.statusText})
            /*self.showErrorPage = true;
            self.errorTipsText = res.statusText;*/
            break;
    }
    return
}

/*sessions module*/
doLogin = (self,params, next, error) => {
    transParamsToOptionsPost(params);
    Vue.http.post("sessions/create", optionsPost).then((res) => {
        sessionStorage.clear();
        res = res.json();
        next && next(res);
        var accessToken = sessionStorage.getItem("access_token") || "";
        Vue.http.headers.common['accessToken'] = accessToken;
    }, (res) => {
        error && error();
        handleError(self,res)
    }).catch((e) => {
        error && error();
        console.log(e);
    }).finally(() => {

    })
}

logout = (self, params, next) => {
    transParamsToOptionsPost(params);
    Vue.http.post("sessions/delete", optionsPost).then((res) => {
        console.log(res)
        sessionStorage.clear();
        next && next();
        self.$route.router.go({name: "login"});
    }, (res) => {
        handleError(self,res)
    }).catch((e) => {
        console.log(e);
    }).finally(() => {

    });
}

getUserInfo = (self, params, next) => {
    transParamsToOptions(params);
    Vue.http.get("sessions/read", options).then((res) => {
        res = res.json();
        next && next(res);
    }, (res) => {
        handleError(self,res)
    }).catch((e) => {
        console.log(e);
    }).finally(() => {

    })
}

userHeartbeat = (params,next,errNext) => {
    transParamsToOptionsPost(params);
    Vue.http.post("sessions/update",optionsPost).then((res) => {
        res = res.json();
        console.log(res);
        next && next(res);
    }, (res) => {
        errNext && errNext(res);
    }).catch((e) => {
        popover.loading.hide();
        console.log(e);
    }).finally(() => {
        //popover.loading.hide();
    })
}

/*navigations module*/
getNavigation = (self, params, next) => {
    transParamsToOptions(params);
    Vue.http.get("navigations/read", options).then((res) => {
        res = res.json();
        next && next(res);
    }, (res) => {
        handleError(self,res)
    }).catch((e) => {
        console.log(e);
    }).finally(() => {

    })
}

getNavigationCount = (self, next) => {
    Vue.http.get("navigations/count").then((res) => {
        res = res.json();
        next && next(res);
    }, (res) => {
        handleError(self,res)
    }).catch((e) => {
        console.log(e);
    }).finally(() => {

    })
}

addNavigation = (self, params, next) => {
    transParamsToOptionsPost(params);
    Vue.http.post("navigations/create", optionsPost).then((res) => {
        res = res.json();
        next && next(res);
    }, (res) => {
        handleError(self,res)
    }).catch((e) => {
        console.log(e);
    }).finally(() => {

    })
}

deleteNavigation = (self, params, next) => {
    transParamsToOptionsPost(params);
    Vue.http.post("navigations/delete",optionsPost).then((res) => {
        console.log(res)
        next && next()
    }, (res) => {
        handleError(self,res)
    }).catch((e) => {
        console.log(e);
    }).finally(() => {

    })
}

updateNavigation = (self, params, next) => {
    transParamsToOptionsPost(params);
    console.log(optionsPost);
    Vue.http.post("navigations/update", optionsPost).then((res) => {
        res = res.json();
        next && next(res);
    }, (res) => {
        handleError(self,res)
    }).catch((e) => {
        console.log(e);
    }).finally(() => {

    })
}

/*contents module*/
searchContentColumns = (self,params,next,showLoading) => {
    if(showLoading){
        popover.loading.show();
    }
    console.log(params)
    Vue.http.get("contents/read?"+"title=%"+params.title+"%&source=%"+params.source+"%&contentText=%"+params.contentText+"%").then((res) => {
        if(showLoading){
            popover.loading.hide();
        }
        console.log(res);
        res = res.json();
        if (verifyAccessToken(self, res)) {
            next && next(res)
        }
    }, (res) => {
        handleError(self,res);
    }).catch((e) => {
        popover.loading.hide();
        console.log(e);
    }).finally(() => {
        popover.loading.hide();
    })
}
getContentColumns = (self,params,next,showLoading) => {
    if(showLoading){
        popover.loading.show();
    }
    transParamsToOptions(params);

    Vue.http.get("contents/read",options).then((res) => {
        if(showLoading){
            popover.loading.hide();
        }
        console.log(res);
        res = res.json();
        if (verifyAccessToken(self, res)) {
            next && next(res)
        }
    }, (res) => {
        handleError(self,res);
    }).catch((e) => {
        popover.loading.hide();
        console.log(e);
    }).finally(() => {
        
    })
}

getContentColumnsCount = (self,next,showLoading) => {
    if(showLoading){
        popover.loading.show();
    }

    Vue.http.get("contents/count").then((res) => {
        if(showLoading){
            popover.loading.hide();
        }
        res = res.json();
        if (verifyAccessToken(self, res)) {
            next && next(res)
        }
    }, (res) => {
        handleError(self,res);
    }).catch((e) => {
        popover.loading.hide();
        console.log(e);
    }).finally(() => {
        popover.loading.hide();
    })
}

addContentColumn = (self,params,next,showLoading) => {
    if(showLoading){
        popover.loading.show();
    }
    transParamsToOptionsPost(params);

    Vue.http.post("contents/create",optionsPost).then((res) => {
        if(showLoading){
            popover.loading.hide();
        }
        //res = res.json();
        if (verifyAccessToken(self, res)) {
            next && next(res)
        }
    }, (res) => {
        handleError(self,res);
    }).catch((e) => {
        popover.loading.hide();
        console.log(e);
    }).finally(() => {
        popover.loading.hide();
    })
}

deleteContentColumn = (self,params,next,showLoading) => {
    if(showLoading){
        popover.loading.show();
    }
    transParamsToOptionsPost(params);
    Vue.http.post("contents/delete",optionsPost).then((res) => {
        console.log(res)
        if(showLoading){
            popover.loading.hide();
        }
        next && next();
    }, (res) => {
        handleError(self,res);
    }).catch((e) => {
        popover.loading.hide();
        console.log(e);
    }).finally(() => {
        popover.loading.hide();
    })
}

updateContentColumn = (self,params,next,showLoading) => {
    if(showLoading){
        popover.loading.show();
    }
    transParamsToOptionsPost(params);

    Vue.http.post("contents/update",optionsPost).then((res) => {
        if(showLoading){
            popover.loading.hide();
        }
        //res = res.json();
        if (verifyAccessToken(self, res)) {
            next && next(res)
        }
    }, (res) => {
        handleError(self,res);
    }).catch((e) => {
        popover.loading.hide();
        console.log(e);
    }).finally(() => {
        popover.loading.hide();
    })
}






module.exports = {
    doLogin:doLogin,
    logout:logout,
    getUserInfo:getUserInfo,
    userHeartbeat:userHeartbeat,
    getNavigationCount:getNavigationCount,
    getNavigation: getNavigation,
    addNavigation: addNavigation,
    deleteNavigation: deleteNavigation,
    updateNavigation: updateNavigation,
    searchContentColumns:searchContentColumns,
    getContentColumnsCount: getContentColumnsCount,
    getContentColumns: getContentColumns,
    addContentColumn: addContentColumn,
    deleteContentColumn: deleteContentColumn,
    updateContentColumn: updateContentColumn
}
