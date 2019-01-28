<template>
    <div class="online2">
        <img class="top-img" :src="url"/>
        <div class="scroll" :style="{height:scrollHeight+'px'}">
            <md-scroll-view ref="scrollView2" @scroll="onScroll2" :scrolling-x="false" >
              <div class="field">
                    <item v-for="(item,index) in list" :key="index" v-bind="item"></item>

              </div>
            </md-scroll-view>
        </div>
    </div>
</template>

<script>
import item from '@/components/item'
import { mapGetters } from 'vuex'
export default {
  components: {item},
  data () {
    return {
      url: 'http://fuss10.elemecdn.com/7/85/e478e4b26af74f4539c79f31fde80jpeg.jpeg',
      list: [
        {name: 'CO2p', label:'CO2p', value: 78, type:'line', data:[
            {date: "2017-06-05", value: 116},
            {date: "2017-06-06", value: 199},
            {date: "2017-06-07", value: 135},
            {date: "2017-06-08", value: 86},
            {date: "2017-06-09", value: 73},
            {date: "2017-06-10", value: 652},
            {date: "2017-06-11", value: 73},
            {date: "2017-06-12", value: 68},
            {date: "2017-06-13", value: 92},
            {date: "2017-06-14", value: 130},
            {date: "2017-06-15", value: 245},
            {date: "2017-06-16", value: 169},
            {date: "2017-06-17", value: 115},
            {date: "2017-06-18", value: 111},
            {date: "2017-06-19", value: 409},
            {date: "2017-06-20", value: 206},
            {date: "2017-06-21", value: 737},
            {date: "2017-06-22", value: 128}]},
        {name: 'S2Hx', label:'S2Hx', value: 90, type:'line', data:[
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
        {name: 'CO24', label:'CO24', value: 56, type:'line', data:[
            {date: "2017-06-05", value: 116},
            {date: "2017-06-06", value: 129},
            {date: "2017-06-07", value: 135},
            {date: "2017-06-08", value: 86},
            {date: "2017-06-09", value: 776},
            {date: "2017-06-10", value: 85},
            {date: "2017-06-11", value: 73},
            {date: "2017-06-12", value: 68},
            {date: "2017-06-13", value: 912},
            {date: "2017-06-14", value: 130},
            {date: "2017-06-15", value: 245},
            {date: "2017-06-16", value: 159},
            {date: "2017-06-17", value: 115},
            {date: "2017-06-18", value: 121},
            {date: "2017-06-19", value: 389},
            {date: "2017-06-20", value: 206},
            {date: "2017-06-21", value: 127},
            {date: "2017-06-22", value: 128}]},
        {name: 'S22H', label:'S22H', value: 34, type:'line', data:[
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
        {name: 'CO26', label:'CO26', value: 56, type:'bar', data:[
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
        {name: 'S32H', label:'S32H', value: 35, type:'line', data:[
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
        {name: 'CyO2', label:'CyO2', value: 56, type:'line', data:[
            {date: "2017-06-05", value: 116},
            {date: "2017-06-06", value: 129},
            {date: "2017-06-07", value: 125},
            {date: "2017-06-08", value: 86},
            {date: "2017-06-09", value: 75},
            {date: "2017-06-10", value: 856},
            {date: "2017-06-11", value: 73},
            {date: "2017-06-12", value: 68},
            {date: "2017-06-13", value: 912},
            {date: "2017-06-14", value: 130},
            {date: "2017-06-15", value: 245},
            {date: "2017-06-16", value: 139},
            {date: "2017-06-17", value: 145},
            {date: "2017-06-18", value: 111},
            {date: "2017-06-19", value: 309},
            {date: "2017-06-20", value: 286},
            {date: "2017-06-21", value: 137},
            {date: "2017-06-22", value: 128}]},
        {name: 'S27H', label:'S27H', value: 34, type:'line', data:[
            {date: "2017-06-05", value: 116},
            {date: "2017-06-06", value: 129},
            {date: "2017-06-07", value: 235},
            {date: "2017-06-08", value: 186},
            {date: "2017-06-09", value: 73},
            {date: "2017-06-10", value: 85},
            {date: "2017-06-11", value: 73},
            {date: "2017-06-12", value: 68},
            {date: "2017-06-13", value: 192},
            {date: "2017-06-14", value: 30},
            {date: "2017-06-15", value: 245},
            {date: "2017-06-16", value: 139},
            {date: "2017-06-17", value: 115},
            {date: "2017-06-18", value: 111},
            {date: "2017-06-19", value: 9},
            {date: "2017-06-20", value: 206},
            {date: "2017-06-21", value: 137},
            {date: "2017-06-22", value: 128}]},
        {name: 'CO27', label:'CO27', value: 67, type:'bar', data:[
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
            {date: "2017-06-18", value: 911},
            {date: "2017-06-19", value: 409},
            {date: "2017-06-20", value: 206},
            {date: "2017-06-21", value: 137},
            {date: "2017-06-22", value: 128}]},
        {name: 'S2Hi', label:'S2Hi', value: 34, type:'line', data:[
            {date: "2017-06-05", value: 116},
            {date: "2017-06-06", value: 129},
            {date: "2017-06-07", value: 155},
            {date: "2017-06-08", value: 86},
            {date: "2017-06-09", value: 73},
            {date: "2017-06-10", value: 85},
            {date: "2017-06-11", value: 723},
            {date: "2017-06-12", value: 68},
            {date: "2017-06-13", value: 92},
            {date: "2017-06-14", value: 150},
            {date: "2017-06-15", value: 245},
            {date: "2017-06-16", value: 139},
            {date: "2017-06-17", value: 175},
            {date: "2017-06-18", value: 111},
            {date: "2017-06-19", value: 3079},
            {date: "2017-06-20", value: 206},
            {date: "2017-06-21", value: 137},
            {date: "2017-06-22", value: 128}]},
        {name: 'CvO2', label:'CvO2', value: 126, type:'line',  data:[
            {date: "2017-06-05", value: 116},
            {date: "2017-06-06", value: 129},
            {date: "2017-06-07", value: 135},
            {date: "2017-06-08", value: 816},
            {date: "2017-06-09", value: 73},
            {date: "2017-06-10", value: 85},
            {date: "2017-06-11", value: 73},
            {date: "2017-06-12", value: 686},
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
      ]
    }
  },
    method: {
        onScroll2({scrollLeft, scrollTop}) {
            console.log(`[Mand Mobile ScrollView - demo0 - onScroll] scrollLeft: ${scrollLeft}, scrollTop: ${scrollTop}`)
        }
    },
    computed: {
        ...mapGetters(['screenHeight']),
        scrollHeight(){
           return 340
        }
    },
}
</script>
<style scoped lang="less">
    .top-img{
        width: 100%;
        height: 14rem;
    }
    .field {
        display: -webkit-flex;
        display: flex;
        flex-wrap: wrap;
        padding: .5rem;
        justify-content:space-between;

    }
</style>
