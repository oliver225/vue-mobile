<template>
    <div class="dashboard">

        <div class="md-example-child md-example-child-tabs md-example-child-tabs-0">
            <md-tabs>
                <md-tab-pane class="content" name="dashboard" :label="lable">
                    dashboard Vue
                </md-tab-pane>
            </md-tabs>
        </div>
    </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
        lable:'效率:98%'
    }
  }
}
</script>
<style scoped lang="less">
    .md-tab-bar-item.is-active{
        color: red;
    }
    .md-example-child-tabs .content {
        padding: 12px 0;
        font-size: 28px;
        background: #fff;
        padding: 20px;
        line-height: 1.5;
        box-sizing: border-box;
    }

    .md-example-child-tabs .md-tabs-content {
        min-height: 200px;
        background: #fff;
    }
</style>
