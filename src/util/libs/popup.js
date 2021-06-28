// 对 uni 弹出层的一些封装与加强
let loads = 0;
/**
 * @description: 显示loading
 * @param title {String} loading 显示文字
 */
export const $showLoading = (title = '加载中', time, config) => {
  loads++;
  loads === 1 && uni.showLoading({ title, ...config });
  typeof time === 'number' &&
    setTimeout(() => {
      $hideLoading();
    }, time);
};

/**
 * @description: 隐藏loading
 * @param enforce {Boolean} 是否强制关闭loading
 */
export const $hideLoading = (enforce = false) => {
  loads = enforce ? 0 : loads - 1;
  loads === 0 && uni.hideLoading();
};

const icons = ['success', 'loading', 'none'];
let toastTimeout = undefined;
let toastCloseFun = undefined;
/**
 * @description: 提示框
 * @param title {String} 提示内容
 * @param duration {String} 展示时间
 * @param icon {String} 展示图标或图片
 * @param config {Object} 其他配置 所有配置 https://uniapp.dcloud.io/api/ui/prompt?id=showToast
 * @return result {Promise} resolve 展示成功，并关闭。reject 表示失败
 */
export const $showToast = (title, duration = 1000, icon = 'none', config) => {
  let image = undefined;
  if (!icons.includes(icon)) {
    image = icons;
    icons = undefined;
  }
  return new Promise((resolve, reject) => {
    uni.showToast({
      title,
      icon,
      image,
      duration,
      ...config,
      success: () => {
        toastCloseFun = () => {
          resolve(true);
        };
        toastTimeout = setTimeout(toastCloseFun, duration);
      },
      fail: () => {
        reject(false);
      },
    });
  });
};
/**
 * @description: 隐藏提示框
 * @param can {Boolean} 是否执行弹窗后续操作
 */
export const $hideToast = (can = true) => {
  uni.hideToast();
  clearTimeout(toastTimeout);
  can && toastCloseFun();
};

/**
 * @description: 对话框
 * @param config {Object} 所有配置 https://uniapp.dcloud.io/api/ui/prompt?id=showmodal
 * @return result {Promise} resolve 表示确定，reject 表示失败
 */
export const $showModal = (config) => {
  return new Promise((resolve, reject) => {
    uni.showModal({
      ...config,
      success: function(res) {
        if (res.confirm) {
          resolve('true');
        } else if (res.cancel) {
          reject('false');
        }
      },
    });
  });
};
/**
 * @description: alert对话框
 * @param title {String} 提示标题
 * @param content {String} 提示内容
 * @param config {Object} 所有配置 https://uniapp.dcloud.io/api/ui/prompt?id=showmodal
 * @return result {Promise} resolve 表示确定，reject 表示失败
 */
export const $alert = (title, content = '', config) =>
  $showModal({ title, content, showCancel: false, ...config });
/**
 * @description: confirm 对话框
 * @param title {String} 提示标题
 * @param content {String} 提示内容
 * @param config {Object} 所有配置 https://uniapp.dcloud.io/api/ui/prompt?id=showmodal
 * @return result {Promise} resolve 表示确定，reject 表示失败
 */
export const $confirm = (title, content = '', config) =>
  $showModal({ title, content, ...config });

/**
 * @description: 从底部向上弹出操作菜单
 * @param itemList	{Array} 按钮的文字数组
 * @param itemColor	{String} 按钮的文字颜色，默认为"#000000"
 * @return result {Promise} resolve 表示调用成功 返回 tapIndex 表示选择的数组index，reject 表示失败
 */
export const $showActionSheet = (itemList, itemColor) => {
  return new Promise((resolve, reject) => {
    uni.showActionSheet({
      itemList,
      itemColor,
      success: resolve,
      fail: reject,
    });
  });
};

export default {
  showLoading: $showLoading,
  hideLoading: $hideLoading,
  showToast: $showToast,
  hideToast: $hideToast,
  showModal: $showModal,
  alert: $alert,
  confirm: $confirm,
  showActionSheet:$showActionSheet
};
