import _ from "lodash";
import constant from "../../assets/commonjs/constant.js";
import servers from "../../servers.js";
import {
    SET_BEAT_TIMER,
    UPDATE_SHOW_PROGRAMA_ALERT_FLAG,
    UPDATE_DEV_FRAME_LIST,
    UPDATE_CURRENT_DETAIL_OBJ,
    UPDATE_CURRENT_SYSTEM_OBJ,
    UPDATE_CURRENT_PAGE_NUM,
    INIT_PAGE_FILES,
    LOAD_MORE_FILES,
    RESET_STATE_GLOBAL
} from '../mutation-types'

const state = {
    hasNextPage: true,
    currentPageNum: 1,
    pageSize: 10,
    beatTimer: null,
    showProgramaAlertFlag: false,
    devFrameworkList:[],
    currentDetailObj:{},
    currentSystemObj:{}

};

// mutations
const mutations = {
    [SET_BEAT_TIMER](state){
        if(state.beatTimer == null){
            console.log("start beat timer");
            state.beatTimer = setInterval(function(){
                servers.userHeartbeat({},function(res){
                    if(res.resultCode && res.resultCode != 1){
                        clearInterval(state.beatTimer);
                        state.beatTimer = null;
                    }
                },function(res){
                    clearInterval(state.beatTimer);
                    state.beatTimer = null;
                });
            },1*60*1000)
        }
    },
    //update showProgramaAlertFlag
    [UPDATE_SHOW_PROGRAMA_ALERT_FLAG] (state, showProgramaAlertFlag) {
        state.showProgramaAlertFlag = showProgramaAlertFlag
    },
    [UPDATE_DEV_FRAME_LIST] (state, devFrameworkList) {
        state.devFrameworkList = devFrameworkList
    },
    [UPDATE_CURRENT_DETAIL_OBJ] (state, currentDetailObj) {
        state.currentDetailObj = currentDetailObj
    },
    [UPDATE_CURRENT_SYSTEM_OBJ] (state, currentSystemObj) {
        state.currentSystemObj = currentSystemObj
    },
    [UPDATE_CURRENT_PAGE_NUM] (state, currentPageNum,hasNextPage) {
        state.currentPageNum = currentPageNum
        state.hasNextPage = hasNextPage
    },
    [INIT_PAGE_FILES] (state,self) {
        console.log("init page")
        //reset scrollTop
        $(".scroll-list-wrap").scrollTop(0);
        //reset currentPageNum
        state.currentPageNum = 1;
        state.hasNextPage = true;
        var params = {
            skip: 'contentText',
            order: 'desc', //asc:正序，desc:倒序
            sortBy: 'sortNum',
            page: 1,
            perPage: state.pageSize
        };
        servers.getContentColumns(self,params,function(res){
            console.log(res)
            state.devFrameworkList = res
        });
    },
    [LOAD_MORE_FILES] (state,self) {
        if (!state.hasNextPage) {
            return;
        }
        var params = {
            skip: 'contentText',
            order: 'desc', //asc:正序，desc:倒序
            sortBy: 'sortNum',
            page: ++state.currentPageNum,
            perPage: state.pageSize
        }
        servers.getContentColumns(self, params, function (res) {
            if (res.length < state.pageSize) {
                state.hasNextPage = false;
            } else {
                state.hasNextPage = true;
            }
            console.log(state.devFrameworkList)
            state.devFrameworkList = state.devFrameworkList.concat(res);
            console.log(state.devFrameworkList)
        })
    },

    [RESET_STATE_GLOBAL] (state){
        state.hasNextPage = true;
        state.currentPageNum = 1;
        state.pageSize = 10;
        //clear beat timer
        clearInterval(state.beatTimer);
        state.beatTimer = null;
        state.showProgramaAlertFlag = false;
        state.devFrameworkList = [];
        state.currentDetailObj = {};
        state.currentSystemObj = {}
    }
};
export default {
    state, mutations
}
