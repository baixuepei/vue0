<template>
    <!--首页编辑状态-->
        <div class="row">
            <div class="col-xs-3" v-for="list in currentSystemObj">
                <div class="panel news-panel panel-default" @click="updatesystemIntegration(list)" >
                    <div class="panel-body">
                         <div class="del-btn" @click="deletesystemIntegration(list,$event)">
                          <img src="../assets/images/delect-btn.png" alt="">
                        </div>
                        <!--图片url-->
                        <div class="news-pic">
                            <img
                                :src=list.iconUrl
                                alt="">
                        </div>
                        <div class="news-desc">
                            <!--标题-->
                        <span class="title">
                            <a href="javascript:void(0)" >{{list.name}}</a>&nbsp;系统
                        </span>
                            <p class="dividers"></p>
                            <!--描述-->
                            <p class="content text-center">
                              {{list.description}}
                            </p>
                            <span class="read-more"></span>
                        </div>
                    </div>
                </div>
            </div>
            <!--添加-->
            <div class="col-xs-3">
                <div class="panel news-panel panel-default add-panel" @click="addsystemIntegration">
                    <div class="add-img text-center">
                        <img src="../assets/images/add.png" alt="">
                    </div>
                    <p class="add-text text-center">添加入口</p>
                </div>
            </div>
        </div>
    <!--添加或编辑弹框-->
        <div class="mask show-module-edit-alert" v-show="addsystemIntegrationFlag">
            <div class="add-show-module text-left" >
                <img src="../assets/images/closelight2@.png" alt="" class="close-btn" @click="cancelEditor">
                <!--动态获取是添加还是编辑title-->
                <div class="header">
                    {{updateTitle}}
                </div>
                <div class="clearfix">
                    <div class="col-xs-5 ">
                        <p>系统名称(不得超过10个字)</p>
                        <input type="text" class="form-control" v-model="name" maxlength="10" />
                    </div>
                    <div class="col-xs-7">
                        <p>添加图片(300*400)</p>
                        <input type="text" class="form-control" v-model="iconUrl" maxlength="30">
                        <button type="button" class="btn btn-primarys bg-deep-blue" @click='selectFolderImg'>选择文件</button>
                    </div>
                </div>
                <div class="add-website">
                    <p>网址链接</p>
                    <input type="email" class="form-control" v-model="linkUrl" />
                    <!--<button type="button" class="btn btn-primarys bg-deep-blue" style="width:82px;">上传</button>-->
                    <div class="dropdown add-link ">
                        <button id="dLabel" class="btn  bg-deep-blue" type="button" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false"
                                style="width:160px;">
                            {{addWebsiteType}}
                            <span class="caret" ></span>
                        </button>
                        <!--选择是在当前页面打开还是新页面打开-->
                        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                            <li><a href="javascript:void(0)" v-for="item in linkTypes"
                                   @click="selectLinkTarget(item)" track-by="$index">{{item}}</a></li>
                        </ul>
                        <input type="text" class="form-control"  readonly v-model="linkTarget"/>
                    </div>
                </div>
                <div class="add-des">
                    <p>系统简介（不超过60个字）</p>
                    <textarea rows="6" style="width: 100%;height: 46px;" maxlength="60" v-model="description"></textarea>
                </div>
                <div class="text-center modify-show mu-row">
                    <button class="btn bg-deep-blue width-140 save" @click="saveEditor">保 存</button>
                    <button class="btn bg-white border-deep-blue width-140 cancel-modifyInfo" @click="cancelEditor">取 消</button>
                </div>
            </div>
        </div>

        <!--上传图片组件 -->
        <div v-show="showUploadFlag">
            <my-upload
                field="img"
                lang-type="en"
                ></my-upload>
        </div>

</template>
<script>
    import 'babel-polyfill'; // es6 shim
    import Vue from 'vue';
    import myUpload from 'vue-image-crop-upload';
    import store from '../vuex/store'
    import _ from 'lodash'
    import systemIntegrationEditor from "./systemIntegrationEditor.vue";
    import popover from "../assets/commonjs/popover.js";
    import servers from "../servers.js";
    import filters from "../filters.js";
    import constant from "../assets/commonjs/constant.js";
    import {updatecurrentSystemObj} from '../vuex/actions';
    import {getcurrentSystemObj} from "../vuex/getters";
    export default{
        vuex: {
            getters: {
                currentSystemObj : getcurrentSystemObj
            },
            actions: {
                updatecurrentSystemObj
            }
        },
        data:function(){
            return {
                showUploadFlag:false,
                updateTitle:'',
                addsystemIntegrationFlag:false,
                addWebsiteType:'请选择',//默认
                name:'',                //标题
                description:'',         //描述
                iconUrl:'',             //图片url
                linkUrl:'',             //文章链接地址
                linkTarget:'',          //打开页面方式
                linkTypes:constant.commonConstant.linkTypes
            }
        },
        components:{
            myUpload
        },
        methods: {
            addsystemIntegration:function(){
                var self=this;
                self.updateTitle='添加入口';
                self.addsystemIntegrationFlag=true;
                self.name='';
                self.iconUrl='';
                self.linkUrl='';
                self.linkTarget='';
                self.description='';
                self.addWebsiteType='请选择'

            },
            deletesystemIntegration:function(list,event){
                var self=this;
                event.stopPropagation();
               var params=[{
                    "id":list.id
                }]
                console.log(params);
                popover.warningConfirm({
                    title:"是否要删除该文档",
                    message:"删除后将无法恢复",
                    confirmBtn:"删除",
                    cancleBtn:"取消",
                    confirmCb: function(){
                       servers.deleteNavigation(self,params,function(res){
                           var currentSystemObj = self.currentSystemObj;
                           currentSystemObj =  _.reject(currentSystemObj,(l) => {
                               return l.id == params[0].id
                           })
                           self.updatecurrentSystemObj(currentSystemObj)
                       })
                    }
                })
            },
            updatesystemIntegration:function(list){
                var self=this;
                self.updateTitle='编辑入口';
                self.addsystemIntegrationFlag=true;
                self.name=list.name;
                self.iconUrl=list.iconUrl;
                self.linkUrl=list.linkUrl;
                self.linkTarget=list.linkTarget;
                self.description=list.description;
                if(list.linkTarget=='_self'){
                  self.addWebsiteType='链接在当前页面打开'
                }else if(list.linkTarget=='_blank'){
                   self.addWebsiteType='链接在新页面打开'
                }else{
                    self.addWebsiteType='请选择';
                }
                sessionStorage.setItem('updateModuleList',JSON.stringify(list));
            },
            saveEditor:function(){
                var self=this;
                self.addsystemIntegrationFlag=false;
                if(self.updateTitle=='添加入口'){
                    var params= [{
                        "name": self.name,
                        "iconUrl":self.iconUrl,
                        "linkUrl":self.linkUrl,
                        "description": self.description,
                        "linkTarget":self.linkTarget
                    }];
                    servers.addNavigation(self,params,function(res){
                            popover.operatePromptRight({message: "添加成功"});
                            var params = {
                            };
                            servers.getNavigation(self,params,function(res){
                                self.updatecurrentSystemObj(res);
                            })

                    })
               }else if(self.updateTitle=='编辑入口'){
                var updateList=JSON.parse(sessionStorage.getItem("updateModuleList"));
                    console.log(updateList);
                    var params= [{
                        "id":updateList.id,
                        "sortNum":updateList.sortNum,
                        "name": self.name,
                        "iconUrl":self.iconUrl,
                        "linkUrl":self.linkUrl,
                        "description": self.description,
                        "linkTarget":self.linkTarget
                    }];
                    console.log(params[0].iconUrl);
                    servers.updateNavigation(self,params,function(res){
                        console.log(res);
//                        if(res.msg=='更新成功'){
                            var currentSystemObj = self.currentSystemObj;
                            _.each(currentSystemObj,(l) => {
                                if(l.id==params[0].id){
                                    l.name=params[0].name;
                                    l.iconUrl=params[0].iconUrl;
                                    l.linkUrl=params[0].linkUrl;
                                    l.description=params[0].description;
                                    l.linkTarget=params[0].linkTarget;
                                }
                            })
                            self.updatecurrentSystemObj(currentSystemObj)
                            popover.operatePromptRight({message: "更新成功"});
//                        }else{
//                            popover.operatePromptError({message: "更新失败"});
//                        }
                    })
                }else{
                    return;
                }

            },
            cancelEditor:function(){
                var self=this;
                self.addsystemIntegrationFlag=false;
            },
            selectFolderImg:function(){
                var self=this;
                self.showUploadFlag=true;
                $(".vue-image-crop-upload").css('display','block');
                console.log(self.iconUrl);
            },
            selectLinkTarget:function(item){
                var self=this;
                self.addWebsiteType=item;
               if(self.addWebsiteType=='链接在当前页面打开'){
                  self.linkTarget='_self';
               }else{
                   self.linkTarget='_blank';
               }
            }
        },
        ready: function () {
        },
        filters:{
        },
        watch:function(){

        },
       events: {
        /**
         * crop success
         *
         * [param] jsonData
         * [param] field
         */
        cropSuccess(jsonData, field){
            console.log('-------- upload success --------');
            console.log(jsonData);
            this.iconUrl=jsonData;
            console.log('field: ' + field);
        },
        /**
         * upload success
         *
         * [param] jsonData   服务器返回数据，已进行json转码
         * [param] field
         */
        cropUploadSuccess(jsonData, field){
            console.log('-------- upload success --------');
//            console.log(jsonData);
            console.log('field: ' + field);
        },
        /**
         * upload fail
         *
         * [param] status    server api return error status, like 500
         * [param] field
         */
        cropUploadFail(status, field){
            console.log('-------- upload fail --------');
            console.log(status);
            console.log('field: ' + field);
        }
    }
    }
</script>
<style scoped>
    @import 'css/systemIntegrationEditor.css';
</style>
