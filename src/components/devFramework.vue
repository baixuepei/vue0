<template>
    <div v-show="$route.name == 'devFramework'" class="body-programa-content-list block">
        <div class="filter-bar clearfix">
            <!--<nav class="nav-paging col-md-9 col-xs-12 pull-left">
                <div class="col-md-3 col-xs-6">
                    <div class="dropdown pull-left clearfix">
                        <button class="btn clearfix dropdown-toggle dropdown-md" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            <span class="pull-left">pageSize:  {{pageSize}}</span>
                            <span class="pull-right"><img src="../assets/images/slide-down.png" alt=""></span>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2" style="position:absolute">
                            <li v-for="s in selectPageSize"
                            @click="changePageSize(s)"><a href="javascript:void(0)">{{s}}</a></li>
                        </ul>
                    </div>
                </div>
                <ul class="pagination pagination-lg col-md-9 col-xs-6 pull-right">
                    <li @click="goToThisPage(currentPageNum - 1)"
                    ><a href="javascript:void(0)">&laquo;</a></li>
                    <li v-for="p in pageCounts"
                        :class="{active: p + 1 == currentPageNum}"
                        @click="goToThisPage(p + 1)"
                    ><a href="javascript:void(0)">{{p + 1}}</a>
                    </li>
                    <li @click="goToThisPage(currentPageNum + 1)"
                    ><a href="javascript:void(0)">&raquo;</a></li>
                </ul>
            </nav>-->
            <search-bar></search-bar>
            <!--<div class="col-md-1">
                <div class="dropdown pull-left clearfix">
                    <button class="btn clearfix dropdown-toggle dropdown-md" type="button">
                        <span class="pull-left">最新发布</span>
                        <span class="pull-right"><img src="../assets/images/arrow.png" alt=""></span>
                    </button>
                </div>
            </div>
            <div class="col-md-1 col-md-offset-2">
                <div class="dropdown pull-left clearfix">
                    <button class="btn clearfix dropdown-toggle dropdown-md" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        <span class="pull-left">From</span>
                        <span class="pull-right"><img src="../assets/images/slide-down.png" alt=""></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu2" style="position:absolute">
                        <li><a href="javascript:void(0)">1</a></li>
                        <li><a href="javascript:void(0)">2</a></li>
                        <li><a href="javascript:void(0)">3</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-1 col-md-offset-1">
                <div class="dropdown pull-left clearfix">
                    <button class="btn clearfix dropdown-toggle dropdown-md" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        <span class="pull-left">To</span>
                        <span class="pull-right"><img src="../assets/images/slide-down.png" alt=""></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu3" style="position:absolute">
                        <li><a href="javascript:void(0)">1</a></li>
                        <li><a href="javascript:void(0)">2</a></li>
                        <li><a href="javascript:void(0)">3</a></li>
                    </ul>
                </div>
            </div>-->
        </div>
        <ul class="programa-title-list-ul">
            <li class="title">
                <div style="font-weight:600" class="pull-left col-md-8 col-xs-8">文章名称</div>
                <div style="font-weight:600;text-align: right;" class="pull-right col-md-4 col-xs-4">发布时间
                    <img
                        src="../assets/images/arrow.png"
                        alt="">
                </div>
            </li>
        </ul>
        <div class="programa-title-list-wrap scroll-list-wrap" v-scroll-load-more>
            <ul>
                <li class="list"
                    v-for="l in devFrameworkList"
                    track-by="$index"
                    @click="goToDetail(l,$index)"
                >
                    <div class="pull-left col-md-8 col-xs-8 title">{{l.title}}</div>
                    <div class="pull-right col-md-4 col-xs-4" style="text-align: right;">{{l.updateTime | formateTime}}</div>
                </li>
            </ul>
        </div>
    </div>
    <div v-show="$route.name == 'detail' || $route.name == 'addDetail'  || $route.name == 'detailEditor' || $route.name == 'devFrameworkEditor' || $route.name == 'devFrameworkEditorAlert'" class="body-programa-detail-list block">
        <router-view></router-view>
    </div>

</template>

<script>
    import Vue from "vue";
    import searchBar from "./searchBar.vue";
    import servers from "../servers.js";
    import popover from "../assets/commonjs/popover.js";
    import filters from "../filters.js";
    import constant from "../assets/commonjs/constant.js";
    import directives from "../directives.js";
    import {setBeatTimer,updatedevFrameworkList,updateCurrentPageNum,initPageFiles,loadMoreFiles} from '../vuex/actions'
    import {getdevFrameworkList,getHasNextPage,getPageSize,getCurrentPageNum} from "../vuex/getters"

    export default{
        components: {
            searchBar
        },
        vuex: {
            getters: {
                devFrameworkList : getdevFrameworkList,
                hasNextPage : getHasNextPage,
                pageSize: getPageSize,
                currentPageNum: getCurrentPageNum,
            },
            actions: {
                setBeatTimer,
                updatedevFrameworkList,
                updateCurrentPageNum,
                initPageFiles,
                loadMoreFiles
            }
        },
        data:function(){
            return {
                //pageCounts: 1,
                //selectPageSize: [10,20,30]
            }
        },
        route: {
            data: function(){
                var self = this;
                //init page
                self.initPageFiles(self);
            }
        },
        methods: {
            /*initPage: function(){
                var self = this;
                var params = {
                    skip: 'contentText',
                    order: 'desc', //asc:正序，desc:倒序
                    sortBy: 'sortNum',
                    page: 1,
                    perPage: self.pageSize
                };
                servers.getContentColumns(self,params,function(res){
                    console.log(res)
                    self.updatedevFrameworkList(res)
                });
                //get columns counts
                /!*servers.getContentColumnsCount(self,function(res){
                    console.log(res)
                    self.pageCounts = Math.ceil(res.count / pageSize)
                });*!/
                //reset currentPageNum
                self.updateCurrentPageNum(1,true)
            },*/
            goToDetail: function(l,index){
                var self = this;
                if(l.type == 1){
                    sessionStorage.setItem("CURRENT_DETAIL_ID",l.id);
                    sessionStorage.setItem("CURRENT_DETAIL_OBJ",JSON.stringify(l));
                    self.$route.router.go({ name: 'detail', params: {did: l.id}})
                }else{
                    window.open(l.linkUrl,l.linkTarget)
                }
            },

            /*goToThisPage: function(p){
                var self = this;
                self.currentPageNum = p;
                if(self.currentPageNum <= 0 || self.currentPageNum >= self.pageCounts + 1){
                    popover.toast({message: '已经到底了'})
                    return
                }
                var params = {
                    skip: 'contentText',
                    order: 'desc',
                    sortBy: 'sortNum',
                    page: self.currentPageNum,
                    perPage: self.pageSize
                };
                servers.getContentColumns(self,params,function(res){
                    console.log(res)
                    self.updatedevFrameworkList(res)
                });
            },
            changePageSize: function(s){
                var self = this;
                self.pageSize = s;
                self.initPage(s);
            },*/
            adaptWindowSize: function(){
                var windowHeight = $(window).height();
                var filterBarHeight = $(".filter-bar").outerHeight(true);
                var headerHeight = $(".topbar-menu").outerHeight(true);
                var contentListTitleHeight = $(".programa-title-list-ul").outerHeight(true);
                //var navPagingHeight = $(".nav-paging").outerHeight(true);
                $(".programa-title-list-wrap").height(windowHeight - filterBarHeight - headerHeight - contentListTitleHeight - 50)
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
    @import "css/devFramework.css";
</style>
