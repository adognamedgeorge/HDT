// pages/mall/sorts/sorts.js
const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
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
    sortsData: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toProductList (e) {
      wx.navigateTo({
        url: "../../component/goodsList/goodsList?categoryCode="+e.currentTarget.dataset.code
      })
    },
    //获取商品类别
    getCategoriesData: function (){
      let that = this;
      //查询商品类别树
      util.request(api.MallCategoryTreeUrl, {}, "GET").then(function (res) {
        if (res.success) {
          that.setData({
            sortsData: res.datas
          })
        }
      });
    },
  },
  lifetimes: {
    ready() {
      console.log("在组件在视图层布局完成后执行")
      this.getCategoriesData();
    },
  }
})
