<template>
    <div class="body-programa-content-editor">
        <div class="operate-btn-group clearfix">
            <div class="col-md-6 col-xs-9">
                <button class="btn btn-default" style="margin-right:20px;"
                v-link="{name:'addDetail'}">创建新文章</button>
                <button class="btn btn-default"
                @click="addLink">添加链接</button>
            </div>
            <div class="col-md-4 col-xs-3" @click="batchDelete">
                <button class="btn btn-default-info">批量删除</button>
            </div>
            <search-bar></search-bar>

        </div>
        <ul class="programa-title-editor-list-ul col-md-12 clearfix">
            <li class="title clearfix">
                <div class="col-md-1 pull-left">
                    <div class="checkbox checkall" v-check-all
                         @click="selectAllArticle($event)">
                        <a class="" href="javascript:void(0)"></a>
                    </div>
                </div>
                <div style="font-weight:600" class="col-md-5 col-xs-4">文章名称</div>
                <div style="font-weight:600" class="col-md-3 col-xs-4">发布时间</div>
                <div style="font-weight:600" class="col-md-3 col-xs-3 pull-right">操作</div>
            </li>
        </ul>
        <div class="programa-title-editor-list-wrap scroll-list-editor-wrap col-md-12" v-scroll-load-more-editor>
            <ul class="clearfix">
                <li class="list"
                    v-for="l in devFrameworkList"
                    track-by="$index"
                >
                    <div class="col-md-1 pull-left">
                        <div class="checkbox" v-toggle-checked
                        @click="selectArticle(l,$event)">
                            <a class="" href="javascript:void(0)"></a>
                        </div>
                    </div>
                    <div class="col-md-5 col-xs-4 title">{{l.title}}</div>
                    <div class="col-md-3 col-xs-4">{{l.updateTime | formateTime}}</div>
                    <div class="col-md-3 col-xs-3 pull-right">
                        <i class="glyphicon glyphicon-arrow-up" @click="upRecord(l,$index)"></i>
                        <i class="glyphicon glyphicon-arrow-down" @click="downRecord(l,$index)"></i>
                        <i class="glyphicon glyphicon-trash" @click="deleteCurrentArticle(l)"></i>
                        <i class="glyphicon glyphicon-pencil" @click='editCurrentArticleTitle(l)'></i>
                    </div>
                </li>
            </ul>
        </div>

    </div>
    <router-view></router-view>
</template>

<script>
    import Vue from "vue";
    import searchBar from "./searchBar";
    import servers from "../servers.js";
    import popover from "../assets/commonjs/popover.js";
    import filters from "../filters.js";
    import directives from "../directives.js";
    import constant from "../assets/commonjs/constant.js";
    import pubMethods from "../assets/commonjs/public-method.js";
    import {updateShowProgramaAlertFlag,updatedevFrameworkList,initPageFiles,loadMoreFiles} from '../vuex/actions'
    import {getShowProgramaAlertFlag,getdevFrameworkList} from "../vuex/getters"
    import _ from "lodash";

    export default{
        components: {
            searchBar
        },
        vuex: {
            getters: {
                showProgramaAlertFlag: getShowProgramaAlertFlag,
                devFrameworkList : getdevFrameworkList
            },
            actions: {
                updateShowProgramaAlertFlag,
                updatedevFrameworkList,
                initPageFiles,
                loadMoreFiles
            }
        },
        data:function(){
            return {
                deleteIdParamsArr: [],
                deleteIdStringArr:[],
                transferParams: {
                    title:'',
                    linkUrl:'',
                    linkTarget:'',
                    modifyLink: false,
                    id:''
                }
            }
        },
        route: {
            data: function(){
                var self = this;

            }
        },
        methods: {
            selectAllArticle: function(e){
                var self = this;
                self.deleteIdParamsArr = []
                self.deleteIdStringArr = []
                if($(e.currentTarget).hasClass("active")){
                    _.each(self.devFrameworkList,(l,index) => {
                        var _params = {
                            id:''
                        };
                        _params.id = l.id
                        self.deleteIdParamsArr.push(_params)
                        self.deleteIdStringArr.push(l.id)
                    })
                }else{
                    self.deleteIdParamsArr = []
                    self.deleteIdStringArr = []
                }
                console.log(self.deleteIdParamsArr)
                console.log(self.deleteIdStringArr)
            },
            selectArticle: function(l,e){
                var self = this;
                var _params = {
                    id:''
                };
                if($(e.currentTarget).hasClass("active")){
                    _params.id = l.id
                    self.deleteIdParamsArr.push(_params)
                    self.deleteIdStringArr.push(l.id)
                }else{
                    _.each(self.deleteIdParamsArr,(a,index) => {
                        if(a.id == l.id){
                            self.deleteIdParamsArr.splice(index, 1)
                        }
                    })

                    self.deleteIdStringArr.removeByValue(l.id)
                }
                console.log(self.deleteIdParamsArr)
                console.log(self.deleteIdStringArr)
            },
            upRecord: function(l,index){
                var self = this;
                var rewDevFralmeworkList = self.devFrameworkList;
                var newList = l;
                var previousSortNum,previousUpSortNum;
                //remove active status
                self.removeActiveStatus();
                //update ContentColumn
                if(index == 0){
                    return
                }else if(index == 1){
                    previousSortNum = self.devFrameworkList[0].sortNum;
                    console.log(newList.sortNum)
                    console.log(previousSortNum)
                    newList.sortNum = previousSortNum + 500;//desc
                    console.log(newList.sortNum)
                    var params = [];
                    params.push(newList);
                    console.log(params);
                    servers.updateContentColumn(self,params,function(){
                        pubMethods.upRecord(rewDevFralmeworkList,index);
                    })
                }else{
                    previousSortNum = self.devFrameworkList[index - 1].sortNum;
                    previousUpSortNum = self.devFrameworkList[index - 2].sortNum;
                    newList.sortNum = Math.floor((previousSortNum + previousUpSortNum) / 2);
                    var params = [];
                    params.push(newList);
                    console.log(params)
                    servers.updateContentColumn(self,params,function(){
                        pubMethods.upRecord(rewDevFralmeworkList,index);
                    })
                }

            },
            downRecord: function(l,index){
                var self = this;
                var rewDevFralmeworkList = self.devFrameworkList;
                var currentPageLength =  self.devFrameworkList.length || 0;
                var newList = l;
                var nextSortNum,nextDownSortNum;
                //remove active status
                self.removeActiveStatus();
                //update ContentColumn
                if(index == currentPageLength - 1){
                    return
                }else if(index == currentPageLength - 2){
                    nextSortNum = self.devFrameworkList[currentPageLength - 1].sortNum;
                    newList.sortNum = nextSortNum - 500;//desc
                    var params = [];
                    params.push(newList);
                    console.log(params)
                    servers.updateContentColumn(self,params,function(){
                        pubMethods.downRecord(rewDevFralmeworkList,index);
                    })
                }else{
                    console.log(self.devFrameworkList[index + 1])
                    nextSortNum = self.devFrameworkList[index + 1].sortNum;
                    nextDownSortNum = self.devFrameworkList[index + 2].sortNum;
                    newList.sortNum = Math.floor((nextSortNum + nextDownSortNum) / 2);
                    var params = [];
                    params.push(newList);
                    console.log(params)
                    servers.updateContentColumn(self,params,function(){
                        pubMethods.downRecord(rewDevFralmeworkList,index);
                    })
                }
            },
            removeActiveStatus: function(){
                $(".checkbox").each(function(index,el){
                    $(el).removeClass("active")
                })
            },
            batchDelete: function(){
                var self = this;
                popover.warningConfirm({
                    title:"是否要批量删除文章",
                    message:"删除后将无法恢复",
                    confirmBtn:"删除",
                    cancleBtn:"取消",
                    confirmCb: function(){
                        //reset remove active status
                        self.removeActiveStatus();
                        self.$nextTick(function(){
                            if(self.deleteIdParamsArr.length == 0){
                                self.$nextTick(function(){
                                    popover.operatePromptError({message:'请选择要删除的文章'})
                                })
                                return false
                            }
                            servers.deleteContentColumn(self,self.deleteIdParamsArr,function(res){
                                /*var newList = self.devFrameworkList;
                                newList = _.reject(newList, (list) => {
                                    return self.deleteIdStringArr.indexOf(list.id) > -1
                                });
                                console.log(newList)
                                console.log(self.deleteIdStringArr)
                                self.updatedevFrameworkList(newList);*/
                                //init page files
                                self.initPageFiles(self)

                                popover.operatePromptRight({message:"批量删除成功"})


                                self.deleteIdParamsArr = [];
                                self.deleteIdStringArr = [];
                            })
                        })
                    }
                })
            },
            deleteCurrentArticle:function(l){
                var self = this;
                popover.warningConfirm({
                    title:"是否要删除该文章",
                    message:"删除后将无法恢复",
                    confirmBtn:"删除",
                    cancleBtn:"取消",
                    confirmCb: function(){
                        //remove active status
                        self.removeActiveStatus();
                        var params = [{
                            id : l.id
                        }]
                        servers.deleteContentColumn(self,params,function(res){
                            /*var newList = self.devFrameworkList;
                            newList = _.reject(newList, (list) => {
                                return list.id == l.id
                            });
                            console.log(newList)
                            self.updatedevFrameworkList(newList);*/
                            //init page files
                            self.initPageFiles(self)

                            popover.operatePromptRight({message:"删除成功"})
                        })
                    }
                })
            },
            editCurrentArticleTitle:function(l){
                var self = this;
                //reset remove active status
                self.removeActiveStatus();
                self.deleteIdParamsArr = [];
                self.deleteIdStringArr = [];
                if(l.type == 2){ //has linkUrl
                    var transferParams = {
                        modifyLink: true,
                        id: l.id,
                        linkUrl: l.linkUrl,
                        linkTarget: l.linkTarget,
                        title: l.title
                    }
                    sessionStorage.setItem('TRANSFER_PARAMS',JSON.stringify(transferParams))
                    self.$route.router.go({name:'devFrameworkEditorAlert'})
                }else if(l.type == 1){
                    var id = l.id;
                    sessionStorage.setItem('CURRENT_DETAIL_ID',id);
                    self.$route.router.go({path:'/main/devFramework/' + 'detailEditor',query:{fromPage:'devFrameworkEditor'}})
                }

            },
            addLink:function(){
                var self = this;
                //reset remove active status
                self.removeActiveStatus();
                self.deleteIdParamsArr = [];
                self.deleteIdStringArr = [];
                var transferParams = {
                    modifyLink: false,
                    linkUrl: '',
                    linkTarget: '',
                    title: ''
                }
                sessionStorage.setItem('TRANSFER_PARAMS',JSON.stringify(transferParams))
                self.$route.router.go({name:'devFrameworkEditorAlert'})
            },
            adaptWindowSize: function(){
                var windowHeight = $(window).height();
                //var filterBarHeight = $(".filter-bar").outerHeight(true);
                var headerHeight = $(".topbar-menu").outerHeight(true);
                var operateBtnHeight = $(".operate-btn-group").outerHeight(true);
                var contentListTitleHeight = $(".programa-title-editor-list-ul").outerHeight(true);
                $(".programa-title-editor-list-wrap").height(windowHeight - operateBtnHeight - headerHeight - contentListTitleHeight - 60)
            }
        },
        ready: function () {
            var self = this;
            self.$nextTick(function(){
                self.adaptWindowSize()
            })
            $(window).resize(function () {
                self.adaptWindowSize();
            });
        }
    }
</script>
<style scoped>
    @import "css/devFrameworkEditor.css";
</style>
