// pages/component/goodsList/goodsList.js
const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    imagePath: api.ImageUrl,
    pageSize: 10,
    pageNum: 0,
    isLoad: true,
    tabData: ['综合', '销量', '价格'],
    navActive: 0,
    list: [],
    searchName:'',
    categoryCode:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindBar(e) {
      if (this.data.navActive != e.currentTarget.dataset.idx) {
        this.setData({
          navActive: e.currentTarget.dataset.idx,
          list: [],
          pageNum: 0
        })
        this.getProductList();
      }
    },
    onLoad:function(options){
      console.log(options);
      this.setData({
        searchName:options.name,
        categoryCode:options.categoryCode,
      })
    },
    getProductList(){
      let that = this;
      that.setData({
        isLoad:true
      });
      util.request(api.ProductList,
          {
            name:this.data.searchName,
            categoryCode:this.data.categoryCode,
            page:this.data.pageNum,
            size:this.data.pageSize
          },
          'POST',
          'application/x-www-form-urlencoded'
      ).then((function (res) {
        that.setData({
          isLoad:false
        });
        console.log(res)
        if(res.success){
          let newlist = that.data.list.concat(res.datas);
          that.setData({
            list: newlist
          })
        }else{
          console.log(res.msg);
        }
      }));
    },

    onReachBottom:function(){
      if (!this.data.isLoad) {
        this.setData({
          pageNum:this.data.pageNum+1
        })
        this.getProductList();
      }
    },
  },
  lifetimes: {
    ready() {
      console.log("在组件在视图层布局完成后执行")
      this.getProductList();
    },
  }
})
