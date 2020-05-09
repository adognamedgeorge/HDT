// pages/goodsInfo/goodsInfo.js
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
    tabData: ['商品', '详情', '评价']
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
