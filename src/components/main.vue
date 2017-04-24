<template>
    <div class="body-main container">
        <main-header></main-header>
        <div class="row">
            <div class="col-md-2 col-xs-12">
                <programa-menu></programa-menu>
            </div>
            <div class="col-md-10 col-xs-12 pull-right" role="main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import servers from "../servers.js";
    import popover from "../assets/commonjs/popover.js";
    import filters from "../filters.js";
    import constant from "../assets/commonjs/constant.js";
    import mainHeader from "./mainHeader.vue";
    import programaMenu from "./programaMenu.vue";
    import systemIntegration from "./systemIntegration.vue";


    export default{
        components: {
            mainHeader,
            programaMenu,
            systemIntegration
        },
        data:function(){
            return {

            }
        },
        methods: {

        },
        ready: function () {

        },
        watch:function(){

        }
    }
</script>
<style scoped>
    @import "css/main.css";
</style>
