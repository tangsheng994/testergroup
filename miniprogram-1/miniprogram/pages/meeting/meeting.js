// pages/touch/touch.js
const {
  $Toast
} = require('../../dist/base/index');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isadditem:true,
    index:'',
    deadline: '',
    title:'',
    descriptions:'',
    charge:'',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    isDisabled: true,
    list: [],
    status: 0,
    modelStatus: false
  },

  getdeadline: function (e) {
    this.setData({
      deadline: e.detail.detail.value
    });
  },

  gettitle: function (e) {
    this.setData({
      title: e.detail.detail.value
    });
  },

  getdescriptions: function (e) {
    console.log(e.detail.detail.value);
    this.setData({
      descriptions: e.detail.detail.value
    });
  },

  getcharge: function (e) {
    this.setData({
      charge: e.detail.detail.value
    });
  },

  handlestatusChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      status: e.detail.value
    });
  },

  showDatePicker: function (e) {
    // this.data.datePicker.show(this);
    this.setData({
      datePickerIsShow: true,
    });
  },

  datePickerOnSureClick: function (e) {
    console.log(`${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`);
    console.log(e);
    this.setData({
      deadline: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
      datePickerValue: e.detail.value,
      datePickerIsShow: false,
    });
  },

  datePickerOnCancelClick: function (event) {
    console.log('datePickerOnCancelClick');
    console.log(event);
    this.setData({
      datePickerIsShow: false,
    });
  },
  
  openModel() {
    const modelStatus = !this.modelStatus
    this.setData({
      modelStatus
    })
  },
  /**
   * 子组件触发的事件
   */
  closeModel(event) {
    console.log(event.detail.value)
    this.setData({
      modelStatus: event.detail.value
    })
  },

  //新增or修改事项
  onAddorupdateitem: function (e) {
    console.log('idnull?');
    console.log(e.currentTarget.dataset.id == "null");
    if (e.currentTarget.dataset.id == "null") {
      this.setData({
        isadditem: true
      });
    } else {
      this.setData({
        isadditem: false,
        id: e.currentTarget.dataset.id,
        title: e.currentTarget.dataset.title,
        descriptions: e.currentTarget.dataset.descriptions,
        deadline: e.currentTarget.dataset.deadline,
        charge: e.currentTarget.dataset.charge,
        index: e.currentTarget.dataset.index
      });
    }
    this.openModel();
    this.setData({
      showModal: true
    });
  },

  additem: function (e) {
    var that = this;
    const db = wx.cloud.database({
      env: 'kaka-1-2cxj6'
    })
    if (this.data.isadditem == true){
      db.collection('meeting').add({
        data: {
          "title": that.data.title,
          "deadline": that.data.deadline,
          "descriptions": that.data.descriptions,
          "charge": that.data.charge,
          "status":that.data.status
        },
        success: res => {
          var newlist = that.data.list.push({
            "title": that.data.title,
            "deadline": that.data.deadline,
            "descriptions": that.data.descriptions,
            "charge": that.data.charge,
            "status": that.data.status
          });
          //更新数据
          that.setData({
            list: that.data.list
          })
          $Toast({
            content: '新增成功！',
            type: 'success'
          });
          that.setData({
            showModal: false,
            modelStatus: false
          });
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)

        },
        fail: err => {
          $Toast({
            content: '新增失败！',
            type: 'error'
          });
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })}else{
      const db = wx.cloud.database({
        env: 'kaka-1-2cxj6'
      })
      wx.cloud.callFunction({
        name: 'updatedb',
        data: {
          table: 'meeting',
          docid: that.data.id,
          data: {
            "deadline": that.data.deadline,
            "descriptions": that.data.descriptions,
            "charge": that.data.charge,
            "status": that.data.status
          }
        },
        success: function (res) {
          var newlist = that.data.list.splice(that.data.index,1,{
            "_id": that.data.id,
            "title": that.data.title,
            "deadline": that.data.deadline,
            "descriptions": that.data.descriptions,
            "charge": that.data.charge,
            "status": that.data.status
          });
          //更新数据
          that.setData({
            list: that.data.list
          })
          $Toast({
            content: '修改成功！',
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

  getName: function (e) {
    this.setData({
      name: e.detail.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    const db = wx.cloud.database({
      env: 'kaka-1-2cxj6'
    })
    // 查询当前用户所有的 counters
    db.collection('meeting')
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