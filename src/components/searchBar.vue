<template>
    <div class="search-input col-md-2 col-xs-12 pull-right" style="background: #fff">
        <input type="text"  placeholder="搜索" v-model="searchInfo">
        <img src="../assets/images/search.svg" alt="" @click="toSearchArticle">
    </div>
</template>
<script>
    import Vue from 'vue';
    import servers from "../servers.js";
    import popover from "../assets/commonjs/popover.js";
    import filters from "../filters.js";
    import constant from "../assets/commonjs/constant.js";
    import directives from "../directives.js";
    import {updatedevFrameworkList} from '../vuex/actions'
    import {getdevFrameworkList} from "../vuex/getters"
    export default {
        components: {

        },
        vuex: {
            getters: {
                devFrameworkList : getdevFrameworkList
            },
            actions: {
                updatedevFrameworkList
            }
        },
        data: function(){
            return {
                searchInfo:''
            }
        },
        methods: {
            toSearchArticle: function(){
                var self = this;
                var searchInfo = self.searchInfo;
                var request = 0;
                var params = {
                    title : "%" + searchInfo + "%"
                };
                var _params = {
                    source : "%" + searchInfo + "%"
                };
                var params1 = {
                    contentText : "%" + searchInfo + "%"
                };
                popover.loading.show();
                servers.getContentColumns(self,params,function(res) {
                    console.log(res)
                    request++;
                    self.updatedevFrameworkList(res)
                    if(request == 3){
                        popover.loading.hide();
                    }
                });
                servers.getContentColumns(self,_params,function(res) {
                    console.log(res)
                    request++;
                    var newList = self.devFrameworkList.concat(res)
                    _.uniq(newList)
                    self.updatedevFrameworkList(newList)
                    if(request == 3){
                        popover.loading.hide();
                    }
                })
                servers.getContentColumns(self,params1,function(res){
                    console.log(res)
                    request++;
                    var newList = self.devFrameworkList.concat(res)
                    _.uniq(newList)
                    self.updatedevFrameworkList(newList)
                    if(request == 3){
                        popover.loading.hide();
                    }
                })
            }
        }
    }
</script>

