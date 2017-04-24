/**
 * @constant.js 公共常量
 *
 */
let commonConstant =  {
    /*pro_env_host:"http://172.28.34.38",
    pro_env_port:":9080",*/
    pro_env_host:"",
    pro_env_port:"",
    pro_env_path_common:"/portal/v1",
    dev_env_host:"http://172.20.41.46",
    dev_env_port:":8080",
    dev_env_path_common:"/portal/v1",
    programasMenuList:[
        {sort:"systemIntegration",title:"系统集成",icon:"glyphicon-home"},
        {sort:"userManagement",title:"用户管理",icon:"glyphicon-list"},
        {sort:"systemJournal",title:"系统日志",icon:"glyphicon-file"},
        {sort:"devFramework",title:"开发框架",icon:"glyphicon-briefcase"}
    ],
    devFrameworkPerPage: 7,
    linkTypes:['链接在当前页面打开','链接在新页面打开']
};

module.exports = {
    commonConstant : commonConstant
}
