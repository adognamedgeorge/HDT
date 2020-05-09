// pages/mine/myCoupon/myCoupon.js
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
    navActive: 0,
    couponData: [
      {
        type: 0,
        name: '待使用',
        data: [
          {
            price: 20,
            full: 199,
            title: '夏日优惠券通用',
            txt: '全场通用',
            time: '2019.09.20-2020.03.25'
          }
        ]
      },
      {
        type: 1,
        name: '已使用',
        data: [
          {
            price: 30,
            full: 199,
            title: '夏日优惠券通用',
            txt: '全场通用',
            time: '2019.09.20-2020.03.25'
          }
        ]
      },
      {
        type: 2,
        name: '已过期',
        data: [
          {
            price: 40,
            full: 199,
            title: '夏日优惠券通用',
            txt: '全场通用',
            time: '2019.09.20-2020.03.25'
          }
        ]
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindTabbar (e) {
      console.log(e)
      this.setData({
        navActive: e.currentTarget.dataset.idx
      })
    }
  }
})
