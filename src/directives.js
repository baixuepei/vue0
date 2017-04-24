import Vue from "vue";
import _ from "lodash";
Vue.directive('tab-widget',{
    bind: function(){
        var el = this.el;
        $(el).on("click","li",function () {
            $(this).find("a").addClass("active");
            $(this).siblings("li").find("a").each(function(i,el){
                $(el).removeClass("active")
            })
        })
    }
});
Vue.directive('check-all',{
    bind: function(){
        var el = this.el;
        $(el).on("click",function () {
            var flag = $(this).hasClass("active");
            if (flag) {
                $(".checkbox").each(function (i, el) {
                    $(el).removeClass("active");
                });
            } else {
                $(".checkbox").each(function (i, el) {
                    $(el).addClass("active");
                });
            }
        })
    }
});
Vue.directive('toggle-checked',{
    bind: function(){
        var el = this.el;
        $(el).on("click",function () {
            $(this).toggleClass("active");
            if(!$(this).hasClass("active")){
                $(".checkall").removeClass("active")
            }
        })
    }
});
Vue.directive('scroll-load-more',{
    bind: function(){
        var self = this.vm;
        var el = this.el;
        $(el).on("scroll",function () {
            var locked = false;
            setTimeout(function(){
                var scrollWrap = $(".scroll-list-wrap");
                var scrollDocWrap = $(".scroll-list-wrap ul");
                var wrapHeight = scrollWrap.height();
                var wrapDocHeight = scrollDocWrap.height();
                var wrapScrollTop = scrollWrap.scrollTop();
                if(_.gte(wrapScrollTop,wrapDocHeight - wrapHeight - 50)){
                    if(!locked){
                        locked = true;
                        //need to fetch more
                        console.log("start load more files")
                        switch(self.$route.name){
                            case 'devFramework':
                                self.loadMoreFiles(self)
                                break;
                            case 'userManager':
                                self.loadMoreUserList(self)
                                break;
                            case 'roleManager':
                                self.loadMoreRoleList(self)
                                break;
                        }
                    }
                }
            })
        })
    },
    unbind:function(){
        var el = this.el;
        $(el).off("scroll")
    }
})
Vue.directive('scroll-load-more-editor',{
    bind: function(){
        var self = this.vm;
        var el = this.el;
        $(el).on("scroll",function () {
            var locked = false;
            setTimeout(function(){
                var scrollWrap = $(".scroll-list-editor-wrap");
                var scrollDocWrap = $(".scroll-list-editor-wrap ul");
                var wrapHeight = scrollWrap.height();
                var wrapDocHeight = scrollDocWrap.height();
                var wrapScrollTop = scrollWrap.scrollTop();
                if(_.gte(wrapScrollTop,wrapDocHeight - wrapHeight - 50)){
                    if(!locked){
                        locked = true;
                        //need to fetch more
                        console.log("start load more files")
                        switch(self.$route.name){
                            case 'devFrameworkEditor':
                                self.loadMoreFiles(self)
                                break;
                            case 'userManagerEditor':
                                self.loadMoreUserList(self)
                                break;
                            case 'roleManagerEditor':
                                self.loadMoreRoleList(self)
                                break;
                        }
                    }
                }
            })
        })
    },
    unbind:function(){
        var el = this.el;
        $(el).off("scroll")
    }
})
