<template>
    <div class="dev-framework-edit-alert">
        <div class="add-show-module text-left">
            <img src="../assets/images/closelight2@.png" alt="" class="close-btn"
            v-link="{name:'devFrameworkEditor'}">
            <div class="header">
                <span v-show="transferParams.modifyLink">编辑链接</span>
                <span v-else>添加链接</span>
            </div>
            <div class="add-website">
                <p>网址链接</p>
                <input type="text" class="form-control input-link" :value="transferParams.linkUrl" />
                <div class="dropdown add-link ">
                    <button id="dLabel" class="btn  bg-deep-blue" type="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false"
                            style="width:160px;">
                        {{addWebsiteType}}
                        <span class="caret" ></span>
                    </button>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                        <li><a href="javascript:void(0)" v-for="item in linkTypes"
                               @click="selectLinkTarget(item)" track-by="$index">{{item}}</a></li>
                    </ul>
                    <input type="text" class="form-control"  readonly v-model="linkTarget"/>
                </div>
                <!--<button type="button" class="btn btn-primarys bg-deep-blue" style="width:82px;">上传</button>-->
            </div>
            <div class="add-des">
                <p>文章标题（不超过30个字）</p>
                <input type="text" class="form-control input-title" :value="transferParams.title">
            </div>
            <div class="text-center modify-show mu-row">
                <button class="btn bg-deep-blue width-140 save" @click="saveEditor" v-show="transferParams.modifyLink">保 存</button>
                <button class="btn bg-deep-blue width-140 save" @click="saveEditor" v-else>提 交</button>
                <button class="btn bg-white border-deep-blue width-140 cancel-modifyInfo" v-link="{name:'devFrameworkEditor'}">取 消</button>
            </div>
        </div>
    </div>
</template>
<script>
    import servers from "../servers.js";
    import popover from "../assets/commonjs/popover.js";
    import {updateShowProgramaAlertFlag,updatedevFrameworkList} from '../vuex/actions'
    import {getShowProgramaAlertFlag,getdevFrameworkList} from "../vuex/getters";
    import constant from "../assets/commonjs/constant.js";
    export default{
        vuex: {
            getters: {
                showProgramaAlertFlag: getShowProgramaAlertFlag,
                devFrameworkList : getdevFrameworkList

            },
            actions: {
                updateShowProgramaAlertFlag,
                updatedevFrameworkList
            }
        },
        data:function(){
            return {
                linkTypes:constant.commonConstant.linkTypes,
                addWebsiteType:'请选择',
                linkTarget: '',
                transferParams: JSON.parse(sessionStorage.getItem('TRANSFER_PARAMS'))
            }
        },
        route:{
            data: function(){

            }
        },
        components: {

        },
        methods: {
            saveEditor:function(){
                var self = this;
                var params;
                if(self.transferParams.modifyLink){
                    params = [{
                        type: 2,
                        id : self.transferParams.id,
                        linkTarget: self.linkTarget,
                        linkUrl : $(".input-link").val(),
                        title : $(".input-title").val()
                    }]
                    servers.updateContentColumn(self,params,function(){
                        self.$route.router.go({name:'devFrameworkEditor'})
                        /*var newList = self.devFrameworkList;
                        newList = _.reject(newList,(l) => {
                            return l.id == self.transferParams.id
                        });
                        newList.push(params[0]);
                        self.updatedevFrameworkList(newList)*/
                    })
                }else{
                    params = [{
                        type: 2,
                        linkTarget: self.linkTarget,
                        linkUrl : $(".input-link").val(),
                        title : $(".input-title").val()
                    }]
                    servers.addContentColumn(self,params,function(){
                        self.$route.router.go({name:'devFrameworkEditor'})
                        /*var newList = self.devFrameworkList;
                        newList.push(params[0]);
                        self.updatedevFrameworkList(newList)*/
                    })
                }
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
            var self = this;
            //self.transferParams = self.$route.query;
            self.linkTarget = self.transferParams.linkTarget || '';
            self.$log('transferParams')
        },
        watch:function(){

        }
    }
</script>
<style scoped>
    @import 'css/devFrameworkEditorAlert.css';
</style>
