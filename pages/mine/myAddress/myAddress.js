// pages/mine/myAddress/myAddress.js
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
    addAddress () {
      wx.navigateTo({
        url: './addAddress/addAddress'
      })
    }
  }
})
