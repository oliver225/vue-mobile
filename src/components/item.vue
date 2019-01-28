<template>
    <div class="item">
        <span class="title">{{label}}</span>
        <md-amount :value="value" :duration="800" transition></md-amount>
        <span class="describe">{{unit}}</span>
        <span class="info">{{info}}</span>
        <canvas class="item-chart" :id="name"></canvas>
    </div>
</template>

<script>
import F2 from '@antv/f2'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
//                name:'temp',
//                label:'温度',
//                data: [
//                    {date: "2017-06-05", value: 116},
//                ],
//                value: 500,
            chart: null
        }
    },
    props: ['name','label','value','type','unit','info','datas'],
    methods: {},
    mounted() {
        this.chart && this.chart.destory();
        this.chart = new F2.Chart({
            id: this.name,
            width: this.chartWidth,
            height: 80,
            pixelRatio: window.devicePixelRatio,

        });
        this.chart.source(this.datas);
        this.chart.axis(false);
        this.chart.tooltip(false);
        if(this.type=='line'){
            this.chart.line().position('date*value').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
        }
        if(this.type=='bar'){
            this.chart.interval().position('date*value').color('l(90) 0:#1890ff 1:#70cdd0');
        }
        this.chart.area().position('date*value').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
        this.chart.render();
    },
    computed: {
        ...mapGetters(['screenWidth']),
        chartWidth: function () {
            return this.screenWidth *0.5;
        }
    },
    watch: {}
}
</script>
<style scoped lang="less">
    .item {
        flex-direction: column;
        margin-bottom: .5rem;
        background-color: white;
        color: black;
        height: 3.6rem;
        width: 45%;
        border-radius: 0.4rem;
        display: inline-block;
        padding: .3rem;
        color: darkblue;
        position: relative;

    }
    .item-chart {
        width: 100%;
        position: absolute;
        top: 0;
        right: -20px;
    }

    .title {
        position: absolute;
        top: .5rem;
        left: 1rem;
        font-size: 28px;
        font-weight: bold;
        color: #2c3e50;
        z-index: 20;
    }
    .info{
        position: absolute;
        top: 1.6rem;
        left: 1rem;
        width: 4rem;
        font-size: 10px;
        color: #41485d;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
        z-index: 20;
        font-family: DINAlternate-Bold;
        //font-size: 32px;


    }

    .md-amount {
        text-align: center;
        color: #666;
        position: absolute;
        top: .5rem;
        right: 2rem;
        font-size: 50px;
        font-weight: bold;
        z-index: 20;
    }
    .describe{
        text-align: center;
        color: #666;
        position: absolute;
        top: .5rem;
        right: 1rem;
        font-size: 28px;
        font-weight: bold;
        z-index: 20;
    }
</style>
