// miniprogram/pages/flexible /flexible.js
const {
  $Toast
} = require('../../dist/base/index');
var utils = require('../../utils/utils.js')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    formname: '',
    id: '',
    tableheadlist: [],
    datePickerValue: ['', '', ''],
    datePickerIsShow: false
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var isnull=false;
    for (var key in e.detail.value) {
      if(e.detail.value[key]==''){
        isnull=true
      }
    }
    if(isnull){
      $Toast({
        content: '有必填项为空！',
        type: 'error'
      });
    }else{
      var that = this;
      var vData = e.detail.value;
      vData.subtime = utils.formatTime(new Date());
      console.log('formdata', vData);
      console.log('id', that.data.id)
      const db = wx.cloud.database({
        env: 'kaka-1-2cxj6'
      })
      wx.cloud.callFunction({
        name: 'updatedb',
        data: {
          table: 'flexible',
          _id: that.data.id,
          data: vData
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
          console.log('[数据库] [修改记录] 成功，记录 _id: ', res._id)

        },
        fail: function (err) {
          $Toast({
            content: '修改失败！',
            type: 'error'
          });
          console.error('[数据库] [修改记录] 失败：', err)
        }
      })
    }
  },

  showDatePicker: function(e) {
    // this.data.datePicker.show(this);
    this.setData({
      datePickerIsShow: true,
      whichd: e.currentTarget.dataset.dd
    });
  },

  datePickerOnSureClick: function(e) {
    console.log(`${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`);
    console.log(e);
    if (this.data.whichd == "1") {
      this.setData({
        date1: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
        datePickerValue: e.detail.value,
        datePickerIsShow: false,
      });
    } else {
      this.setData({
        date2: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
        datePickerValue: e.detail.value,
        datePickerIsShow: false,
      });
    }
  },

  datePickerOnCancelClick: function(event) {
    console.log('datePickerOnCancelClick');
    console.log(event);
    this.setData({
      datePickerIsShow: false,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('nick', app.globalData.userInfo);
    wx.setNavigationBarTitle({
      title: decodeURIComponent(options.formname)
    });
    const db = wx.cloud.database({
      env: 'kaka-1-2cxj6'
    })
    console.log('share4', options.id)
    // 查询当前用户所有的 counters
    db.collection('flexible')
      .where({
        _id: options.id
      })
      .get({
        success: res => {
          console.log('dbreturn',res.data);
          this.setData({
            tableheadlist: res.data[0].tableheadlist,
            id: options.id
          });
          console.log('[数据库] [查询flexible记录] 成功: ', this.data.tableheadlist)
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

  }
})