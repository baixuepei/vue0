<template>
    <div class="body-detail" v-show="$route.name == 'detail'">
        <div class="bread-crumbs com-md-12">
            <span class="back-to-list" @click="backToList">文章列表</span> <i class="glyphicon glyphicon-chevron-right"></i>
            <span class="current-title">{{currentDetailObj.title}}
            </span>
        </div>
        <div class="detail-title">
            <div class="col-md-6 current-title">{{currentDetailObj.title}}
            </div>
            <div class="col-md-6 pull-right current-source">
                <span>{{currentDetailObj.updateTime | formateTime}}
                </span>
                来自{{currentDetailObj.source}}
            </div>
        </div>
        <div class="detail-content">
            <!--<div class="description">{{currentDetailObj.contentText.description}}</div>-->
            <div class="content" id="editor-content"></div>
        </div>
    </div>
    <!--<div class="body-detail-editor" v-show="$route.name == 'detailEditor'">
        <router-view></router-view>
    </div>-->
</template>

<script>
    import Vue from "vue";
    import servers from "../servers.js";
    import popover from "../assets/commonjs/popover.js";
    import filters from "../filters.js";
    import constant from "../assets/commonjs/constant.js";
    import {updatecurrentDetailObj} from '../vuex/actions';
    import {getcurrentDetailObj} from "../vuex/getters";

    export default{
        components: {

        },
        vuex: {
            getters: {
                currentDetailObj : getcurrentDetailObj
            },
            actions: {
                updatecurrentDetailObj
            }
        },
        data:function(){
            return {
                currentDetailId: this.$route.params.did || sessionStorage.getItem("CURRENT_DETAIL_ID"),
            }
        },
        route: {
            data: function(){
                var self = this;
                //update currentDetailObj
                var sessionObj = JSON.parse(sessionStorage.getItem('CURRENT_DETAIL_OBJ')) || '';
                self.updatecurrentDetailObj(sessionObj)
                var params = {
                    id: self.currentDetailId
                }
                servers.getContentColumns(self,params,function(res){
                    //update currentDetailObj
                    self.updatecurrentDetailObj(res[0])
                    //set contents
                    var text = decodeURIComponent(self.currentDetailObj.contentText) || '';
                    text = JSON.parse(text);
                    self.quill.setContents(text);

                })
            }
        },
        methods: {
            backToList: function(){
                this.$route.router.go({name:"devFramework"})
            }
        },
        ready: function () {
            var self = this;
            //init quill
            self.quill = new Quill('#editor-content');
            self.quill.enable(false);
            //init content height
            var windowHeight = $(window).height();
            var headerHeight = $(".topbar-menu").outerHeight(true);
            var breadCrumbsHeight = $(".bread-crumbs").outerHeight(true);
            var titleHeight = $(".detail-title").outerHeight(true);
            $("#editor-content").height(windowHeight - breadCrumbsHeight - headerHeight - titleHeight - 60)
        }
    }
</script>
<style scoped>
    @import "css/detail.css";
</style>
