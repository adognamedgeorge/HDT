// pages/mine/myAddress/addAddress/addAddress.js
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
    region: ['浙江省', '杭州市', '江干区'],
    customItem: '全部'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindRegionChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        region: e.detail.value
      })
    }
  }
})
