const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    alltesters:'',
    queryResult: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
    const db = wx.cloud.database({
      env: 'kaka-1-2cxj6'
    })
    db.collection('testers').count({
      success: res => {
        that.setData({
          alltesters: res.total
        })
        console.log('[数据库] [查询testers个数] 成功: ',res.total)
        wx.cloud.callFunction({
          name: "getprogramemembers",
          success(res) {
            console.log("云函数[getprogramemembers]执行成功");
            console.log(res.result);
            that.setData({
              userInfo: app.globalData.userInfo,
              queryResult: res.result.list
            })
          },
          fail(res) {
            console.log("云函数[getprogramemembers]执行失败");
          }
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询testers个数] 失败：', err)
      }
    })
  },

  navtoprogramememberlist: function(e) {
    console.log(e.currentTarget.dataset.programename);
    wx.navigateTo({
      url: '/pages/programememberlist/programememberlist?programename=' + e.currentTarget.dataset.programename,
    })
  }
})