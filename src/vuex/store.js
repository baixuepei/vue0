import Vue from "vue"
import Vuex from 'vuex'
import global from "./modules/global"
import roleList from "./modules/role-list"
import userList from "./modules/user-list"
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        global,
        roleList,
        userList
    }
})
