// pages/guide/guide.js
const app = getApp();

Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
  },

  onLoad() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../guide/chooseLib/chooseLib',
      });
      return;
    }

    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (userInfoRes) => {
              this.setData({
                avatarUrl: userInfoRes.userInfo.avatarUrl,
                userInfo: userInfoRes.userInfo,
              });
            },
          });
        }
      },
    });
  },

  onGetUserInfo(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
      });
    }
  },

  onGetOpenid() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: (res) => {
        console.log('[云函数] [login] user openid: ', res.result.openid);
        app.globalData.openid = res.result.openid;
        wx.navigateTo({
          url: '../guide/userConsole/userConsole',
        });
      },
      fail: (err) => {
        console.error('[云函数] [login] 调用失败', err);
        wx.navigateTo({
          url: '../guide/deployFunctions/deployFunctions',
        });
      },
    });
  },

  // 上传图片
  doUpload() {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showLoading({
          title: '上传中',
        });

        const filePath = res.tempFilePaths[0];

        // 上传图片
        const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`;
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: (fileRes) => {
            console.log('[上传文件] 成功：', fileRes);

            app.globalData.fileID = fileRes.fileID;
            app.globalData.cloudPath = cloudPath;
            app.globalData.imagePath = filePath;

            wx.navigateTo({
              url: '../guide/storageConsole/storageConsole',
            });
          },
          fail: (e) => {
            console.error('[上传文件] 失败：', e);
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            });
          },
          complete: () => {
            wx.hideLoading();
          },
        });
      },
      fail: (e) => {
        console.error(e);
      },
    });
  },

});
