// pages/component/familyInfo/familyInfo.js
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
    male: ['男', '女', '变态'],
    idx: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择所在地区
    bindRegionChange (e) {
      this.setData({
        region: e.detail.value
      })
    },
    // 选择性别
    bindMaleChange (e) {
      this.setData({
        idx: e.detail.value
      })
    }
  }
})
