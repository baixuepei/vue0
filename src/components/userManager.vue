<template>
    <div class="body-user-list">
        <header class="header">
            <h1 class="pull-left">用户列表</h1>
        </header>
        <ul class="user-list-ul">
            <li class="title">
                <div style="font-weight:600" class="col-md-1 col-xs-1">序号</div>
                <div style="font-weight:600" class="col-md-2 col-xs-2">用户名称</div>
                <div style="font-weight:600" class="col-md-3 col-xs-3">创建时间</div>
                <div style="font-weight:600" class="col-md-6 col-xs-6">权限列表</div>
            </li>
        </ul>
        <div class="user-list-wrap scroll-list-wrap" v-scroll-load-more>
            <ul>
                <li class="list"
                    v-for="l in userList"
                    track-by="$index">
                    <div class="col-md-1 col-xs-1">{{$index + 1}}</div>
                    <div class="col-md-2 col-xs-2">{{l.name}}</div>
                    <div class="col-md-3 col-xs-3">{{l.updateTime | formateTime}}</div>
                    <div class="col-md-6 col-xs-6">{{l.limitList}}</div>
                </li>
            </ul>
        </div>
    </div>
    <div v-show="$route.name == 'userManagerEditor' || $route.name == 'userManagerEditorAlert'">
        <router-view></router-view>
    </div>
</template>
<script>
    import Vue from "vue";
    import servers from "../servers.js";
    import popover from "../assets/commonjs/popover.js";
    import filters from "../filters.js";
    import constant from "../assets/commonjs/constant.js";
    import directives from "../directives.js";
    import {setBeatTimer,updateuserList,initUserList,loadMoreUserList} from '../vuex/actions'
    import {getuserList,gethasUserListNextPage,getcurrentUserListPageNum} from "../vuex/getters"

    export default{
        components: {

        },
        vuex: {
            getters: {
                userList : getuserList,
                hasUserListNextPage : gethasUserListNextPage,
                currentUserListPageNum: getcurrentUserListPageNum
            },
            actions: {
                setBeatTimer,
                updateuserList,
                initUserList,
                loadMoreUserList
            }
        },
        data:function(){
            return {

            }
        },
        route: {
            data: function(){
                var self = this;
                //init page
                self.initUserList(self);
            }
        },
        methods: {
            adaptWindowSize: function(){
                var windowHeight = $(window).height();
                var headerHeight = $(".topbar-menu").outerHeight(true);
                var userHeaderHeight = $(".body-user-list .header").outerHeight(true);
                var contentListTitleHeight = $(".user-list-ul").outerHeight(true);
                $(".user-list-wrap").height(windowHeight - headerHeight - userHeaderHeight - contentListTitleHeight - 60)
            }
        },
        ready: function () {
            var self = this;
            self.$nextTick(function(){
                self.adaptWindowSize();
            })

            $(window).resize(function () {
                self.adaptWindowSize();
            });

            //set beatTime
            //self.setBeatTimer()

        }
    }
</script>
<style scoped>
    @import "css/userManager.css";
</style>
