<template>
<div class="topbar-menu">
    <div class="row">
     <div class="topbar-menu-left col-xs-6">
         <ul class="list-inline text-left">
             <li> <img src="../assets/images/logo1.png" alt=""></li>
             <li><img src="../assets/images/title.png" alt=""></li>
             <!--<li class="text text-red"> <span>China Eastern</span></li>-->
             <!--<li class="text"> <span>Portal system</span></li>-->
             <!--<li class="search-input"> <input type="text"  placeholder="搜索">
                 <img src="../assets/images/search.svg" alt="">
             </li>-->
         </ul>
     </div>
        <div class="topbar-menu-right col-xs-6 ">
            <ul class="list-inline text-right">
                <li> <img src="../assets/images/nortification.svg" alt=""></li>
                <li>
                    <div class="dropdown">
                        <img src="../assets/images/profile.png" id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <ul class="triangle dropdown-menu" role="menu" aria-labelledby="dLabel">
                            <li><a href="">个人信息</a></li>
                            <li><a href="">退出</a></li>
                        </ul>

                    </div>
                </li>
                <li @click="toggleEditor" class="toggle-edit"><span>{{editBut}}</span> </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
    import store from '../vuex/store'
    export default {
        vuex: {

        },
        data:function(){
            return {
                editBut:'进入编辑'


            }
        },
        route: {
            data: function(){

            }
        },
        methods: {
            toggleEditor:function(){
                var self=this;
                switch(self.$route.name){
                    case 'detail':
                        self.$route.router.go({name:"detailEditor"});
                        self.editBut='退出编辑';
                        break;
                    case 'detailEditor':
                        var currentDetailId = sessionStorage.getItem('CURRENT_DETAIL_ID')
                        self.$route.router.go({name:"detail",params:{did:currentDetailId}});
                        self.editBut='进入编辑';
                        break;
                    case 'addDetail':
                        self.$route.router.go({name:"devFramework"});
                        self.editBut='进入编辑';
                        break;
                    case 'devFramework':
                        self.$route.router.go({name:"devFrameworkEditor"});
                        self.editBut='退出编辑';
                        break;
                    case 'devFrameworkEditor':
                        self.$route.router.go({name:"devFramework"});
                        self.editBut='进入编辑';
                        break;
                    case 'systemIntegration':
                        self.$route.router.go({name:"systemIntegrationEditor"});
                        self.editBut='退出编辑';
                        break;
                    case 'systemIntegrationEditor':
                        self.$route.router.go({name:"systemIntegration"});
                        self.editBut='进入编辑';
                        break;
                    case 'userManager':
                        self.$route.router.go({name:"userManagerEditor"});
                        self.editBut='退出编辑';
                        break;
                    case 'userManagerEditor':
                        self.$route.router.go({name:"userManager"});
                        self.editBut='进入编辑';
                        break;
                    case 'roleManager':
                        self.$route.router.go({name:"roleManagerEditor"});
                        self.editBut='退出编辑';
                        break;
                    case 'roleManagerEditor':
                        self.$route.router.go({name:"roleManager"});
                        self.editBut='进入编辑';
                        break;
                }
            }
        },
        ready:function(){
            var self=this;
            switch(self.$route.name){
                case 'detail':
                    self.editBut='进入编辑';
                    break;
                case 'detailEditor':
                    self.editBut='退出编辑';
                    break;
                case 'addDetail':
                    self.editBut='退出编辑';
                    break;
                case 'devFramework':
                    self.editBut='进入编辑';
                    break;
                case 'devFrameworkEditor':
                    self.editBut='退出编辑';
                    break;
                case 'systemIntegration':
                    self.editBut='进入编辑';
                    break;
                case 'systemIntegrationEditor':
                    self.editBut='退出编辑';
                    break;
                case 'userManager':
                    self.editBut='进入编辑';
                    break;
                case 'userManagerEditor':
                    self.editBut='退出编辑';
                    break;
                case 'roleManager':
                    self.editBut='进入编辑';
                    break;
                case 'roleManagerEditor':
                    self.editBut='退出编辑';
                    break;
            }
        },
        watch:function(){

        }
    }
</script>
<style scoped>
    @import 'css/mainHeader.css';
</style>
