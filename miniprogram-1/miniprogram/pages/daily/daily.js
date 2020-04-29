// 获取全局应用程序实例对象
var app = getApp();
var dailydate = require('../../components/calendar/calendar.js')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cycleId: 'month',
    type:'1',
    selectdate:''
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e.detail.msg);//控制台打印:"来自component的信息"
    console.log(e.detail.tel);
  },

  subreport:function(e){
    var query = wx.createSelectorQuery();
    query.select('call-staticstics-cycle').boundingClientRect();
    query.exec(function (res) {
      console.log(res);
    })
    // var that = this;
    // wx.getStorage({
    //   key: 'selectdate',
    //   success: function (res) {
    //     that.setData({
    //       selectdate: res.data,
    //     })
    //   },
    // })
    // console.log('selectdate', that.data.selectdate)
  },

  handleReportChange(e) {
    console.log('选择的日报类型为：', e.detail.value)
    this.setData({
      type: e.detail.value,
      cycleId: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(opt) {
  
  },

});