var util = require('../../utils/utils.js');
const app = getApp()

Page({


  /**
   * 页面的初始数据
   */

  data: {

    //用户个人信息

    userInfo: {
    },
    queryResult: []
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  sendmsg: function() {
    wx.cloud.callFunction({
      name: "getopenid",
      success(res) {
        console.log("云函数[getopenid]执行成功" + res.result.openid);
        var time = util.formatTime(new Date());
        console.log(time);
        wx.cloud.callFunction({
          name: "sendMsg",
          data: {
            templateId: "x37IB-7EK7u604XkptZWfUUb-d4bBcwW3gmUEZH14wc",
            openId: res.result.openid,
            nowtime: time
          },
          success(res) {
            console.log("云函数[sendMsg]执行成功" + res.result);
          },
          fail(res) {
            console.log("云函数[sendMsg]执行失败" + res);
          }
        })
      },
      fail(res) {
        console.log("云函数[getopenid]执行失败" + res);
      }
    })
  },
})