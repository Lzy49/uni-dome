// 放置到 App onLoad
export default () => {
  const updateManager = uni.getUpdateManager();
  updateManager.onCheckForUpdate(function(res) {
    // 请求完新版本信息的回调
    if (res.hasUpdate) {
      updateManager.onUpdateReady(function() {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              updateManager.applyUpdate();
            }
          },
        });
      });
    }
  });
};
