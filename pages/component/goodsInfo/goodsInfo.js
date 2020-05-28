// pages/goodsInfo/goodsInfo.js
const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const user = require('../../../services/user.js');
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
    imagePath: api.ImageUrl,
    navActive: 0,
    tabData: ['商品', '详情', '评价'],
    code:'',
    detail:{},
    cartNum:'',
    isAddCart:true,
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
    },
    onLoad:function(options){
      console.log(options);
      this.setData({
        code:options.code
      })
    },
    getDetail(){
      let that = this;
      util.request(api.ProductDetail,
          {
            code:that.data.code
          },
          'GET',
          'application/x-www-form-urlencoded'
      ).then((function (res) {
        console.log(res)
        if(res.success){
          that.setData({
            detail: res.datas
          })
        }else{
          console.log(res.msg);
        }
      }));
    },
    addCartEntry(event,isRedirect){
      let that = this;
      user.checkLogin().then((function (res) {
        if (res) {
          util.request(api.AddCartEntryUrl,
              {
                product:event.detail.code,
                quantity:event.detail.num
              },
              'POST',
              'application/x-www-form-urlencoded'
          ).then((function (res) {
            console.log(res)
            if(res.success){
              util.toast("添加商品成功");
              that.setData({
                cartNum:res.datas.totalItems,
                isAddCart:true,
              });
              if (isRedirect != null && isRedirect==true) {
                wx.switchTab({
                  url: '/pages/cart/cart',
                })
              }
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
    toOrderConfirm(event){
      this.addCartEntry(event,true);
    },
    toCart(event) {
      user.checkLogin().then((function (res) {
        if (res) {
          wx.switchTab({
            url: '/pages/cart/cart',
          });
        }else {
          //跳转到登录页面
          wx.navigateTo({
            url: '/pages/login/login',
          });
        }
      }));
    },
    getCartNum(){
      let that = this;
      user.checkLogin().then((function (res) {
        if (res) {
          util.request(api.MallShowCartUrl,
              {}, 'GET',
              'application/x-www-form-urlencoded'
          ).then((function (res) {
            wx.hideLoading();
            if(res.success){
              if (res.datas.entries==null||res.datas.entries.length==0){
                that.setData({
                  cartNum:'',
                })
              }else{
                var cartNum1 = res.datas.totalItems;
                if (that.isNumber(cartNum1) && cartNum1 > 99) {
                  cartNum1 = "99+";
                }
                that.setData({
                  cartNum:cartNum1,
                })
              }
            }
          }));
        }
      }));
    },
    isNumber(val) {
      var regPos = /^\d+(\.\d+)?$/; //非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      if(regPos.test(val) || regNeg.test(val)) {
        return true;
      } else {
        return false;
      }
    },
  },

  /*组件生命周期*/
  lifetimes: {
    ready() {
      console.log("在组件在视图层布局完成后执行")
      this.getDetail();
      this.getCartNum();
    },
  }
})
