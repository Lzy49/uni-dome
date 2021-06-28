<script>
import updated from '@/util/function/updated';
export default {
  onLaunch: function() {
    updated();
  },
  onShow: function() {},
  onHide: function() {
    console.log('App Hide');
  },
};
</script>

<style>
/*每个页面公共css */
</style>
