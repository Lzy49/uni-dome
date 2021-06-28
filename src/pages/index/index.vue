<template>
  <view class="uni-warp">
    <navigation title="标题"></navigation>
    function test
    <button @click="copyText">copy</button>
    <tabBar></tabBar>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  onLoad() {},
  onShow() {
    console.log('传入参数', this.$router.getOption());
  },
  methods: {
    copyText() {
     // 普通设置
    this.$Storage.set('name','123').then(res=>{
      console.log(res)
    })

    this.$Storage.setSync('Jon',{age:10,name:'乔恩'})
    // 设置数据并设置过期时间

    this.$Storage.set('name','123',(new Date().getTime())).then(res=>{
      console.log(res)
    })

    this.$Storage.setSync('Jon',{age:10,name:'乔恩'},(new Date().getTime()))
    },
  },
};
</script>

<style lang="scss" scoped></style>
