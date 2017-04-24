import * as types from './mutation-types'
// set beatTimer
export const setBeatTimer = ({dispatch}) => {
    dispatch(types.SET_BEAT_TIMER);
}
// update showProgramaAlertFlag
export const updateShowProgramaAlertFlag = ({dispatch},flag) => {
    dispatch(types.UPDATE_SHOW_PROGRAMA_ALERT_FLAG,flag);
}
// update devFrameworkList
export const updatedevFrameworkList = ({dispatch},list) => {
    dispatch(types.UPDATE_DEV_FRAME_LIST,list);
}
// update currentDetailObj
export const updatecurrentDetailObj = ({dispatch},obj) => {
    dispatch(types.UPDATE_CURRENT_DETAIL_OBJ,obj);
}
export const updatecurrentSystemObj = ({dispatch},obj) => {
    dispatch(types.UPDATE_CURRENT_SYSTEM_OBJ,obj);
}
//update currentPageNum and hasNextPage
export const updateCurrentPageNum = ({dispatch},currentPageNum,hasNextPage) => {
    dispatch(types.UPDATE_CURRENT_PAGE_NUM,currentPageNum,hasNextPage);
}
//init page files
export const initPageFiles = ({dispatch},self) => {
    dispatch(types.INIT_PAGE_FILES,self);
}
//load more files
export const loadMoreFiles = ({dispatch},self) => {
    dispatch(types.LOAD_MORE_FILES,self);
}
// update updateroleList
export const updateroleList = ({dispatch},list) => {
    dispatch(types.UPDATE_ROLE_LIST,list);
}
// update userList
export const updateuserList = ({dispatch},list) => {
    dispatch(types.UPDATE_USER_LIST,list);
}
//init roleList
export const initRoleList = ({dispatch},self) => {
    dispatch(types.INIT_ROLE_LIST,self);
}
//init userList
export const initUserList = ({dispatch},self) => {
    dispatch(types.INIT_USER_LIST,self);
}
//load more role list
export const loadMoreRoleList = ({dispatch},self) => {
    dispatch(types.LOAD_MORE_ROLE_LIST,self);
}

//load more user list
export const loadMoreUserList = ({dispatch},self) => {
    dispatch(types.LOAD_MORE_USER_LIST,self);
}

// reset state
export const resetState = ({dispatch}) => {
    dispatch(types.RESET_STATE_GLOBAL);
    dispatch(types.RESET_STATE_ROLE_LIST);
    dispatch(types.RESET_STATE_USER_LIST);
};
