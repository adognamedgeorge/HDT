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
    logData: [
      {
        name: '中通快递',
        number: '123483487u904',
        img: [
          '../../../../../resources/img/a.png',
          '../../../../../resources/img/a.png',
          '../../../../../resources/img/a.png',
          '../../../../../resources/img/a.png'
        ]
      },
      {
        name: '顺丰快递',
        number: '98903783487u904',
        img: [
          '../../../../../resources/img/a.png',
          '../../../../../resources/img/a.png'
        ]
      }
    ]
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
