/*global*/
export const getShowProgramaAlertFlag = ({global}) => global.showProgramaAlertFlag;
export const getdevFrameworkList = ({global}) => global.devFrameworkList;
export const getcurrentDetailObj = ({global}) => global.currentDetailObj;
export const getcurrentSystemObj = ({global}) => global.currentSystemObj;
export const getPageSize = ({global}) => global.pageSize;
export const getCurrentPageNum = ({global}) => global.currentPageNum;
export const getHasNextPage = ({global}) => global.hasNextPage;
/*roleList*/
export const getroleList = ({roleList}) => roleList.roleList;
export const getcurrentRoleListPageNum = ({roleList}) => roleList.currentRoleListPageNum;
export const gethasRoleListNextPage = ({roleList}) => roleList.hasRoleListNextPage;
/*userList*/
export const getuserList = ({userList}) => userList.userList;
export const getcurrentUserListPageNum = ({userList}) => userList.currentUserListPageNum;
export const gethasUserListNextPage = ({userList}) => userList.hasUserListNextPage;
