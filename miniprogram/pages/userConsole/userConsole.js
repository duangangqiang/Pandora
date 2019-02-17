// pages/userConsole/userConsole.js
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
