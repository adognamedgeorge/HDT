// pages/mine/myService/myService.js
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
    // 退款页
    bindtoRefund () {
      wx.navigateTo({
        url: './refund/refund'
      })
    },
    // 退款退货
    bindtoRegoods () {
      wx.navigateTo({
        url: './regoods/regoods'
      })
    }
  }
})
