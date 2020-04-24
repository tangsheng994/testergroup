// components/popups/popups.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    ifOpen: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 父子组件通信
   * 组件的方法列表
   */
  methods: {
    popupsClose() {
      console.log('关闭弹出层' + this.properties.ifOpen)
      this.triggerEvent('ifClose', { value: !this.properties.ifOpen })
    }
  }
})
