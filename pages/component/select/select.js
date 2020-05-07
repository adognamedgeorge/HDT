// pages/component/select/select.js
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
    content: "省份/地区",
    selectListData: [1,2,3,4,5,6],
    isHidden: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showList (e) {
      this.setData({
        isHidden: false
      })
    },
    hidList (e) {
      console.log(e)
      this.setData({
        content: e.currentTarget.dataset.name,
        isHidden: true
      })
    }
  }
})
