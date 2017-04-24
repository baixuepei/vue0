<template>
    <div class="body-login">
        <div class="header clearfix">
            <div class="img-logo">
                <img src="../assets/images/logo_l.png" alt="" class="logo">
            </div>
            <div class="text-logo">
                <b class="text-mu">MU</b>
                <b class="text-gui">GUI</b>
            </div>
        </div>
        <div class="main">
            <!--<img src="../assets/images/login-bg.jpg" alt="" class="l-bg">-->
            <!--<div class="l-title">-->
                <!--<h2>中国东方航空</h2>-->
                <!--<h1>候补值机系统</h1>-->
            <!--</div>-->
            <div class="login">
                <div class="l-header">登 录</div>
                <form action="" method="post" id="loginForm">
                    <div class="form-group l-user" :class="{'has-error': usernameError}">
                        <input type="text" v-model="username | toSBC" @keyup.enter="passwordFocused"  @focus="handleFocus" name="userName" placeholder="用户名" class="form-control">
                        <div class="form-error">{{usernameErrorText}}</div>
                    </div>
                    <div class="form-group l-password" :class="{'has-error': passwordError}">
                        <input type="password" v-model="password | toSBC" @focus="handleFocus" @keyup.enter="loginCheck" name="passWord" placeholder="密 码" class="form-control">
                        <div class="form-error">{{passwordErrorText}}</div>
                    </div>
                    <div class="form-group dropdown">
                        <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
                            {{officeId}}
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                            <li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0)" @click="officeId='SHA001'">SHA001</a></li>
                            <li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0)" @click="officeId='PVG101'">PVG101</a></li>
                        </ul>
                    </div>
                    <div class="form-group l-btn">
                        <button type="button" class="btn bg-deep-blue text-center btn-block login-btn" v-link="{ name: 'main'}">{{loginBtnTxt}}</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="footer">
            <p>Copyright 2016 China Eastern Airline.All right reserved</p>
        </div>
    </div>
</template>

<script>
   import Vue from "vue";
   import servers from "../servers.js";
   import cookie from "../assets/commonjs/cookie";
   import popover from "../assets/commonjs/popover.js";
   import filters from "../filters.js";

    export default{
        components: {

        },
        vuex: {

        },
        data:function(){
            return {
                showErrorPage:false,
                errorTipsText : "",
                username:'',               // 用户名
                usernameError: false,     // 用户名错误标记
                usernameErrorText:'*',     // 用户名错误提示信息
                password:'',            // 密码
                passwordError: false,   // 密码错误标记
                passwordErrorText:'*',   // 密码错误提示信息
                officeId: 'SHA001',
                loginBtnTxt: "登 录"
            }
        },
        methods: {
            /**
             * 登录信息验证
             * @returns {boolean}
             */
            loginCheck: function () {
                var self = this;
                if(this.username === "") {
                    this.usernameError = true;
                    this.usernameErrorText = "请输入用户名";
                    return false;
                } else if(this.password === "") {
                    this.passwordError = true;
                    this.passwordErrorText = "请输入密码";
                    return false;
                } else {
                    var params = {
                        "userName": this.username,
                        "passWord": this.password,
                        "officeId": this.officeId
                    };
                    this.loginBtnTxt = '登录中...';
                    this.$nextTick(function () {

                        servers.doLogin(self,params, function success(data) {
                            self.loginBtnTxt = '登 录';
                            self.resetState();
                            if(data.resultCode == 1) {
                                sessionStorage.setItem("userName", self.username);
                                sessionStorage.setItem("access_token", data.resultDescription);
                                sessionStorage.setItem("office_id", self.officeId);
                                //Vue.http.headers.common['accessToken'] = data.resultDescription;
                                self.$route.router.go({name:"main"});

                            } else {
                                self.passwordError = true;
                                self.passwordErrorText = "用户名和密码不匹配";
                            }
                        }, function error(e) {
                            self.loginBtnTxt = '登 录';
                        });
                    });
                }

            },
            /**
             * 输入框获取焦点事件
             * @param event
             */
            handleFocus: function (event) {
                let targetName = event.target.name;
                if(targetName === "userName") {
                    this.usernameError = false;
                } else if(targetName === "passWord") {
                    this.passwordError = false;
                }
            },
            passwordFocused: function () {
                $("input[name=passWord]").focus();
            }
        },
        watch: {
            'username': function (val, oldVal) {
                this.usernameError = false;
            },
            'password': function (val, oldVal) {
                this.passwordError = false;
            }
        },
        ready: function () {

        }
    }
</script>
<style scoped>
    @import "css/login.css";
</style>
