<template>
  <view class="uni-warp">
    <navigation title="标题"></navigation>
    <image :src="imgUrl"></image>{{ this.imgUrl }}
    <button @click="copyText">copy</button>
    <tabBar></tabBar>
  </view>
</template>
<script>
import { saveImage } from '@/util/function/wx/file/index.js';
export default {
  data() {
    return {
      imgUrl: '',
    };
  },
  onLoad() {},
  onShow() {
    // this.$http('todayTask').then((res) => {
    //   this.imgUrl = res[0];
    // });
    // this.$http('upload').then(res=>{
    //   console.log(res)
    // })
  },
  methods: {
    copyText() {
      // wx.openSetting({}).then(res=>{
      //   console.log('1')
      // })
      saveImage('/static/static')
    },
  },
};
</script>

<style lang="scss" scoped></style>
