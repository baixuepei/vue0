<template>
    <div class="body-programa-menu">
        <ul class="nav nav-pills nav-stacked nav-programa">
            <li v-for="l in programasMenuList"
            track-by="$index">
                <a href="javascript:void(0)"
                   v-show="l.sort == 'systemIntegration'"
                   v-link="{name: 'systemIntegration',activeClass: 'active triangle'}"
                ><i class="glyphicon" :class="l.icon"></i>
                    {{l.title}}</a>
                <a href="javascript:void(0)"
                   v-show="l.sort == 'userManagement'"
                   v-link="{ name: 'userManagement',activeClass: 'active triangle'}">
                    <i class="glyphicon" :class="l.icon"></i>
                    {{l.title}}</a>
                <a href="javascript:void(0)"
                   v-show="l.sort == 'systemJournal'"
                   v-link="{ name: 'systemJournal',activeClass: 'active triangle'}">
                    <i class="glyphicon" :class="l.icon"></i>
                    {{l.title}}</a>
                <a href="javascript:void(0)"
                   v-show="l.sort == 'devFramework'"
                   v-link="{ name: 'devFramework',activeClass: 'active triangle'}">
                    <i class="glyphicon" :class="l.icon"></i>
                    {{l.title}}</a>
            </li>
        </ul>
    </div>
    <div class="body-programa-menu-overlay col-md-2"
         v-show="$route.name == 'detailEditor'
            ||   $route.name == 'addDetail'
            ||   $route.name == 'devFrameworkEditor'
            ||   $route.name == 'devFrameworkEditorAlert'
            ||   $route.name == 'systemIntegrationEditor'
            ||   $route.name == 'userManagerEditor'
            ||   $route.name == 'roleManagerEditor'
            ||   $route.name == 'userManagerEditorAlert'
            ||   $route.name == 'roleManagerEditorAlert'
         "></div>
</template>

<script>
    import Vue from "vue";
    import servers from "../servers.js";
    import popover from "../assets/commonjs/popover.js";
    import filters from "../filters.js";
    import directives from "../directives.js";
    import constant from "../assets/commonjs/constant.js";

    export default{
        components: {

        },
        vuex: {
            getters: {

            },
            actions: {

            }
        },
        data:function(){
            return {
                programasMenuList: constant.commonConstant.programasMenuList
            }
        },
        route: {
            data: function(){

            }
        },
        methods: {

        },
        ready: function () {

        }
    }
</script>
<style scoped>
    @import "css/programaMenu.css";
</style>
