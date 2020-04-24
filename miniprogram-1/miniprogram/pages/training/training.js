const {
  $Message
} = require('../../dist/base/index');
const {
  $Toast
} = require('../../dist/base/index');
const app = getApp();
var utils = require('../../utils/utils.js');

Page({
  data: {
    today:'',
    starIndex:0,
    issubassess: false,
    toggle: false,
    modelStatus: false,
    showModal: false,
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    title: '',
    teacher: '',
    date: '',
    list: [],
    id: '',
    name:'',
    descriptions:''
  },

  onShareAppMessage:function(res){
    if(res.from=='button'){
      console.log(res.target.dataset,res)
    }
    return{
      title: res.target.dataset.title + '/' + res.target.dataset.teacher + '/' + res.target.dataset.date,
      path:'pages/training/training',
      imageUrl:'../../images/ddup.jpg'
    }
  },

  onChange(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex': index
    })
  },

  getname: function (e) {
    this.setData({
      name: e.detail.detail.value
    });
  },

  getdescriptions: function (e) {
    this.setData({
      descriptions: e.detail.detail.value
    });
  },

  gettitle: function(e) {
    this.setData({
      title: e.detail.detail.value
    });
  },

  getteacher: function(e) {
    this.setData({
      teacher: e.detail.detail.value
    });
  },

  showDatePicker: function(e) {
    // this.data.datePicker.show(this);
    this.setData({
      datePickerIsShow: true,
    });
  },

  datePickerOnSureClick: function(e) {
    console.log('datePickerOnSureClick');
    console.log(e);
    this.setData({
      date: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
      datePickerValue: e.detail.value,
      datePickerIsShow: false,
    });
  },

  datePickerOnCancelClick: function(event) {
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

  closeButtonGroup() {
    this.setData({
      'position': {
        pageX: 0,
        pageY: 0
      }
    })
  },

  fanhui: function(event) {
    this.setData({
      toggle: this.data.toggle ? false : true
    });
  },

  comments:function(event){
    wx.navigateTo({
      url: '../comments/comments?id='+event.currentTarget.dataset.id,
    })
  },

  //新增培训or评价
  onAddtrainingorpj: function(e) {
    if (e.currentTarget.dataset.id == 0) {
      this.setData({
        issubassess: false
      });
    } else {
      this.setData({
        id: e.currentTarget.dataset.id,
        issubassess: true
      });
    }
    this.openModel();
    this.setData({
      showModal: true
    });
  },

  addtrainingorpj: function(e) {
    var that = this;
    const db = wx.cloud.database({
      env: 'kaka-1-2cxj6'
    })
    if (that.data.issubassess == false) {
      db.collection('training').add({
        data: {
          "title": that.data.title,
          "date": that.data.date,
          "teacher": that.data.teacher
        },
        success: res => {
          var newlist = that.data.list.push({
            "title": that.data.title,
            "date": that.data.date,
            "teacher": that.data.teacher
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
      })
    } else {
      console.log(that.data.name);
      console.log(that.data.id);
      console.log(that.data.starIndex);
      const db = wx.cloud.database({
        env: 'kaka-1-2cxj6'
      })
      db.collection('comments').add({
        data: {
          "id": that.data.id,
          "name":that.data.name,
          "rate": that.data.starIndex,
          "descriptions":that.data.descriptions
        },
        success: res => {
          $Toast({
            content: '添加评价成功！',
            type: 'success'
          });
          that.setData({
            showModal: false,
            modelStatus: false,
            toggle: this.data.toggle ? false : true
          });
          console.log('[数据库] [修改记录] 成功，记录 _id: ', res._id)

        },
        fail: err => {
          $Toast({
            content: '修改失败！',
            type: 'error'
          });
          console.error('[数据库] [修改记录] 失败：', err)
        }
      })
    }
  },

  onLoad: function() {
    var that = this;
    const db = wx.cloud.database({
      env: 'kaka-1-2cxj6'
    })
    // 查询当前用户所有的 counters
    db.collection('training')
      .orderBy('date', 'desc')
      .get({
        success: res => {
          that.setData({
            list: res.data,
            today: utils.formatDate(new Date())
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
  }
});