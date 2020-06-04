// pages/component/goodsList/goodsList.js
const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const user = require('../../../services/user.js');
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
    tabData: [{name:'综合',code:'creationTime-desc'},{name:'销量',code:'salesVolume-desc'},{name:'价格',code:'price-desc'}],
    navActive: 0,
    navSort:'creationTime-desc',
    list: [],
    searchName:'',
    categoryCode:'',
    noResult: false
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
          pageNum: 0,
          navSort:e.currentTarget.dataset.sort
        })
        this.getProductList();
      }
    },
    toDetail(event) {
      wx.navigateTo({
        url: '../goodsInfo/goodsInfo?code='+event.currentTarget.dataset.code
      })
    },
    onLoad:function(options){
      console.log(options);
      this.setData({
        searchName:options.name,
        categoryCode:options.categoryCode,
        navSort:options.sort,
      })
    },
    getProductList(){
      let that = this;
      that.setData({
        isLoad:true
      });
      var param={
        page:this.data.pageNum,
        size:this.data.pageSize
      };
      if (this.data.searchName != null && this.data.searchName.length > 0 ) {
        param.name=this.data.searchName;
      }
      if (this.data.categoryCode != null && this.data.categoryCode.length > 0) {
        param.categoryCode=this.data.categoryCode;
      }
      if (this.data.navSort == null || this.data.navSort.length <= 0) {
        this.setData({
          navSort: 'creationTime-desc',
        });
      }
      param.sort = this.data.navSort;

      util.request(api.ProductList,
          param,
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

          if (res.datas.length == 0) {
            that.setData({
              noResult: true
            })
          }

        }else{
          console.log(res.msg);
          that.setData({
            noResult: true
          })
        }
      }));
    },

    addCartEntry(event){
      let that = this;
      user.checkLogin().then((function (res) {
        if (res) {
          util.request(api.AddCartEntryUrl,
              {
                product:event.currentTarget.dataset.code,
                quantity:1
              },
              'POST',
              'application/x-www-form-urlencoded'
          ).then((function (res) {
            console.log(res)
            if(res.success){
              util.toast("添加商品成功");
            }else{
              console.log(res.msg);
              util.toast(res.msg, false);
            }
          }));
        } else {
          //跳转到登录页面
          wx.navigateTo({
            url: '/pages/login/login',
          })
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
