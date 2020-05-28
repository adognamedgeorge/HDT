const util = require('../../../../../../../utils/util');
const api = require('../../../../../../../config/api');
const user = require('../../../../../../../services/user');

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
    code: "",
    orderEntryPk: "",
    status: "",
    returnRequestResult: {}
  },

  ready: function () {
    let that = this;
    that.showRefundRequest();
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
    //获取售后申请的信息
    showRefundRequest (){
      let that = this;
      user.checkLogin().then((function (res) {
        if (res) {
          util.request(api.ReturnRequestDetail, {code:that.data.code}, "GET").then((res) => {
            if (res.success) {
              that.setData({
                returnRequestResult: res.datas,
                status: res.datas.status,
                orderEntryPk: res.datas.entries[0].pk,
              })
            }else{
              util.toast(res.msg, false);
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

    //修改售后申请页面
    modifyRefundRequest (event) {
      let that = this;
      wx.navigateTo({
        url: '../refund?pk='+that.data.orderEntryPk+"&code="+that.data.code,
      })
    },

    //撤销售后申请
    cancelRefundRequest (event) {
      let that = this;
      user.checkLogin().then((function (res) {
        if (res) {
          util.request(api.CancelReturnRequest,
              {code:that.data.code},
              "POST",
              'application/x-www-form-urlencoded'
          ).then((res) => {
            if (res.success) {
              wx.showToast({
                title: '售后申请撤销成功',
                icon: 'success',
                duration: 1000,
                mask: true,
                success: function () {
                  that.setData({
                    returnRequestResult: res.datas,
                    status: res.datas.status,
                    orderEntryPk: res.datas.entries[0].pk,
                  })
                }
              });
            }else{
              util.toast(res.msg, false);
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
