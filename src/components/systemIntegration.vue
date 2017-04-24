<template>
    <!--获取文章列表-->
<div class="show-module" v-show="$route.name == 'systemIntegration'" >
    <div class="row">
        <div class="col-xs-3"  v-for="list in currentSystemObj">
            <div class="panel news-panel panel-default">
                <div class="panel-body" @click="link(list)">
                    <div class="news-pic">
                        <img
                        :src=list.iconUrl
                            alt="">
                    </div>
                    <div class="news-desc">
                        <span class="title">
                            <a href="javascript:void(0)">{{list.name}}</a>&nbsp;系统
                        </span>
                        <p class="dividers"></p>
                        <p class="content text-center">
                            {{list.description}}
                        </p>
                        <span class="read-more"></span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
<!--<show-module-editor></show-module-editor>-->
    <!--文章列表编辑状态-->
    <div class="show-module-editor" v-show="$route.name == 'systemIntegrationEditor'">
        <router-view></router-view>
    </div>





</template>
<script>
    import store from '../vuex/store'
    import systemIntegrationEditor from "./systemIntegrationEditor.vue";
    import servers from "../servers.js";
    import {updatecurrentSystemObj} from '../vuex/actions';
    import {getcurrentSystemObj} from "../vuex/getters";
    export default{
        components: {
            systemIntegrationEditor

        },
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
                userEditorAlert:true
            }
        },
        route: {
            data: function () {
                var self = this;
                var params = {
                };
                servers.getNavigation(self,params,function(res){
                    self.updatecurrentSystemObj(res);
                })
            }
        },
        methods: {
            link:function(list){
                window.open(list.linkUrl,list.linkTarget);
            }
        },
        ready: function () {

    },
        watch:function(){

        }
    }
</script>
<style scoped>
    @import 'css/systemIntegration.css';
</style>
