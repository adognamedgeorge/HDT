// pages/mine/myOrder/orderInfor/orderInfor.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toMyService () {
      wx.navigateTo({
        url: './myService/myService'
      })
    },
    bindToLogistics () {
      wx.navigateTo({
        url: './logistics/logistics'
      })
    }
  }
})
