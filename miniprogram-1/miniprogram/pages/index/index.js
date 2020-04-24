const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    queryResult: [],
    programenamelist: [],
    isprogramemoduleshow: false,
    waitshowname: ''
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  
  handleOpen1() {
    this.setData({
      isprogramemoduleshow: true
    });
  },

  handleClose1() {
    this.setData({
      isprogramemoduleshow: false
    });
  },

  getprogramdetail: function (e) {
    var that = this;
    const db = wx.cloud.database({
      env: 'kaka-1-2cxj6'
    })
    // 查询当前用户所有的 counters
    db.collection('programerelations')
      .where({
        name: e.currentTarget.dataset.groupleader
      })
      .get({
        success: res => {
          that.setData({
            waitshowname: e.currentTarget.dataset.groupleader,
            programenamelist: res.data,
            isprogramemoduleshow: true
          });
          console.log('[数据库] [查询记录] 成功: ', that.data.programenamelist)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
    const db = wx.cloud.database({
      env: 'kaka-1-2cxj6'
    })
    wx.cloud.callFunction({
      name: "getorganizationmembers",
      success(res) {
        console.log("云函数[getorganizationmembers]执行成功");
        console.log(res);
        that.setData({
          userInfo: app.globalData.userInfo,
          queryResult: res.result.list
        })
      },
      fail(res) {
        console.log("云函数[getorganizationmembers]执行失败");
      }
    })
  },

  navtomemberlist: function(e) {
    wx.navigateTo({
      url: '/pages/memberlist/memberlist?testgroup=' + e.currentTarget.dataset.testgroup + "&groupleader=" + e.currentTarget.dataset.groupleader,
    })
  }
})