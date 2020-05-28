const util = require('../../../../../../../../utils/util');
const api = require('../../../../../../../../config/api.js');

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
    carrier: "",
    trackingId: "",
    carrierEnum: [],
    carrierIndex: 0
  },

  ready: function () {
    let that = this;
    that.showCarrier();
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

    showCarrier (){
      let that = this;
      util.request(api.LogisticsSelect, {}, "GET").then((res) => {
        if (res.success) {
          that.setData({
            carrierEnum: res.datas,
            carrier: res.datas[0].code
          })
        }else{
          util.toast(res.msg, false);
        }
      });
    },

    bindPickerChange: function (e) {
      let that = this;
      this.setData({
        carrierIndex: e.detail.value,
        carrier: that.data.carrierEnum[e.detail.value].code
      });
    },

    saveLogistics (){
      let that = this;
      util.request(api.SaveLogistics, {
        code: that.data.code,
        carrier: that.data.carrier,
        trackingId: that.data.trackingId
      }, "POST").then((res) => {
        if (res.success) {
          wx.showToast({
            title: '物流信息保存成功',
            icon: 'success',
            duration: 1000,
            mask: true,
            success: function () {
              //保存成功进入详情页面
              wx.navigateTo({
                url: '../regoodsDetail?code='+res.datas
              })
            }
          });
        }else{
          util.toast(res.msg, false);
        }
      })
    },
  }
});
