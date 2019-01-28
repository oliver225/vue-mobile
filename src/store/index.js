/*
  Vuex 最核心的对象管理store
*/
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)
var screenHeight = window.document.documentElement.clientHeight;
var screenWidth = window.document.documentElement.clientWidth;
var ua = window.navigator.userAgent.toLowerCase();
var isWechat = ua.match(/MicroMessenger/i) == 'micromessenger'

const state = {
    isLoading: true, // loading状态
    screenHeight:screenHeight, // 屏幕高度
    screenWidth:screenWidth,  //屏幕宽度
    isWechat: isWechat,  // 是否微信
    user:{
        userName:'lovol',
        id:'',
        result:false,
        message:'',
        sessionid:'',
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})