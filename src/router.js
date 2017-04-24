// 引入vue以及vue-router
import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import VueScroll from "vue-scroll";
import App from './components/app'
import constant from "assets/commonjs/constant.js";
import login from './components/login.vue';
import main from './components/main.vue';
import systemIntegration from './components/systemIntegration.vue';
import systemIntegrationEditor from './components/systemIntegrationEditor.vue';
import devFramework from './components/devFramework.vue';
import devFrameworkEditor from './components/devFrameworkEditor.vue';
import devFrameworkEditorAlert from './components/devFrameworkEditorAlert.vue';
import detail from './components/detail.vue';
import detailEditor from './components/detailEditor.vue';
import systemJournal from './components/systemJournal.vue';
import userManagement from './components/userManagement.vue';
import userManager from './components/userManager.vue';
import userManagerEditor from './components/userManagerEditor.vue';
import userManagerEditorAlert from './components/userManagerEditorAlert.vue';
import roleManager from './components/roleManager.vue';
import roleManagerEditor from './components/roleManagerEditor.vue';
import roleManagerEditorAlert from './components/roleManagerEditorAlert.vue';


Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueScroll);


//开启debug模式
Vue.config.debug = true;
// 路由器需要一个根组件。
// var App = Vue.extend(App);
// 创建一个路由器实例
var router = new VueRouter({
    history: false
});

/**
 * 每条路由规则应该映射到一个组件。
 * 这里的“组件”可以是一个使用
 * Vue.extend创建的组件构造函数，
 * 也可以是一个组件选项对象。
 */
router.map({//定义路由映射
    '/login': {
      name:'login',
      component: login
    },
    '/main': {
        name:'main',
        component: main,
        subRoutes: {
            '/': {
                name: 'systemIntegration',
                component: systemIntegration
            },
            '/systemIntegration':{
                name: 'systemIntegration',
                component: systemIntegration,
                subRoutes: {
                    '/systemIntegrationEditor': {
                        name: 'systemIntegrationEditor',
                        component: systemIntegrationEditor
                    }
                }
            },
            '/userManagement':{
                name: 'userManagement',
                component: userManagement,
                subRoutes: {
                    '/userManager': {
                        name: 'userManager',
                        component: userManager
                    },
                    '/userManagerEditor': {
                        name: 'userManagerEditor',
                        component: userManagerEditor,
                        subRoutes: {
                            '/userManagerEditorAlert': {
                                name: 'userManagerEditorAlert',
                                component: userManagerEditorAlert
                            }
                        }
                    },
                    '/roleManager': {
                        name: 'roleManager',
                        component: roleManager
                    },
                    '/roleManagerEditor': {
                        name: 'roleManagerEditor',
                        component: roleManagerEditor,
                        subRoutes: {
                            '/roleManagerEditorAlert': {
                                name: 'roleManagerEditorAlert',
                                component: roleManagerEditorAlert
                            }
                        }
                    }
                }
            },
            '/systemJournal':{
                name: 'systemJournal',
                component: systemJournal,
                subRoutes: {

                }
            },
            '/devFramework':{
                name: 'devFramework',
                component: devFramework,
                subRoutes: {
                    '/devFrameworkEditor': {
                        name: 'devFrameworkEditor',
                        component: devFrameworkEditor,
                        subRoutes: {
                            '/devFrameworkEditorAlert': {
                                name: 'devFrameworkEditorAlert',
                                component: devFrameworkEditorAlert
                            }
                        }
                    },
                    '/detail/:did': {
                        name: 'detail',
                        component: detail,
                        subRoutes: {

                        }
                    },
                    '/detailEditor': {
                        name: 'detailEditor',
                        component: detailEditor
                    },
                    '/addDetail': {
                        name: 'addDetail',
                        component: detailEditor
                    }
                }
            }
        }
    }
});


/**
 * 定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
 */
router.redirect({
    "*":"/login",  //重定向任意未匹配路径,
    "/main":"/main/systemIntegration"
});

Vue.http.options.root = process.env.NODE_ENV === 'development' ?
    (constant.commonConstant.dev_env_host +
    constant.commonConstant.dev_env_port +
    constant.commonConstant.dev_env_path_common)
:
    (constant.commonConstant.pro_env_host +
    constant.commonConstant.pro_env_port +
    constant.commonConstant.pro_env_path_common);
Vue.http.options.emulateJSON = true;
// Vue.http.options.emulateHTTP = true;
var accessToken = sessionStorage.getItem("access_token") || "";
Vue.http.headers.common['accessToken'] = accessToken;

// 现在我们可以启动应用
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(Vue.extend(App), '#app');


