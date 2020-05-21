// pages/mine/myOrder/orderInfor/myService/refund/refund.js
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
    files: [
      {loading: true}, {error: true}
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindToDetail () {
      wx.navigateTo({
        url: './refundDetail/refundDetail'
      })
    }
  }
})
