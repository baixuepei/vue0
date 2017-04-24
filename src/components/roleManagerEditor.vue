<template>
    <div class="body-role-list-editor">
        <div class="operate-btn-group clearfix">
            <div class="col-md-6 col-xs-9">
                <button class="btn btn-default" style="margin-right:20px;"
                        @click="addNewRole">创建新角色</button>
            </div>
            <div class="col-md-4 col-xs-3 pull-right" style="text-align: right"
                 @click="batchDelete">
                <button class="btn btn-default-info">批量删除</button>
            </div>
        </div>
        <ul class="role-list-editor-ul col-md-12 clearfix">
            <li class="title clearfix">
                <div class="col-md-1 col-xs-1 pull-left">
                    <div class="checkbox checkall" v-check-all
                         @click="selectAllRoles($event)">
                        <a class="" href="javascript:void(0)"></a>
                    </div>
                </div>
                <div style="font-weight:600" class="col-md-1 col-xs-1">序号</div>
                <div style="font-weight:600" class="col-md-2 col-xs-2">角色名称</div>
                <div style="font-weight:600" class="col-md-3 col-xs-3">创建时间</div>
                <div style="font-weight:600" class="col-md-4 col-xs-4">权限列表</div>
                <div style="font-weight:600" class="col-md-1 col-xs-1 pull-right">操作</div>
            </li>
        </ul>
        <div class="role-list-editor-wrap scroll-list-editor-wrap col-md-12" v-scroll-load-more-editor>
            <ul class="clearfix">
                <li class="list"
                    v-for="l in roleList"
                    track-by="$index">
                    <div class="col-md-1 col-xs-1 pull-left">
                        <div class="checkbox" v-toggle-checked
                             @click="selectRole(l,$event)">
                            <a class="" href="javascript:void(0)"></a>
                        </div>
                    </div>
                    <div class="col-md-1 col-xs-1">{{$index + 1}}</div>
                    <div class="col-md-2 col-xs-2">{{l.name}}</div>
                    <div class="col-md-3 col-xs-3">{{l.updateTime | formateTime}}</div>
                    <div class="col-md-4 col-xs-4">{{l.limitList}}</div>
                    <div class="col-md-1 col-xs-1 pull-right">
                        <i class="glyphicon glyphicon-trash"></i>
                        <i class="glyphicon glyphicon-pencil" @click='editRole(l)'></i>
                    </div>
                </li>
            </ul>
        </div>

    </div>
    <router-view></router-view>
</template>
<script>
    import Vue from "vue";
    import servers from "../servers.js";
    import popover from "../assets/commonjs/popover.js";
    import filters from "../filters.js";
    import directives from "../directives.js";
    import constant from "../assets/commonjs/constant.js";
    import pubMethods from "../assets/commonjs/public-method.js";
    import _ from "lodash";
    import {setBeatTimer,updateroleList,initRoleList,loadMoreRoleList} from '../vuex/actions'
    import {getroleList,gethasRoleListNextPage,getcurrentRoleListPageNum} from "../vuex/getters"

    export default{
        components: {

        },
        vuex: {
            getters: {
                roleList : getroleList,
                hasRoleListNextPage : gethasRoleListNextPage,
                currentRoleListPageNum: getcurrentRoleListPageNum
            },
            actions: {
                setBeatTimer,
                updateroleList,
                initRoleList,
                loadMoreRoleList
            }
        },
        data:function(){
            return {
                deleteIdParamsArr: [],
                deleteIdStringArr:[],
            }
        },
        route: {
            data: function(){
                var self = this;

            }
        },
        methods: {
            selectAllRoles: function(e){
                var self = this;
                self.deleteIdParamsArr = []
                self.deleteIdStringArr = []
                if($(e.currentTarget).hasClass("active")){
                    _.each(self.roleList,(l,index) => {
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
            selectRole: function(l,e){
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
            removeActiveStatus: function(){
                $(".checkbox").each(function(index,el){
                    $(el).removeClass("active")
                })
            },
            batchDelete: function(){
                var self = this;
                popover.warningConfirm({
                    title:"是否要批量删除角色",
                    message:"删除后将无法恢复",
                    confirmBtn:"删除",
                    cancleBtn:"取消",
                    confirmCb: function(){
                        self.$nextTick(function(){
                            if(self.deleteIdParamsArr.length == 0){
                                self.$nextTick(function(){
                                    popover.operatePromptError({message:'请选择要删除的文章'})
                                })
                                return false
                            }
                            servers.deleteContentColumn(self,self.deleteIdParamsArr,function(res){
                                //init page files
                                self.initRoleList(self)

                                popover.operatePromptRight({message:"批量删除成功"})

                                //reset remove active status
                                self.removeActiveStatus();
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
                    title:"是否要删除该角色",
                    message:"删除后将无法恢复",
                    confirmBtn:"删除",
                    cancleBtn:"取消",
                    confirmCb: function(){
                        var params = [{
                            id : l.id
                        }]
                        servers.deleteContentColumn(self,params,function(res){
                            //init page files
                            self.initRoleList(self)
                            //remove active status
                            self.removeActiveStatus();
                            popover.operatePromptRight({message:"删除成功"})
                        })
                    }
                })
            },
            editRole:function(l){
                var self = this;
                //reset remove active status
                self.removeActiveStatus();
                self.deleteIdParamsArr = [];
                self.deleteIdStringArr = [];
                var transferParams = {
                    modifyRole: true,
                    id: l.id,
                    name: l.name,
                    limitList: l.limitList
                }
                sessionStorage.setItem('TRANSFER_PARAMS_ROLE_ALERT',JSON.stringify(transferParams))
                self.$route.router.go({name:'roleManagerEditorAlert'})
            },
            addNewRole:function(){
                var self = this;
                //reset remove active status
                self.removeActiveStatus();
                self.deleteIdParamsArr = [];
                self.deleteIdStringArr = [];
                var transferParams = {
                    modifyRole: false,
                    name: '',
                    limitList: ''
                }
                sessionStorage.setItem('TRANSFER_PARAMS_ROLE_ALERT',JSON.stringify(transferParams))
                self.$route.router.go({name:'roleManagerEditorAlert'})
            },
            adaptWindowSize: function(){
                var windowHeight = $(window).height();
                var headerHeight = $(".topbar-menu").outerHeight(true);
                var operateBtnHeight = $(".operate-btn-group").outerHeight(true);
                var contentListTitleHeight = $(".role-list-editor-ul").outerHeight(true);
                $(".role-list-editor-wrap").height(windowHeight - operateBtnHeight - headerHeight - contentListTitleHeight - 60)
            }
        },
        ready: function () {
            var self = this;
            self.$nextTick(function(){
                self.adaptWindowSize()
            })
            /*$(window).resize(function () {
             self.adaptWindowSize();
             });*/
        }
    }
</script>
<style scoped>
    @import "css/roleManagerEditor.css";
</style>
