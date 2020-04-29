// miniprogram/pages/flexible /formlist/formlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toggle: false,
    list:[]
  },

  timeline:function(e){
    wx.navigateTo({
      url: '../timeline/timeline?id='+e.currentTarget.dataset.id+"&formname="+e.currentTarget.dataset.formname,
    })
    this.fanhui();
  },

  checkform:function(e){
    wx.navigateTo({
      url: '../flexible?formname=' + e.currentTarget.dataset.formname + '&id=' + e.currentTarget.dataset.id,
    })
    this.fanhui();
  },

  fanhui: function (event) {
    this.setData({
      toggle: this.data.toggle ? false : true
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    const db = wx.cloud.database({
      env: 'kaka-1-2cxj6'
    })
    // 查询当前用户所有的 counters
    db.collection('flexible')
      .orderBy('status', 'asc')
      .get({
        success: res => {
          console.log(res.data);
          that.setData({
            list: res.data,
          });
          console.log('[数据库] [查询记录] 成功: ', that.data.list)
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

  onAddform:function(e){
    wx.navigateTo({
      url: '../formstart/formstart',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    this.fanhui();
    if (res.from == 'button') {
      console.log(res.target.dataset, res)
    }
    return {
      title: res.target.dataset.formname,
      path: 'pages/flexible /flexible?id=' + res.target.dataset.id + '&formname=' + res.target.dataset.formname,
      imageUrl: '../../../images/form.jpg'
    }
  }
})