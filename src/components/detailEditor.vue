<template>
    <div class="body-detail-editor">
        <header class="clearfix header">
            <h1 v-show="$route.name=='detailEditor'" class="pull-left">编辑文章</h1>
            <h1 v-else class="pull-left">添加文章</h1>
            <div class="operate-btn-group pull-right">
                <button type="button" class="cancel btn btn-small-info" @click="cancleEdit">取消</button>
                <button v-show="$route.name=='detailEditor'" type="button" class="confirm btn btn-small" @click="updateArticle">保存</button>
                <button v-else type="button" class="confirm btn btn-small" @click="addArticle">提交</button>
            </div>
        </header>
        <div class="content-group article-name-source row">
            <h3 class="col-md-6">文章名称(不超过30个字)</h3>
            <h3 class="col-md-6">来自</h3>
            <p class="col-md-6">
                <input
                    type="text" class="title-input" :value="currentDetailObj.title">
            </p>
            <p class="col-md-6">
                <input
                    type="text" class="source-input" :value="currentDetailObj.source"
                >
            </p>
        </div>
        <!-- <div class="content-group row">
             <h3 class="col-md-12">文章简介(不超过200个字)</h3>
             <p class="col-md-12">
                 <textarea
                     name=""
                     cols="30"
                     rows="5" :value="currentDetailObj.contentText.description"
                     ></textarea>
             </p>
         </div>-->
        <div class="content-group article-content-title row">
            <h3 class="col-md-12" style="margin-bottom:10px">文章内容</h3>
        </div>
        <div class="detail-editor" id="editor"></div>
    </div>
</template>

<script>
    import Vue from "vue";
    import upload from "./upload.vue";
//    import Quill from "quill";
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
                quill: null,
                articleContent: '',
                currentDetailId: sessionStorage.getItem('CURRENT_DETAIL_ID')
            }
        },
        route: {
            data: function(){
                var self = this;
                //init currentDetailObj
                if(self.$route.name == 'addDetail'){
                    var currentDetailObj = {
                        title : '',
                        updateTime : '',
                        source : '',
                        contentText : ''
                    };
                    self.updatecurrentDetailObj(currentDetailObj)
                    return
                }
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
            cancleEdit:function(){
                var self = this;
                popover.warningConfirm({
                    title: "是否确定取消编辑",
                    message:"确定之后返回到文章列表编辑页面",
                    confirmCb: function(){
                        self.$route.router.go({name:'devFrameworkEditor'});
                    }
                })
            },
            updateArticle: function(){
                var self = this;
                self.articleContent = encodeURIComponent(JSON.stringify(self.quill.getContents()));
                self.$log('articleContent');
                var params = [{
                    id: self.currentDetailObj.id,
                    sortNum: self.currentDetailObj.sortNum,
                    title: $(".title-input").val(),
                    source: $(".source-input").val(),
                    type:1,
                    linkUrl: '',
                    linkTarget: '',
                    contentText: self.articleContent
                }]
                servers.updateContentColumn(self,params,function(res){
                    popover.operatePromptRight({message:"修改文章成功"})
                })
            },
            addArticle: function(){
                var self = this;
                self.articleContent = encodeURIComponent(JSON.stringify(self.quill.getContents()));
                self.$log('articleContent');
                var params = [{
                    title: $(".title-input").val(),
                    source: $(".source-input").val(),
                    type:1,
                    linkUrl: '',
                    linkTarget: '',
                    contentText: self.articleContent
                }]
                servers.addContentColumn(self,params,function(res){
                    popover.operatePromptRight({message:"添加文章成功"})
                })
            }
        },
        ready: function () {
            var self = this;
            //init quill
            self.quill = new Quill('#editor', {
                modules: {
                    toolbar: [
                        //[{ 'font': [] }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'align': [] }],
                        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                        ['blockquote','link', 'code-block'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                       // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                        //[{ 'direction': 'rtl' }],                         // text direction
                        //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                        ['image']
                        //['clean']                                         // remove formatting button
                    ]
                },
                placeholder: 'Start edit...',
                theme: 'snow'
            });

            //init editor-container height
            self.$nextTick(function(){
                var windowHeight = $(window).height();
                var headerHeight = $(".topbar-menu").outerHeight(true);
                var titleHeight = $(".body-detail-editor .header").outerHeight(true);
                var nameSourceHeight = $(".body-detail-editor .article-name-source").height();
                var contentTitleHeight = $(".body-detail-editor .article-content-title").height();
                var toolbarHeight = $(".body-detail-editor .ql-toolbar").outerHeight(true);
                $("#editor").height(windowHeight - headerHeight - titleHeight - nameSourceHeight - contentTitleHeight - toolbarHeight - 50);
            })
        }
    }
</script>
<style scoped>
    @import "css/detailEditor.css";
</style>
