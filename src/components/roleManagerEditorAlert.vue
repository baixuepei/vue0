<template>
    <div class="role-edit-alert">
        <div class="role-edit">
            <img src="../assets/images/closelight2@.png" alt="" class="close-btn"
            v-link="{name:'roleManagerEditor'}">
            <div class="header" v-show="transParams.modifyRole">
                编辑角色
            </div>
            <div class="header" v-else>
                添加角色
            </div>
            <div class="clearfix edit">
                <div class="col-xs-5 ">
                    <p><span class="required-flag">*</span>&nbsp;&nbsp;角色名称</p>
                    <input type="text" class="form-control" :value="transParams.name" placeholder="请输入角色名称" />
                </div>
                <div class="col-xs-5 col-xs-offset-2">
                    <p>角色描述</p>
                    <input type="text" class="form-control" v-model="" placeholder="请输入角色描述">
                </div>
                <div class="col-xs-12">
                    <p>备注</p>
                    <textarea type="text" class="form-control" placeholder="请输入备注信息"></textarea>
                </div>
            </div>
            <div class="limit-manage">
                <div class="limit-header">
                   权限管理
                </div>
                <div class="limit-content">
                    <div class="module">
                        <p class="title">1.portal</p>
                        <div class="line-list clearfix">
                            <p class="sub-title">系统集成</p>
                            <ul class="list-inline">
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox " >
                                    <a class="" href="javascript:void(0)"></a>
                                    <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox " >
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="line-list clearfix">
                            <p class="sub-title">系统集成</p>
                            <ul class="list-inline">
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox " >
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox " >
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="line-list clearfix">
                            <p class="sub-title">系统集成</p>
                            <ul class="list-inline">
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox " >
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox " >
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="module">
                        <p class="title">2.pss</p>
                        <div class="line-list clearfix">
                            <p class="sub-title">系统集成</p>
                            <ul class="list-inline">
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox " >
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox " >
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="line-list clearfix">
                            <p class="sub-title">系统集成</p>
                            <ul class="list-inline">
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox " >
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox " >
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                                <li @click="selectManageItem($event)">
                                    <div class="checkbox ">
                                        <a class="" href="javascript:void(0)"></a>
                                        <span>增加系统</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--模块-->
                </div>
                <!--line-list end-->
                <div class="text-center modify-show mu-row">
                    <button class="btn bg-deep-blue width-140 save" @click="confirmOperate()" v-show="transParams.modifyRole">保 存</button>
                    <button class="btn bg-deep-blue width-140 save" @click="confirmOperate()" v-else>提 交</button>
                    <button class="btn bg-white border-deep-blue width-140 cancel-modifyInfo" v-link="{name:'roleManagerEditor'}">取 消</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default{

        data:function(){
            return {
                transParams: JSON.parse(sessionStorage.getItem("TRANSFER_PARAMS_ROLE_ALERT"))
            }
        },
        components: {

        },
        methods: {
            confirmOperate: function(){
                var self = this;
                //update or add
                self.$route.router.go({name:'roleManagerEditor'})
            },
            selectManageItem:function(e){
                e.preventDefault();
                e.stopPropagation();
                $(e.currentTarget).find('.checkbox').toggleClass("active");
            }
        },
        ready: function () {

        },
        watch:{

        }
    }
</script>
<style scoped>
    @import 'css/roleManagerEditorAlert.css';
</style>
