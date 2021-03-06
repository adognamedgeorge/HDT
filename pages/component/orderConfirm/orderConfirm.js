const util = require('../../../utils/util');
const api = require('../../../config/api.js');
const user = require('../../../services/user');

//获取应用实例
const app = getApp();

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    remark: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    imagePath: api.ImageUrl,
    address: {},
    checkoutCart: {},
    remark: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShow: function () {
      let that = this;
      that.showCheckoutAddress();
      that.showCheckoutCart();
    },

    //获取结算地址的信息
    showCheckoutAddress () {
      let that = this;
      user.checkLogin().then((function (res) {
        if (res) {
          //登陆成功的情况下获取
          util.request(api.CheckoutAddressUrl, {}, "GET").then((res) => {
            if (res.success) {
              that.setData({
                address: res.datas
              })
            }
          })
        } else {
          //跳转到登录页面
          wx.navigateTo({
            url: '/pages/login/login',
          });
        }
      }));
    },

    //获取结算购物车的信息
    showCheckoutCart () {
      let that = this;
      user.checkLogin().then((function (res) {
        if (res) {
          util.request(api.CheckoutShowCartUrl, {}, "GET").then((res) => {
            if (res.success) {
              that.setData({
                checkoutCart: res.datas,
              })
            }else{
              if(res.datas == "402"){
                //自动跳转在支付时，存在问题
                /*wx.navigateBack({
                  url: '/pages/cart/cart',
                });*/

                /*wx.showToast({
                  title: '购物车为空不能结算',
                  icon: 'false',
                  duration: 1000,
                  mask: true,
                  success: function () {
                    wx.navigateBack({
                      url: '/pages/cart/cart',
                    });
                  }
                });*/
              }else{
                util.toast(res.msg, false);
              }
            }
          })
        } else {
          //跳转到登录页面
          wx.navigateTo({
            url: '/pages/login/login',
          });
        }
      }));
    },

    //跳转到结算地址列表选择页面
    checkoutAddress () {
      wx.navigateTo({
        url: '../../mine/myAddress/myAddress?source=checkout&selectId='+this.data.address.id
      })
    },

    //跳转到结算开具发票页面
    bindToBill (e) {
      wx.navigateTo({
        url: '../bill/bill'
      })
    },

    //结算购物车下单
    placeOrder (event) {
      let that = this;
      if (Object.keys(that.data.address).length === 0){
        util.toast("请选择收货地址", false);
        return;
      }
      user.checkLogin().then((function (res) {
        if (res) {
          util.request(api.CheckoutPlaceOrderUrl,
              {remark:that.data.remark},
              "POST",
          'application/x-www-form-urlencoded'
          ).then((res) => {
            if (res.success) {
              //返回生成的订单
              let orderCode = res.datas;
              //触发支付操作
              wx.login({
                success: function (res) {
                  //返回code
                  let code = res.code;
                  util.request(api.PaymentWeChatUrl,
                      {code : code, orderCode : orderCode },
                      "POST",
                      'application/x-www-form-urlencoded'
                  ).then((res) => {
                    if (res.success) {
                      let params = res.datas;
                      util.weChatPayment(params, orderCode);
                      /*wx.showToast({
                        title: "下单成功，即将支付",
                        icon: 'success',
                        duration: 1000,
                        mask: true,
                        success: function () {
                          let params = res.datas;
                          util.weChatPayment(params, orderCode);
                        }
                      });*/
                    }else{
                      wx.navigateTo({
                        url: '/pages/mine/myOrder/myOrder'
                      })
                      /*wx.showToast({
                        title: res.msg,
                        icon: 'false',
                        duration: 1000,
                        mask: true,
                        success: function () {
                          wx.navigateTo({
                            url: '/pages/mine/myOrder/myOrder'
                          })
                        }
                      });*/
                    }
                  });
                }
              })
            }else{
              if(res.datas == "402"){
                wx.showToast({
                  title: '购物车为空',
                  icon: 'false',
                  duration: 2000,
                  mask: true,
                  success: function () {
                    setTimeout(function () {
                      wx.navigateBack({
                        url: '/pages/cart/cart',
                      });
                    }, 2000);//延迟时间
                  }
                });
              }else{
                util.toast(res.msg, false);
              }
            }
          })
        } else {
          //跳转到登录页面
          wx.navigateTo({
            url: '/pages/login/login',
          });
        }
      }));
    },
  }
});
