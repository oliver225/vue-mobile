<template>
    <div class="online">
        <md-tabs @change="$_onTabChange" immediate v-model="current">
            <md-tab-pane v-for="(cat,index) in lists" :key="index" class="content" :name="cat.name" :style="{height:contentHeight+'px'}" :label="cat.label">
                <img class="top-img" :src="path(cat.image)"/>
                <md-scroll-view :ref="'scrollView'+index" :auto-reflow="true" :scrolling-x="false" @refreshing="$_onRefresh(index)">
                    <md-scroll-view-refresh slot="refresh"
                                            slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
                                            :scroll-top="scrollTop"
                                            :is-refreshing="isRefreshing"
                                            :is-refresh-active="isRefreshActive"/>
                    <div class="field">
                        <item v-for="(item,j) in cat.items" :key="j" v-bind="item"/>
                    </div>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </md-scroll-view>
            </md-tab-pane>
        </md-tabs>
    </div>
</template>

<script>
import item from '@/components/item'
import {mapGetters} from 'vuex'
import {config, onlineList} from '@/service/getData'
export default {
    name: 'onlineCon',
    components: {item},
    data() {
        return {
            current:'',
            lists:[{id:'',name:''}],
            isFinished: false,
        }
    },
    methods: {
        $_onRefresh(index) {
            // async data
            let list = this.lists[index];
            let name = list.name;
            setTimeout(() => {
                list.items.forEach(i=>{
                    i.value+=Math.floor(Math.random()*10);
                });
                this.lists.splice(index,1,list);
                console.log(this.$refs)
            }, 2000)
        },
        $_onTabChange(tab) {
            console.log(tab.name)
            //this.$refs[tab.name].init()
        },
        path(url){
            return config.base+url;
        }
    },
    computed: {
        ...mapGetters(['screenHeight']),
        contentHeight:function () {
            return this.screenHeight -42.6;
        }
    },
    mounted() {
        onlineList().then((res)=>{
            console.log(res)
            this.lists = res;
            this.current = this.lists[0].name
        })
    }
}
</script>

<style lang="less">
    .online {
        background-color: #f3f4f5;
    }
    .online .content {
        height: 41rem;
    }
    .online .md-tab-bar {
        box-shadow: 0 2px 8px #f0f0f0;
    }

    .top-img {
        width: 100%;
        height: 10rem;
    }

    .field {
        display: -webkit-flex;
        display: flex;
        flex-wrap: wrap;
        padding: .5rem;
        justify-content: space-between;
    }

</style>

