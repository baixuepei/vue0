<template>
    <div class="mask show-module-edit-alert" v-show="addsystemIntegrationFlag">

        <!--<img src="../assets/images/img-add.png" alt="">-->
       <div class="add-show-module text-left" >
           <img src="../assets/images/closelight2@.png" alt="" class="close-btn">
          <div class="header">
           {{title}}
          </div>
     <div class="clearfix">
           <div class="col-xs-5 ">
               <p>系统名称(不得超过10个字)</p>
               <input type="text" class="form-control" v-model="title" />
              </div>
            <div class="col-xs-7">
              <p>添加图片(300*400)</p>
              <input type="text" class="form-control" v-model="selectImage">
              <button type="button" class="btn btn-primarys bg-deep-blue" @click='selectFolder'>选择文件</button>
          </div>
    </div>
    <div class="add-website">
        <p>网址链接</p>
        <input type="text" class="form-control" v-model="selectWebsite" />
        <button type="button" class="btn btn-primarys bg-deep-blue" style="width:82px;">上传</button>
    </div>
    <div class="add-des">
          <p>系统简介（不超过20个字）</p>
          <input type="text" class="form-control" v-model="systemIntro">
    </div>
    <div class="text-center modify-show mu-row">
          <button class="btn bg-deep-blue width-140 save" @click="saveEditor">保 存</button>
          <button class="btn bg-white border-deep-blue width-140 cancel-modifyInfo" @click="cancelEditor">取 消</button>
    </div>
    </div>
    </div>
    <!--show-module-->
</template>
<script>
//    import store from '../vuex/store'

    export default{
        props: ['addsystemIntegrationFlag','title'],
        data:function(){
            return {
                systemName:this.title || '',
                selectImage:'213456',
                selectWebsite:'',
                systemIntro:''
            }
        },
        components: {

        },
        methods: {
            saveEditor:function(){
                var self=this;
                if(self.title=='编辑入口'){
                    console.log(self.systemName);
                 console.log('提交编辑信息');
                }else{
                    console.log(self.systemName);
                    console.log('提交添加信息');
                }
            },
            cancelEditor:function(){
                var self=this;
            },
            selectFolder:function(){

            }
        },
        ready: function () {

        },
        watch:function(){

        }
    }
</script>
<style scoped>
    @import 'css/systemIntegrationEditAlert.css';
</style>
