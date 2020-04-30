const {
  $Toast
} = require('../../../dist/base/index');
var utils = require('../../../utils/utils.js')
const app = getApp();
const GetPeriod = require("../../../utils/getperiod.js");
Page({
  data: {
    dateType: 0,
    dateTypeR: "now",
    groups: [],
    groupindex: 0
  },

  GroupChange(e) {
    console.log(e);
    this.setData({
      groupindex: e.detail.value
    })
  },

  formSubmit(e) {
    console.log(this.data.dateTypeR, this.data.date);
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var isnull = false;
    for (var key in e.detail.value) {
      if (e.detail.value[key] == '') {
        isnull = true
      }
    }
    if (isnull) {
      $Toast({
        content: '有必填项为空！',
        type: 'error'
      });
    } else {
      var that = this;
      var dailyData = e.detail.value;
      dailyData.dailytype = that.data.dateTypeR;
      dailyData.dailydate = that.data.date;
      dailyData.subtime = utils.formatTime(new Date());
      console.log('dailyData', dailyData);
      console.log('id', that.data.id)
      const db = wx.cloud.database({
        env: 'kaka-1-2cxj6'
      })
      wx.cloud.callFunction({
        name: 'updatedb',
        data: {
          table: 'organization',
          _id: that.data.id,
          data: dailyData
        },
        success: function (res) {
          $Toast({
            content: '提交成功！',
            type: 'success'
          });
          that.setData({
            showModal: false,
            modelStatus: false
          });
          console.log('[organization] [修改记录] 成功，记录 _id: ', res._id)

        },
        fail: function (err) {
          $Toast({
            content: '修改失败！',
            type: 'error'
          });
          console.error('[organization] [修改记录] 失败：', err)
        }
      })
    }
  },

  onLoad(options) {
    wx.setNavigationBarTitle({
      title: decodeURIComponent(options.testgroup)+'工作报告'
    });
    this.time = new GetPeriod();
    this.setData({
      id:options.id,
      dateType: 0,
      startDate: this.time.getNowDate(),
      endDate: this.time.getNowDate(),
      date: this.time.getPeriod()
    });
  },
  // 获取时段字段
  getDateTypeR(e) {
    let dateType = e.currentTarget.dataset.datetype;
    this.setData({
      dateTypeR: dateType,
      date: this.time.getPeriod({
        periodType: dateType
      })
    })
  },
  // 获取当前时间段
  getDateType(e) {
    let dateType = e.currentTarget.dataset.datetype;
    let startDate = '',
      endDate = '';

    if (dateType == 0) { //今天
      startDate = this.time.getNowDate();
      endDate = this.time.getNowDate();
    } else if (dateType == 1) { //本周
      startDate = this.time.getWeekStartDate();
      endDate = this.time.getWeekEndDate();
    } else if (dateType == 2) { //本月
      startDate = this.time.getMonthStartDate();
      endDate = this.time.getMonthEndDate();
    } else if (dateType == 3) { //本年
      startDate = this.time.getYearStartDate();
      endDate = this.time.getYearEndDate();
    } else if (dateType == 4) { //选择时段初始化为当天时间段
      startDate = this.time.getNowDate();
      endDate = this.time.getNowDate();
    } else if (dateType == 5) { //本季度
      startDate = this.time.getQuarterStartDate();
      endDate = this.time.getQuarterEndDate();
    }
    this.setData({
      dateType: dateType,
      startDate: startDate,
      endDate: endDate
    });
  },
  bindDateChange(e) {
    if (e.currentTarget.id == 'start') {
      this.setData({
        startDate: e.detail.value
      })
    } else if (e.currentTarget.id == 'end') {
      this.setData({
        endDate: e.detail.value
      })
    } else {
      return;
    }
  }
})