<template>
    <div class="online3">
        <img class="top-img" :src="url"/>
        <md-field>
            <md-detail-item title="承保公司" content="众安" bold />
            <md-detail-item title="投保人" content="张三" />
            <md-detail-item title="被保人" content="李四" />
            <md-detail-item title="保险费用" content="0.1元/日" />
            <md-detail-item title="保障日期" content="2018/08/08 ~ 2019/08/08" />
            <md-detail-item title="保单号" content="123456789" />
            <md-detail-item title="保单协议">
                <a href="#" style="color:#5878B4;text-decoration:none;">查看</a>
            </md-detail-item>
        </md-field>
    </div>
</template>

<script>
export default {
  data () {
    return {
      url: 'http://fuss10.elemecdn.com/7/a5/596ab03934612236f807b92906fd8jpeg.jpeg',
      data: [
        {name: 'CO2', value: 56},
        {name: 'S2H', value: 34},
        {name: 'CO2', value: 56},
        {name: 'S2H', value: 34},
        {name: 'CO2', value: 56},
        {name: 'S2H', value: 34},
        {name: 'CO2', value: 56},
        {name: 'S2H', value: 34},
        {name: 'CO2', value: 56},
        {name: 'S2H', value: 34},
        {name: 'CO2', value: 56},
        {name: 'S2H', value: 34}
      ]

    }
  }
}
</script>
<style scoped lang="less">
    .top-img{
        width: 100%;
        height: 14rem;
    }
</style>
