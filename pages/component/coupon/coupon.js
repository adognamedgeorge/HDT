// pages/component/coupon/coupon.js
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
    couponData: [
      {
        price: 20,
        full: 199,
        title: '夏日优惠券通用',
        txt: '全场通用',
        time: '2019.09.20-2020.03.25',
        type: 0
      },
      {
        price: 50,
        full: 399,
        title: '冬日日优惠券通用',
        txt: '限时使用',
        time: '2019.09.20-2020.04.25',
        type: 1
      },
      {
        price: 10,
        full: 99,
        title: '春日优惠券通用',
        txt: '全场不通用',
        time: '2020.02.20-2020.03.25',
        type: 2
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
