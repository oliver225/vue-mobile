<template>
    <div id="app">
        <transition :name="transitionName">
            {{screenHeight}}
            <router-view class="child-view" :style="{'min-height':screenHeight+'px'}"></router-view>
        </transition>
        <md-tab-bar id="footer" v-model="current" :items="items" :has-ink="false" @change="onChange">
            <template slot="item" slot-scope="{ item }">
                <div class="custom-item">
                    <div class="icon">
                        <span class="icon iconfont" :class="item.icon"></span>
                    </div>
                    <div class="text">
                        <span v-text="item.label"></span>
                    </div>
                </div>
            </template>
        </md-tab-bar>
    </div>
</template>

<script>
import {Toast} from 'mand-mobile'
import { mapGetters } from 'vuex'
import { doLogin} from '@/service/getData'

export default {
    name: 'App',
    data() {
        return {
            transitionName: 'slide-left',
            msg: '废气处理实时监控',
            current: 'dashboard',
            items: [
                {name: 'dashboard', label: '概览', icon: 'icon-yibiaopan'},
                {name: 'online', label: '实时', icon: 'icon-tiaoshi'},
                {name: 'history', label: '历史', icon: 'icon-zhexiantu'}
            ],
        }
    },
    methods: {
        onChange(item, index, prevIndex) {
        }
    },
    computed: {
        ...mapGetters(['screenHeight']),
    },
    // dynamically set transition based on route change
    watch: {
        '$route'(to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            this.current = to.name
            if (to.name == 'index') {
                this.current = 'dashboard'
            }
        },
        current: function (val) {
            this.$router.push(val)
        }

    },
    mounted() {
        doLogin().then((res)=>{
            console.log(res)
            this.$store.dispatch('login', res)

        })
    }
}
</script>

<style scope lang="less">
    body {
        margin: 0
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-color: #f3f4f5;
    }

    .child-view {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #f3f4f5;
        // transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(30px, 0);
        transform: translate(30px, 0);
    }

    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-30px, 0);
        transform: translate(-30px, 0);
    }

    #footer {
        width: 100%;
        z-index: 999;
        position: fixed;
        bottom: 0;
        padding-left: 0;
        padding-right: 0;
    }

    .custom-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        flex: 1;
    }

    .custom-item .text {
        font-size: 20px;
    }
</style>