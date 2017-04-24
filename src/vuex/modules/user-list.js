import _ from "lodash";
import constant from "../../assets/commonjs/constant.js";
import servers from "../../servers.js";
import {
    UPDATE_USER_LIST,
    UPDATE_USER_LIST_PAGE_NUM,
    INIT_USER_LIST,
    LOAD_MORE_USER_LIST,
    RESET_STATE_USER_LIST
} from '../mutation-types'

const state = {
    hasUserListNextPage: true,
    currentUserListPageNum: 1,
    userList: [
        {id:'1',name:'张三',updateTime:1484014212497,limitList:'编辑、删除'},
        {id:'2',name:'王五',updateTime:1484014212497,limitList:'编辑、删除'}]
};

// mutations
const mutations = {
    [UPDATE_USER_LIST] (state, userList) {
        state.userList = userList
    },
    [UPDATE_USER_LIST_PAGE_NUM] (state, currentUserListPageNum,hasUserListNextPage) {
        state.currentUserListPageNum = currentUserListPageNum
        state.hasUserListNextPage = hasUserListNextPage
    },
    [INIT_USER_LIST] (state,self) {
        var params = {
            skip: 'contentText',
            order: 'desc', //asc:正序，desc:倒序
            sortBy: 'sortNum',
            page: 1,
            perPage: state.pageSize
        };
        /*servers.getContentColumns(self,params,function(res){
            console.log(res)
            state.userList = res
        });*/

        //reset currentUserListPageNum
        state.currentUserListPageNum = 1;
        state.hasUserListNextPage = true;
    },
    [LOAD_MORE_USER_LIST] (state,self) {
        if (!state.hasUserListNextPage) {
            return;
        }
        var params = {
            skip: 'contentText',
            order: 'desc', //asc:正序，desc:倒序
            sortBy: 'sortNum',
            page: ++state.currentUserListPageNum,
            perPage: state.pageSize
        }
        /*servers.getContentColumns(self, params, function (res) {
            if (res.length < state.pageSize) {
                state.hasUserListNextPage = false;
            } else {
                state.hasUserListNextPage = true;
            }
            state.userList = state.userList.concat(res);
            // state.currentUserListPageNum++;
        })*/
    },

    [RESET_STATE_USER_LIST] (state){
        state.hasUserListNextPage = true;
        state.currentUserListPageNum = 1;
        state.userList = [];
    }
};
export default {
    state, mutations
}
