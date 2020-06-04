const util = require('../../../../../../utils/util');
const api = require('../../../../../../config/api.js');
const user = require('../../../../../../services/user.js');

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
    orderEntryPk: "",
    code: "",
    reasonCode: "",
    amountValue: "",
    maxAmount: "",
    quantity: "",
    maxQuantity: "",
    description: "",
    reasonEnums: [],
    reasonIndex: 0,
    uploadImages: [],
    files: []
  },

  ready: function () {
    let that = this;
    that.showReturnPlace();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options) {
      let that = this;
      that.setData({
        orderEntryPk: options.pk,
        code: options.code?options.code:""
      });
    },

    showReturnPlace (){
      let that = this;
      user.checkLogin().then((function (res) {
        if (res) {
          util.request(api.SetReturnRequest, {pk:that.data.orderEntryPk, type:"REPLACEMENT", code: that.data.code}, "GET").then((res) => {
            if (res.success) {
              that.setData({
                reasonCode: res.datas.reasonCode,
                amountValue: res.datas.amountValue.toFixed(2),
                maxAmount: res.datas.maxAmount,
                quantity: res.datas.quantity,
                maxQuantity: res.datas.maxQuantity,
                description: res.datas.description,
                reasonEnums: res.datas.reasonEnums,
                uploadImages: res.datas.uploadImages
              });
              //退货理由默认选择
              for(let i = 0;i<that.data.reasonEnums.length;i++){
                let item =  that.data.reasonEnums[i];
                if(item.code===that.data.reasonCode){
                  that.setData({
                    reasonIndex: i,
                  })
                }
              }
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

    bindPickerChange: function (e) {
      let that = this;
      this.setData({
        reasonIndex: e.detail.value,
        reasonCode: that.data.reasonEnums[e.detail.value].code
      });
    },

    submitReturnPlace () {
      let that = this;
      if (that.data.amountValue == "" || !(/(^[0-9]+(.[0-9]{1,2})?$)/.test(that.data.amountValue))) {
        util.toast("请输入正确的金额", false);
        return;
      }
      if(that.data.amountValue>that.data.maxAmount){
        util.toast("超过最大退款金额", false);
        return;
      }
      if (that.data.quantity == "" || !(/(^\+?[1-9][0-9]*$)/.test(that.data.quantity))) {
        util.toast("请输入正确的数量", false);
        return;
      }
      if(that.data.quantity>that.data.maxQuantity){
        util.toast("超过最大退货数量", false);
        return;
      }
      user.checkLogin().then((function (res) {
        if (res) {
          util.request(api.UpdateReturnRequest,
              {
                      pk: that.data.orderEntryPk,
                      code: that.data.code,
                      type: "REPLACEMENT",
                      reasonCode: that.data.reasonCode,
                      amount: that.data.amountValue,
                      quantity: that.data.quantity,
                      description: that.data.description,
                      uploadImages: that.data.uploadImages,
                    },
              "POST"
          ).then((res) => {
            if (res.success) {
              wx.showToast({
                title: '提交售后申请成功',
                icon: 'success',
                duration: 1000,
                mask: true,
                success: function () {
                  //保存成功进入详情页面
                  wx.navigateTo({
                    url: './regoodsDetail/regoodsDetail?code='+res.datas
                  })
                }
              });
            }else{
              util.toast(res.msg, false);
            }
          });
        } else {
          //跳转到登录页面
          wx.navigateTo({
            url: '/pages/login/login',
          });
        }
      }));
    }
  }
});
