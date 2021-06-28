export default {
  state: () => ({
    style: {},
  }),
  mutations: {
    initSystemInfo(state) {
      let style = {};
      const { statusBarHeight, screenWidth } = uni.getSystemInfoSync();
      const {
        height,// 高
        top,   // 上坐标
        right, // 右坐标
      } = uni.getMenuButtonBoundingClientRect(); // 根据胶囊按钮定位内容位置
      const padding = screenWidth - right ;
      style.ruler = screenWidth / 750; // 比例尺
      style.navigation = {
        height: height + top * 2 - statusBarHeight + 5, // 导航高度
        statusBarHeight, // 状态栏高度
        info: {
          height, // 信息高度
          top, // 信息距顶部高度
          padding, // 左右 内边距
        },
      };
      state.style = style;
    },
  },
  actions: {},
  getters: {
    style: (state) => state.style,
  },
};
