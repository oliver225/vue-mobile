<template>
    <div class="history">
        <md-tabs>
            <md-tab-pane class="content" name="history" :label="selected.label">
                <md-scroll-view ref="scrollView" :auto-reflow="true" :bouncing="false" :scrolling-y="false">
                    <div class="main-value">
                        <div class="value-item" v-for="(d,index) in topData " :key="index"
                             :style="{width:itemWidth+'px'}">
                            <span class="value-text">{{d.title}}</span>
                            <md-amount :style="{color: d.color}" :value="d.val" has-separator :duration="800"
                                       transition/>
                        </div>
                    </div>
                </md-scroll-view>
                <div class="chart">
                    <div class="tooltip" v-show="tooltip.value>0" >
                        <div class="tooltipName">{{tooltip.date}}</div>
                        <div class="tooltipValue">
                            数值：<span :style="{color:tooltip.color}">{{tooltip.value}}</span>
                        </div>
                    </div>
                    <canvas id="mountNode"></canvas>
                    <div class="tab">
                        <button class="btn" :class="{'active': chartActive=='one'}" @click="selectChartActive('one')"
                                id="one">近 12 时
                        </button>
                        <button class="btn" :class="{'active': chartActive=='three'}" @click="selectChartActive('three')"
                                id="three">近 1 天
                        </button>
                        <button class="btn" :class="{'active': chartActive=='six'}" @click="selectChartActive('six')"
                                id="six">近 1 月
                        </button>
                        <button class="btn" :class="{'active': chartActive=='year'}"
                                @click="selectChartActive('year')" id="oneYear">近 3 月
                        </button>
                    </div>
                </div>
                <div class="warning"></div>
            </md-tab-pane>
        </md-tabs>
        <div class="menu-trigger" @click="showPopUp()"><i class="icon iconfont icon-shebeiguanli"></i></div>
        <md-popup v-model="isPopupShow" position="left" @show="onPopupShow">
            <div class="popup-left">
                <md-scroll-view ref="scrollView" :auto-reflow="true" :scrolling-x="false" @scroll="onScroll">
                    <div v-for="(cat , index) in category" :key="index" class="scroll-view-category">
                        <p class="scroll-view-category-title">{{cat.type}}</p>
                        <div v-for="cate  in category[index].list" class="scroll-view-list">
                            <p class="scroll-view-item" @click="selectItem(cate)">{{cate.label}}</p>
                        </div>
                    </div>
                </md-scroll-view>
                <p v-if="activeBlockIndex >-1" class="scroll-view-striky-title">{{ category[activeBlockIndex].type}}</p>

            </div>
        </md-popup>
    </div>
</template>

<script>
import F2 from '@antv/f2'
import {mapGetters} from 'vuex'
import {animted} from '@/service/animted'
export default {
    name: 'history',
    data() {
        return {
            isPopupShow: false,
            category: [
                {
                    'type': '原始废气',
                    list: [{'label': '进气温度A', name: 'inlet-tempA'},
                        {'label': '进气温度B', name: 'inlet-tempB'},
                        {'label': '进气湿度A', name: 'inlet-humidityA'},
                        {'label': '进气湿度B', name: 'inlet-humidityB'},
                        {'label': '风机A压力滤波值', name: 'fanA'},
                        {'label': '风机B压力滤波值', name: 'fanB'}]
                },
                {
                    'type': '转轮处',
                    list: [{'label': '吸附后温度A', name: 'post-tempA'},
                        {'label': '吸附后温度B', name: 'post-tempB'},
                        {'label': '脱附温度A', name: 'degreasing-tempA'},
                        {'label': '脱附温度B', name: 'degreasing-tempB'},
                        {'label': '脱附后温度A', name: 'post-degreasing-tempA'},
                        {'label': '吸附风机A频率', name: 'fanA'},
                        {'label': '吸附风机B频率', name: 'fanB'}]
                },
                {
                    'type': 'RTO',
                    list: [{'label': 'RTO前温度', name: 'pre-rto-temp'},
                        {'label': 'RTO后温度', name: 'post-rto-temp'},
                        {'label': '烘干室温度', name: 'drying-room-temp'},
                        {'label': '调湿气体温度', name: 'humidity-gas-temp'},
                        {'label': '燃烧室压力值', name: 'firebox-pressure'},
                        {'label': '燃烧室温度', name: 'firebox-temp'}]
                },
                {
                    'type': '在线监测',
                    list: [{'label': 'CO2p', name: 'CO2p'},
                        {'label': 'S2Hx', name: 'S2Hx'},
                        {'label': 'CO24', name: 'CO24'},
                        {'label': 'S22H', name: 'S22H'},
                        {'label': 'CO26', name: 'CO26'},
                        {'label': 'S32H', name: 'S32H'}]
                }],
            activeIndex: -1,
            dimensions: [],
            scrollY: 0,
            selected: null,
            chartActive: 'one',
            topData: [{title: '平均值', val: 96.57, color: 'green'},
                {title: '最大值', val: 99.99, color: '#666'},
                {title: '最小值', val: 9.98, color: 'orange'}],
            oneMonth: 0,
            threeMonth:0,
            sixMonth:0,
            oneYear:0,
            lineData:[],
            chart:null,
            tooltip:{
                date:'',
                value:0,
                color:'#E9F1FF'
            }
        }
    },
    computed: {
        ...mapGetters(['screenWidth']),
        itemWidth: function () {
            return this.screenWidth * 0.5;
        },
        activeBlockIndex() {
            let activeIndex = -1
            this.dimensions.forEach((dimension, index) => {
                if (this.scrollY >= dimension[0] && this.scrollY <= dimension[1]) {
                    activeIndex = index
                }
            })
            return activeIndex
        },
    },
    mounted() {
        // 如果内容发生变化，需重新初始化block和scroller
        //this.initScrollBlock()
        // this.$refs.scrollView.reflowScroller()
        this.selected = this.category[0].list[0];
        this.drawAnimate();
        this.drawLine(animted);

    },
    methods: {
        drawLine(data){
            var source = [];
            var i = 0;
            data.map(function(obj) {
                i++;
                if (obj.reportDate === "2018-01-02") {
                    this.oneMonth = i;
                } else if (obj.reportDate === "2017-11-01") {
                    this.threeMonth = i;
                } else if (obj.reportDate === "2017-08-01") {
                    this.sixMonth = i;
                } else if (obj.reportDate === "2017-01-03") {
                    this.oneYear = i;
                }
                obj.value = obj.value * 1;
                source.push(obj);
            }.bind(this));
            this.lineData = source;
            this.chart && this.chart.destory();
            this.$nextTick(() =>{
                this.chart = new F2.Chart({
                    id: 'mountNode',
                    width: this.screenWidth,
                    pixelRatio: window.devicePixelRatio
                });
                this.chart.source(data.slice(this.oneMonth), {
                    reportDateTimestamp: {
                        type: 'timeCat',
                        tickCount: 3,
                        range: [0, 1]
                    },
                    value: {
                        alias: '涨幅',
                        tickCount: 5,
                        formatter: function formatter(val) {
                            return val.toFixed(2) + '%';
                        }
                    }
                });
                this.chart.tooltip({
                    showCrosshairs: true,
                    custom: true, // 自定义 tooltip 内容框
                    onChange: function onChange(obj) {
                        let items = obj.items;
                        let originData = items[0].origin;
                        let date = originData.reportDate;
                        let value = originData.value;
                        let color;
                        if (value >= 0) {
                            color = '#FA541C';
                        } else {
                            color = '#1CAA3D';
                        }
                        this.tooltip={
                            date:date,
                            value:value,
                            color:color
                        }
                    }.bind(this),
                    onHide: function onHide() {
                        this.tooltip = {
                            date: '',
                            value: 0,
                            color: '#E9F1FF'
                        }
                    }.bind(this)
                });
                this.chart.axis('reportDateTimestamp', {
                    label: function label(text, index, total) {
                        var cfg = {
                            textAlign: 'center'
                        };
                        // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
                        if (index === 0) {
                            cfg.textAlign = 'start';
                        }
                        if (index > 0 && index === total - 1) {
                            cfg.textAlign = 'end';
                        }
                        return cfg;
                    }
                });
                this.chart.line({
                    sortable: false
                }).position('reportDateTimestamp*value').shape('smooth').animate({
                    update: {
                        animation: 'lineUpdate'
                    }
                });
                this.chart.area({
                    sortable: false
                }).position('reportDateTimestamp*value').shape('smooth').animate({
                    update: {
                        animation: 'lineUpdate'
                    }
                });
                this.chart.render();
            })

        },
        drawAnimate() {
            F2.Animate.registerAnimation('lineUpdate', function (updateShape, animateCfg) {
                var cacheShape = updateShape.get('cacheShape'); // 该动画 shape 的前一个状态
                var cacheAttrs = cacheShape.attrs; // 上一个 shape 属性
                var geomType = cacheShape.geomType; // 图形类型

                var oldPoints = cacheAttrs.points; // 上一个状态的关键点
                var newPoints = updateShape.attr('points'); // 当前 shape 的关键点

                var oldLength = oldPoints.length;
                var newLength = newPoints.length;
                var deltaLength = geomType === 'area' ? (oldLength - newLength) / 2 : oldLength - newLength;

                if (deltaLength > 0) {
                    var firstPoint = newPoints[0];
                    var lastPoint = newPoints[newPoints.length - 1];

                    for (var i = 0; i < deltaLength; i++) {
                        newPoints.splice(0, 0, firstPoint);
                    }

                    if (geomType === 'area') {
                        for (var j = 0; j < deltaLength; j++) {
                            newPoints.push(lastPoint);
                        }
                    }
                } else {
                    deltaLength = Math.abs(deltaLength);
                    var firstPoint1 = oldPoints[0];
                    var lastPoint1 = oldPoints[oldPoints.length - 1];

                    for (var k = 0; k < deltaLength; k++) {
                        oldPoints.splice(0, 0, firstPoint1);
                    }

                    if (geomType === 'area') {
                        for (var p = 0; p < deltaLength; p++) {
                            oldPoints.push(lastPoint1);
                        }
                    }

                    cacheAttrs.points = oldPoints;
                }
                updateShape.attr(cacheAttrs);
                updateShape.animate().to({
                    attrs: {
                        points: newPoints
                    },
                    duration: 800,
                    easing: animateCfg.easing
                });
            });
        },
        selectChartActive(name) {
            this.chartActive = name
            let temp=null;
            if(this.chartActive=='one'){
                temp = this.lineData.slice(this.oneMonth);
            }
            if(this.chartActive=='three'){
                temp = this.lineData.slice(this.threeMonth);
            }
            if(this.chartActive=='six'){
                temp = this.lineData.slice(this.sixMonth);
            }
            if(this.chartActive=='year'){
                temp = this.lineData.slice(this.oneYear);
            }
            this.chart.changeData(temp)
        },
        selectItem(name) {
            this.selected = name;
            this.isPopupShow = false
        },
        onPopupShow() {
            this.initScrollBlock()
        },
        showPopUp() {
            this.isPopupShow = !this.isPopupShow
        },
        initScrollBlock() {
            const blocks = this.$el.querySelectorAll('.scroll-view-category')
            let offset = 0
            Array.prototype.slice.call(blocks).forEach((block, index) => {
                const innerHeight = block.clientHeight
                this.$set(this.dimensions, index, [offset, offset + innerHeight])
                offset += innerHeight
            })
        },
        onScroll({scrollTop}) {
            this.scrollY = scrollTop
        },
    }
}
</script>
<style scoped lang="less">
    .history .warning {
        margin-top: 1rem;
        background-color: #fff;
        height: 900px;
    }
    .history .chart {
        margin-top: 1rem;
        background-color: #fff;
        height: auto;
    }

    .history .chart .tooltip {
        height: 2rem;
        background-color: #E9F1FF;
        line-height: 2rem;
        width: 100%;
        left: 0
    }

    .history .chart .tooltipName {
        float: left;
        font-size: .7rem;
        color: #2E2E2E;
        margin-left: 1rem
    }

    .history .chart .tooltipValue {
        float: right;
        font-size: .7rem;
        color: #2E2E2E;
        margin-right: 1rem
    }

    .history .chart .tab {
        width: 100%;
        height: 2rem;
    }

    .history .chart .btn {
        float: left;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: none;
        font-size: .8rem;
        width: 25%;
        height: 2rem;
        line-height: 2rem;
        color: #808080;
        background-color: #f9fafb;
        padding: 0;
        margin: 0;
    }

    .history .chart .btn.focus, .history .chart .btn:focus {
        outline: 0;
    }

    .history .chart .btn:focus, .history .chart .btn:hover {
        text-decoration: none;
    }

    .history .chart .btn.active {
        background: #fff;
        color: #2E2E2E;
    }

    canvas {
        display: inherit;
        background: #fff;
        height: 58.67vw;
    }

    .main-value {
        display: -webkit-flex;
        display: flex;
        flex-wrap: nowrap;
        background-color: #fff;
        color: black;
        width: auto;
    }

    .value-item {
        flex-direction: column;
        height: 6rem;
        display: inline-block;
        font-size: 28px;
        font-family: DINAlternate-Bold;
        border-right: .5px solid #efefef;
        position: relative;
        margin: 1rem 0;

    }

    .value-item .value-text {
        position: absolute;
        top: 1.4rem;
        left: 3rem;
        width: 6rem;
        text-align: center;
        color: #8f939f;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
    }

    .value-item .md-amount {
        position: absolute;
        top: 2.8rem;
        left: 3rem;
        color: #666;
        font-size: 74px;
        font-weight: bold;
    }

    .history .content {
        color: white;
        background: #f3f4f5;
    }

    .menu-trigger {
        display: flex;
        position: fixed;
        bottom: 4rem;
        right: 2rem;
        z-index: 999;
        /*display: none;*/
        align-items: center;
        justify-content: center;
        width: 3.6rem;
        height: 3.6rem;
        text-align: center;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 0 10px #f0f0f0;
        border: 1px solid #f0f0f0;
    }

    .menu-trigger .iconfont {
        font-size: 2rem;
        color: #2f86f6;
    }

    .history .popup-left {
        align-items: center;
        background: #fff;
        position: relative;
        height: 100%;

    }

    .scroll-view-striky-title {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }

    .scroll-view-category-title, .scroll-view-striky-title {
        padding: 10px 0;
        text-align: center;
        font-size: .9rem;
        font-family: DINAlternate-Bold;
        background-color: #f0f0f0;
        margin-top: 0;
        margin-bottom: 0;
    }

    .scroll-view-item {
        margin-top: 0;
        margin-bottom: 0;
        padding: 1rem .8rem;
        text-align: center;
        font-size: .8rem;
        border-bottom: .1rem solid #efefef;
    }


</style>
