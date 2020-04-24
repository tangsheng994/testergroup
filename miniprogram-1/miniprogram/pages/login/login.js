//const common = require('../../utils/common');
//const api = require('../../utils/api');
const app = getApp();

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
  },

  onLoad: function() {
    // let self = this;
    // this.setData({
    //   userID: app.globalData.userID
    // });
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              var app = getApp();
              console.log(res.userInfo);
              app.globalData.userInfo = res.userInfo;
              wx.switchTab({
                url: '/pages/index/index'
              })
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  console.log("用户的code:" + res.code);
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      var app = getApp();
      app.globalData.userInfo = e.detail.userInfo,
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  shouquantongzhi: function (e) {
    wx.requestSubscribeMessage({
      tmplIds: ['x37IB-7EK7u604XkptZWfUUb-d4bBcwW3gmUEZH14wc'],
      success(res) {
        console.log("授权成功！", res)
      },
      fail(res) {
        console.log("授权失败！", res)
      }
    });
  }
});