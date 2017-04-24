<template>
  <div class="user-edit-alert">
    <div class="user-edit">
        <img src="../assets/images/closelight2@.png" alt="" class="close-btn"
        v-link="{name:'userManagerEditor'}">
        <div class="header" v-show="transParams.modifyUser">
            编辑用户
        </div>
        <div class="header" v-else>
            添加用户
        </div>
        <div class="clearfix">
            <div class="col-xs-5 ">
                <div class="col-xs-12 ">
                    <p><span class="require-flag">*</span>&nbsp;&nbsp;用户名</p>
                    <input type="text" class="form-control" :value="transParams.name" placeholder="请输入用户名"/>
                </div>
                <div class="col-xs-12 ">
                    <p><span class="require-flag">*</span>&nbsp;&nbsp;登录账号</p>
                    <input type="text" class="form-control" v-model="" placeholder="请输入登录账号" />
                </div>
                <div class="col-xs-12 ">
                    <p><span class="require-flag">*</span>&nbsp;&nbsp;密码</p>
                    <input type="text" class="form-control" v-model="" placeholder="请输入密码" />
                </div>
                <div class="col-xs-12 ">
                    <p><span class="require-flag">*</span>&nbsp;&nbsp;联系方式</p>
                    <input type="text" class="form-control" v-model="" placeholder="请输入联系方式" />
                </div>
            </div>
            <div class="col-xs-5 col-xs-offset-2">
                <div class="col-xs-12 ">
                    <p>*&nbsp;&nbsp;所属角色</p>
                    <div class="dropdown">
                        <button id="dLabel" class="btn  bg-deep-blue" type="button" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false"
                                style="width:160px;">
                            {{roleShow}}
                            <span class="caret" ></span>
                        </button>
                        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                            <li v-for="role in roles" @click="selectRole(role)" track-by="$index">
                                <a href="javascript:void(0)">{{role}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-xs-12  select-role clearfix" v-show="selectRoleFlag">
                    <p>已选择角色</p>
                    <ul class="list-inline">
                    <li class="scroll-role" v-for="item in selectAllRole" track-by="$index">{{item}} <span> <img src="../assets/images/closelight2@.png" alt="" @click="removeRole(item)"></span></li>
                    </ul>
                </div>
            </div>
            <div class="col-xs-12">
                <p>备注</p>
                <textarea type="text" class="form-control" ></textarea>
            </div>
        </div>
        <div class="text-center modify-show mu-row">
            <button class="btn bg-deep-blue width-140 save" @click="confirmOperate()" v-show="transParams.modifyUser">保 存</button>
            <button class="btn bg-deep-blue width-140 save" @click="confirmOperate()" v-else>提 交</button>
            <button class="btn bg-white border-deep-blue width-140 cancel-modifyInfo" v-link="{name:'userManagerEditor'}">取 消</button>
        </div>
    </div>
  </div>
</template>
<script>
    import _ from 'lodash'
    export default{
        data:function(){
            return {
                transParams: JSON.parse(sessionStorage.getItem("TRANSFER_PARAMS_USER_ALERT")),
                roles:['超级管理员','超级操作员','超级值机员','管理员','操作员','候补名单管理员','候补名单操作员','航班管理员','值机管理员','候补管理员','志愿者管理员','升舱管理员'],
                roleShow:'请选择',
                selectAllRole:[],
                selectRoleFlag:false
            }
        },
        components: {

        },
        methods: {
            confirmOperate: function(){
                var self = this;
                //update or add
                self.$route.router.go({name:'userManagerEditor'})
            },
            selectRole:function(role){
              var self=this;
              self.roleShow=role;
              self.selectAllRole.push(role);

              self.selectRoleFlag=true;
            },
            removeRole:function(item){
               var self=this;
                self.selectAllRole =  _.reject( self.selectAllRole,(l) => {
                        return l==item
                    })
            }
        },
        ready: function () {

        },
        watch:{
            'selectAllRole':function(val,oldVal){
                var self=this;
                if(val.length==0){
                    self.selectRoleFlag=false;
                    self.roleShow='请选择';

                }
            }
        }
    }
</script>
<style scoped>
    @import 'css/userManagerEditorAlert.css';
</style>
