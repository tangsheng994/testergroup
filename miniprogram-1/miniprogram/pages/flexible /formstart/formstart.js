// miniprogram/pages/flexible /formstart/formstart.js
const {
  $Toast
} = require('../../../dist/base/index');
const app = getApp();
var utils = require('../../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:''
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e.detail.value.formname)
    if (!e.detail.value.formname){
      $Toast({
        content: '收集标题不能为空！',
        type: 'error'
      });
    }else{
    var tableheadlist = [];
    if (e.detail.value.de1 != null) {
      tableheadlist.push({
        type: 'input',
        name: e.detail.value.de1,
        value: ''
      })
    }
    if (e.detail.value.de2 != null) {
      tableheadlist.push({
        type: 'input',
        name: e.detail.value.de2,
        value: ''
      })
    }
    if (e.detail.value.de3 != null) {
      tableheadlist.push({
        type: 'input',
        name: e.detail.value.de3,
        value: ''
      })
    }
    if (e.detail.value.de4 != null) {
      tableheadlist.push({
        type: 'input',
        name: e.detail.value.de4,
        value: ''
      })
    }
    if (e.detail.value.de5 != null) {
      tableheadlist.push({
        type: 'input',
        name: e.detail.value.de5,
        value: ''
      })
    }
    for (let i = 0; i < e.detail.value.baseinfo.length; ++i) {
      if (e.detail.value.baseinfo[i] == '性别' || e.detail.value.baseinfo[i] == '正编/外包') {
        tableheadlist.push({
          type: 'rodio',
          name: e.detail.value.baseinfo[i],
          value: ''
        })
      } else {
        tableheadlist.push({
          type: 'input',
          name: e.detail.value.baseinfo[i],
          value: ''
        })
      }
    }
    var that=this;
    console.log(tableheadlist);
    const db = wx.cloud.database({
      env: 'kaka-1-2cxj6'
    })
    db.collection('flexible').add({
      data: {
        "formname": e.detail.value.formname,
        "data": [],
        "tableheadlist":tableheadlist,
        "constructtime":that.data.time,
      },
      success: res => {
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        $Toast({
          content: '新增成功！',
          type: 'success'
        });
        that.setData({
          showModal: false,
          modelStatus: false,
        });
        wx.navigateTo({
          url: '../flexible?formname=' + e.detail.value.formname + '&id=' + res._id,
        })
      },
      fail: err => {
        $Toast({
          content: '新增失败！',
          type: 'error'
        });
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var TIME = utils.formatTime(new Date());
    this.setData({
      time: TIME,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})