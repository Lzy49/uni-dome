<template>
  <view class="uni-warp">
    <navigation title="标题"></navigation>
    <button @click=" $router.goHome({name:10}) ">啊来吧来吧来吧</button>
    <button @click=" f ">啊来吧来吧来吧</button>
    <tabBar></tabBar>
  </view>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  onLoad() {
    console.log(this.$router.getPageInfo())
  },
  onShow() {
		
  },
  methods: {
    f(){
      console.log(this.$router.getPageInfo())
    }
	},
}
</script>

<style lang="scss" scoped>

</style>
