import Vue from 'vue'
import Router from 'vue-router'
const home = r => require.ensure([], () => r(require('@/components/home')), 'home')
const mine = r => require.ensure([], () => r(require('@/components/mine')), 'mine')
const template = r => require.ensure([], () => r(require('@/components/template')), 'template')
const notFound = r => require.ensure([], () => r(require('@/components/notFound')), 'notFound')
const login = r => require.ensure([], () => r(require('@/components/login')), 'login')
const dashboard = r => require.ensure([], () => r(require('@/components/dashboard')), 'dashboard')
const history = r => require.ensure([], () => r(require('@/components/history')), 'history')
const online = r => require.ensure([], () => r(require('@/components/online')), 'online')
const online1 = r => require.ensure([], () => r(require('@/components/online1')), 'online1')
const online2 = r => require.ensure([], () => r(require('@/components/online2')), 'online2')
const online3 = r => require.ensure([], () => r(require('@/components/online3')), 'online3')





Router.prototype.goBack = function() {
    this.isBack = true
    window.history.go(-1)
}

Vue.use(Router)

export default new Router({
    scrollBehavior: (to, from, savedPosition) => ({
        if (savedPosition) {
            setTimeout(() => {
                window.scrollTo(savedPosition.x, savedPosition.y)
            }, 200)
        }
    }),
    routes: [{
            path: '/',
            name: 'index',
            component: dashboard
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: dashboard
        },
        {
            path: '/history',
            name: 'history',
            component: history
        },
        {
            path: '/online',
            name: 'online',
            component: online
        },
        {
            path: '/online1',
            name: 'online1',
            component: online1
        },
        {
            path: '/online2',
            name: 'online2',
            component: online2
        },
        {
            path: '/online3',
            name: 'online3',
            component: online3
        },
        {
            path: '/home',
            name: 'home',
            component: home
        },
        {
            path: '/mine',
            name: 'mine',
            component: mine
        },
        {
            path: '/template',
            name: 'template',
            component: template
        },
        {
            path: '/notFound',
            name: 'notFound',
            component: notFound
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '*',
            redirect: '/notFound'
        }
    ]
})