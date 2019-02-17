Page({

  data: {
    openid: '',
  },

  onLoad() {
    this.setData({
      openid: getApp().globalData.openid,
    });
  },
});
