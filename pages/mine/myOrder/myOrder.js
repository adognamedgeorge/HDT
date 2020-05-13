// pages/mine/myOrder/myOrder.js
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
    tabData: ['全部', '待付款', '待发货', '待收款', '待评价'],
    navActive: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindBar (e) {
      this.setData({
        navActive: e.currentTarget.dataset.idx
      })
    },
    toOrderInfor () {
      wx.navigateTo({
        url: './orderInfor/orderInfor'
      })
    }
  }
})
