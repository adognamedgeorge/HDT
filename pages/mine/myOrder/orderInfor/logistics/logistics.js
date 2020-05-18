// pages/mine/myOrder/orderInfor/logistics/logistics.js
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
    toLogisticsDetail () {
      wx.navigateTo({
        url: './logisticsDetail/logisticsDetail'
      })
    }
  }
})
