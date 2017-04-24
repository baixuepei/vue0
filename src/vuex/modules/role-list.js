import _ from "lodash";
import constant from "../../assets/commonjs/constant.js";
import servers from "../../servers.js";
import {
    UPDATE_ROLE_LIST,
    UPDATE_ROLE_LIST_PAGE_NUM,
    INIT_ROLE_LIST,
    LOAD_MORE_ROLE_LIST,
    RESET_STATE_ROLE_LIST
} from '../mutation-types'

const state = {
    hasRoleListNextPage: true,
    currentRoleListPageNum: 1,
    roleList: [
        {id:'1',name:'超级管理员',updateTime:1484014212497,limitList:'编辑、删除'},
        {id:'2',name:'管理员',updateTime:1484014212497,limitList:'编辑、删除'},
        {id:'3',name:'管理员',updateTime:1484014212497,limitList:'编辑、删除'},
        {id:'4',name:'管理员',updateTime:1484014212497,limitList:'编辑、删除'},
        {id:'5',name:'管理员',updateTime:1484014212497,limitList:'编辑、删除'},
        {id:'6',name:'管理员',updateTime:1484014212497,limitList:'编辑、删除'},
        {id:'7',name:'管理员',updateTime:1484014212497,limitList:'编辑、删除'},
        {id:'8',name:'管理员',updateTime:1484014212497,limitList:'编辑、删除'},
        {id:'9',name:'操作员',updateTime:1484014212497,limitList:'编辑、删除'}]
};

// mutations
const mutations = {
    [UPDATE_ROLE_LIST] (state, roleList) {
        state.roleList = roleList
    },
    [UPDATE_ROLE_LIST_PAGE_NUM] (state, currentRoleListPageNum,hasRoleListNextPage) {
        state.currentRoleListPageNum = currentRoleListPageNum
        state.hasRoleListNextPage = hasRoleListNextPage
    },
    [INIT_ROLE_LIST] (state,self) {
        var params = {
            skip: 'contentText',
            order: 'desc', //asc:正序，desc:倒序
            sortBy: 'sortNum',
            page: 1,
            perPage: state.pageSize
        };
        /*servers.getContentColumns(self,params,function(res){
            console.log(res)
            state.roleList = res
        });*/
        
        //reset currentRoleListPageNum
        state.currentRoleListPageNum = 1;
        state.hasRoleListNextPage = true;
    },
    [LOAD_MORE_ROLE_LIST] (state,self) {
        if (!state.hasRoleListNextPage) {
            return;
        }
        var params = {
            skip: 'contentText',
            order: 'desc', //asc:正序，desc:倒序
            sortBy: 'sortNum',
            page: ++state.currentRoleListPageNum,
            perPage: state.pageSize
        }
        /*servers.getContentColumns(self, params, function (res) {
            if (res.length < state.pageSize) {
                state.hasRoleListNextPage = false;
            } else {
                state.hasRoleListNextPage = true;
            }
            state.roleList = state.roleList.concat(res);
            // state.currentRoleListPageNum++;
        })*/
    },

    [RESET_STATE_ROLE_LIST] (state){
        state.hasRoleListNextPage = true;
        state.currentRoleListPageNum = 1;
        state.roleList = [];
    }
};
export default {
    state, mutations
}
