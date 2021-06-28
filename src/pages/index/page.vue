<template>
  <view class="uni-warp">
    <components></components>
    <view @click="$router('pages/index/page')">去page</view>
  </view>
</template>
<script>
export default {
  components: {},
  data() {
    return {
    }
  },
  onLoad() {
		// console.log(this.$router.back())
  },
  onShow() {
		
  },
  methods: {

	},
}
</script>

<style lang="scss" scoped>

</style>
