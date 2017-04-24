<template>
    <div v-show="$route.name == 'userManagement'" class="user-management block">
        <div class="button-group">
            <button class="btn btn-default" v-link="{name:'roleManager'}">角色列表</button>
            <button class="btn btn-default-info" v-link="{name:'userManager'}">用户列表</button>
        </div>
    </div>
    <div v-show="$route.name == 'userManager' || $route.name == 'userManagerEditor'  || $route.name == 'roleManager' || $route.name == 'roleManagerEditor' || $route.name == 'userManagerEditorAlert' ||  $route.name == 'roleManagerEditorAlert'" class="block">
        <router-view></router-view>
    </div>
</template>

<style scoped>
    @import "css/userManagement.css";
</style>
