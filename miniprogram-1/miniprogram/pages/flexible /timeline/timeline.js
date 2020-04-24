// miniprogram/pages/flexible /timeline/timeline.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id:'',
    emialaddr:'',
    list:[]
  },

  getemailaddr: function (e) {
    this.setData({
      emialaddr: e.detail.value
    });
  },

  sendmail:function(e){
    console.log(this.data._id)
    this.savaExcel(this.data._id,this.data.formname)
  },

  //把数据保存到excel里，并把excel保存到云存储
  savaExcel(_id,formname) {
    console.log(_id)
    let that = this
    wx.cloud.callFunction({
      name: "consexcel",
      data: {
        _id: _id,
        filename: formname
      },
      success(res) {
        console.log("保存成功", res.result.fileID)
        that.getFileUrl(res.result.fileID)
      },
      fail(res) {
        console.log("保存失败", res)
      }
    })
  },

  //获取云存储文件下载地址，这个地址有效期一天
  getFileUrl(fileID) {
    let that = this;
    wx.cloud.getTempFileURL({
      fileList: [fileID],
      success: res => {
        // get temp file URL
        console.log("文件下载链接", res.fileList[0].tempFileURL);
        that.copyText(res.fileList[0].tempFileURL);
        // console.log(that.data.emialaddr)
        // wx.cloud.callFunction({
        //   name: "sendmail",
        //   data: {
        //     emialaddr:that.data.emialaddr,
        //     formname: that.data.formname,
        //     fileUrl: res.fileList[0].tempFileURL
        //   },
        //   success(res) {
        //     console.log("保存成功", res)
        //     that.getFileUrl(res.result.fileID)
        //   },
        //   fail(res) {
        //     console.log("保存失败", res)
        //   }
        // })
      },
      fail: err => {
        // handle error
      }
    })
  },
  copyText(text) {
    console.log(text)
    wx.setClipboardData({
      data: text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '获取成功'
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.formname+"收集详情"
    });
    var that = this;
    const db = wx.cloud.database({
      env: 'kaka-1-2cxj6'
    })
    // 查询当前用户所有的 counters
    db.collection('flexible')
      .where({
        _id: options.id
      })
      .get({
        success: res => {
          console.log(res.data);
          that.setData({
            list: res.data[0].data,
            _id:options.id,
            formname:options.formname
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
  onShareAppMessage: function () {

  }
})