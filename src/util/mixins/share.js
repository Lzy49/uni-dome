import {SHARE as share} from '@/config'
export default {
  data() {
    return {};
  },
  onShareAppMessage(res) {
    if (this.myShareAppMessage) {
      share = { ...share, ...this.myShareAppMessage(res) };
    }
    return share;
  },
  onShareTimeline() {
		return this.$u.mpShare
	}
  
};
