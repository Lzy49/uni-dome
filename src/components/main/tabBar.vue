<template>
  <view class="tabBarWrap">
    <view class="tabBar">
      <view
        @click="$router(item.link, null, 'reLaunch')"
        v-for="(item, k) in tabBar"
        :key="k"
      >
        <view
          class="ico-box"
          :class="page == item.link ? item.className_ : item.className"
        ></view>
        <view
          class="text"
          :style="{
            color: page == item.link ? 'var(--color)' : 'var(--light-color)',
          }"
          >{{ item['text'] }}</view
        >
      </view>
    </view>
  </view>
</template>
<script>
import { tabBar } from '@/config';
export default {
  data() {
    return {
      page: {},
      tabBar: [],
    };
  },
  name: 'tabBar',
  created: function() {
    // // 自定义tab
    this.tabBar = tabBar;
    this.page = this.$router.getPageInfo().nowPage;
  },
};
</script>

<style lang="scss">
.tabBarWrap {
  position: relative;
  height: 105rpx;
  width: 100%;
  .tabBar {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 105rpx;
    box-sizing: border-box;
    padding: 13rpx 0;
    background: var(--bg-color);
    box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.08);
    > view {
      flex: 1;
      display: block;
      position: relative;
      text-align: center;
      line-height: 35rpx;
      .ico-box {
        width: 40rpx;
        height: 40rpx;
      }
      .text {
        width: 100%;
        height: 36rpx;
        line-height: 20rpx;
        text-align: center;
        font-size: 18rpx;
      }
    }
  }
}
</style>
