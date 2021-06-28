<template>
  <view
    class="navigation"
    :style="{ height: style.height + 'px', background: bg, color: fontColor }"
  >
    <view
      class="content"
      :style="{
        top: style.info.top + 'px',
        height: style.info.height + 'px',
        lineHeight: style.info.height + 'px',
      }"
    >
      <view class="bts" :style="{ left: style.info.padding + 'px' }">
        <text
          v-if="canBack"
          @click="$router.back()"
          class="iconfont icon-back"
        ></text>
        <text
          v-if="canGoHome"
          @click="$router.goHome()"
          class="iconfont icon-home"
        ></text>
      </view>
      {{ title }}
    </view>
  </view>
</template>

<script>
import '@/common/ico/navigation/iconfont.css';
export default {
  data() {
    return {
      style: this.$store.getters.style.navigation,
      pageInfo: {},
    };
  },
  name: 'components',
  props: {
    title: {
      // 标题
      type: String,
      default: '',
    },
    bg: {
      // 背景色默认透明
      type: String,
      default: 'var(--navigation-bg)',
    },
    fontColor: {
      // 字体颜色 默认黑色
      type: String,
      default: 'var(--font-color)',
    },
    isBack: {
      // 是否显示返回按钮
      type: [Boolean],
      default: true,
    },
  },
  computed: {
    canBack() {
      const {length} = this.$router.getPageInfo()
      return this.isBack && length > 1 ;
    },
    canGoHome() {
      return !this.$router.getPageInfo().isTabBar;
    },
  },
};
</script>

<style lang="scss">
.navigation {
  box-shadow:0px 2px 4px 0px rgba(0,0,0,0.08);
  width: 100vw;
  .content {
    position: absolute;
    left: 0;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    text-align: center;
    .bts {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
