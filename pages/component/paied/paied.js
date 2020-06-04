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

  },

  /**
   * 组件的初始数据
   */
  data: {
    imagePath: api.ImageUrl,
    code: "",
    totalPrice: "¥ 0.00",
    paymentMode: "微信支付",
    paymentStatus: "success"
  },

  ready: function () {
    let that = this;
    that.showCheckResult();
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onLoad: function (options) {
      let that = this;
      that.setData({
        code: options.code
      });
    },

    showCheckResult () {
      let that = this;
      user.checkLogin().then((function (res) {
        if (res) {
          util.request(api.PaymentCheckResultUrl, {code:that.data.code}, "GET").then((res) => {
            if (res.success) {
              that.setData({
                totalPrice: res.datas.totalPrice,
                paymentMode: res.datas.paymentMode,
                paymentStatus: res.datas.paymentStatus,
              })
            }else{
              util.toast(res.msg, false);
            }
          })
        } else {
          //跳转到登录页面
          wx.navigateTo({
            url: '/pages/login/login'
          });
        }
      }));
    },

    bindToOrder () {
      wx.navigateTo({
        url: '../../mine/myOrder/myOrder'
      })
    },

    backHome () {
      wx.switchTab({
        url: '../../home/home'
      });
    }
  }
});
