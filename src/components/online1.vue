<template>
    <div class="online1">
        <img class="top-img" :src="url"/>
        <md-scroll-view ref="scrollView" scroll="$_onScroll" :scrolling-x="false">
            <div class="field">
                <item v-for="(item,index) in list" :key="index" v-bind="item"></item>
            </div>
            {{index}}
        </md-scroll-view>
    </div>
</template>

<script>
import item from '@/components/item'
export default {
    components: {item},
    data() {
        return {
            url: 'http://fuss10.elemecdn.com/b/df/b630636b444346e38cef6c59f6457jpeg.jpeg',
            list: [
                {name: 'temp', label:'温度', value: 78,type:'line',unit:'℃', data:[
                    {date: "2017-06-17", value: 115},
                    {date: "2017-06-18", value: 111},
                    {date: "2017-06-19", value: 309},
                    {date: "2017-06-20", value: 206},
                    {date: "2017-06-21", value: 137},
                    {date: "2017-06-22", value: 128},
                    {date: "2017-06-23", value: 85},
                    {date: "2017-06-24", value: 94},
                    {date: "2017-06-25", value: 71},
                    {date: "2017-06-26", value: 106},
                    {date: "2017-06-27", value: 84},
                    {date: "2017-06-28", value: 93},
                    {date: "2017-06-29", value: 85},
                    {date: "2017-06-30", value: 73},
                    {date: "2017-07-01", value: 83},
                    {date: "2017-07-02", value: 125},
                    {date: "2017-07-03", value: 107},
                    {date: "2017-07-04", value: 82},
                    {date: "2017-07-05", value: 44},
                    {date: "2017-07-06", value: 72},
                    {date: "2017-07-07", value: 106},]},
                {name: 'ssa', label:'湿度', value: 90, type:'line', data:[
                    {date: "2017-06-05", value: 116},
                    {date: "2017-06-06", value: 129},
                    {date: "2017-06-07", value: 135},
                    {date: "2017-06-08", value: 86},
                    {date: "2017-06-09", value: 73},
                    {date: "2017-06-10", value: 85},
                    {date: "2017-06-11", value: 73},
                    {date: "2017-06-12", value: 68}]},
                {name: 'storg', label:'强度', value: 56, type:'bar', data:[
                    {date: "2017-06-16", value: 139},
                    {date: "2017-06-17", value: 115},
                    {date: "2017-06-18", value: 111},
                    {date: "2017-06-19", value: 309},
                    {date: "2017-06-20", value: 206},
                    {date: "2017-06-21", value: 137},
                    {date: "2017-06-22", value: 128},
                    {date: "2017-06-23", value: 85},
                    {date: "2017-06-24", value: 94},
                    {date: "2017-06-25", value: 71},
                    {date: "2017-06-26", value: 106},
                    {date: "2017-06-27", value: 84}]},
                {name: 'ccc', label:'硬度', value: 34, type:'line',unit:'Kw', data:[
                    {date: "2017-06-05", value: 116},
                    {date: "2017-06-06", value: 129},
                    {date: "2017-06-07", value: 135},
                    {date: "2017-06-08", value: 86},
                    {date: "2017-06-09", value: 73},
                    {date: "2017-06-10", value: 85},
                    {date: "2017-06-11", value: 73}]},
                {name: 'oop', label:'o读', value: 56, type:'line', info:'机运的数据', data:[
                    {date: "2017-06-05", value: 116},
                    {date: "2017-06-06", value: 129},
                    {date: "2017-06-07", value: 135},
                    {date: "2017-06-08", value: 86},
                    {date: "2017-06-09", value: 73},
                    {date: "2017-06-10", value: 85},
                    {date: "2017-06-11", value: 73},
                    {date: "2017-06-12", value: 68},
                    {date: "2017-06-13", value: 92},
                    {date: "2017-06-14", value: 130},
                    {date: "2017-06-15", value: 245},
                    {date: "2017-06-16", value: 139},
                    {date: "2017-06-17", value: 115},
                    {date: "2017-06-18", value: 111},
                    {date: "2017-06-19", value: 309},
                    {date: "2017-06-20", value: 206},
                    {date: "2017-06-21", value: 137},
                    {date: "2017-06-22", value: 128}]},
            ],
            chart: null
        }
    },
    method: {
        $_onScroll({scrollLeft, scrollTop}) {
            console.log(`[Mand Mobile ScrollView - demo0 - onScroll] scrollLeft: ${scrollLeft}, scrollTop: ${scrollTop}`)
        },
        toast() {
            Toast({
                message: '报警',
                position: 'bottom',
                duration: 5000
            })
        },
    },
    mounted () {
    },
    created () {

    }
}
</script>
<style scoped lang="less">
    .online1 {
        text-align: left;

    }

    .field {
        display: -webkit-flex;
        display: flex;
        flex-wrap: wrap;
        padding: .5rem;
        justify-content:space-between;
    }

    .top-img {
        width: 100%;
        height: 14rem;
    }


</style>
