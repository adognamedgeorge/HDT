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
    invoiceTypeItems: [
      {name: '电子普通发票', value: 'GENERAL'},
      {name: '纸质增值税专用发票', value: 'VAT'},
    ],
    invoiceTypeIndex: 0,
    invoiceType: "GENERAL",
    invoiceTitleItems: [
      {name: '企业单位', value: 'COMPANY'},
      {name: '个人/非企业单位', value: 'PERSONAL'},
    ],
    invoiceTitleIndex: 1,
    invoiceTitle: "PERSONAL",
    content: "商品明细",
    personalName: "",
    corporateName: "",
    personalPhone: "",
    corporatePhone: "",
    number: "",
    address: "",
    bank: "",
    account: "",
    phoneNumber: ""
  },

  ready: function () {
    let that = this;
    that.showCustomerInvoice();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取结算地址的信息
    showCustomerInvoice (){
      let that = this;
      user.checkLogin().then((function (res) {
        if (res) {
          //登陆成功的情况下获取
          util.request(api.CheckoutInvoiceUrl, {}, "GET").then((res) => {
            if (res.success) {
              that.setData({
                invoiceType: res.datas.invoiceType,
                invoiceTitle: res.datas.invoiceTitle,
                content: res.datas.content,
                personalName: res.datas.personalName,
                corporateName: res.datas.corporateName,
                personalPhone: res.datas.personalPhone,
                corporatePhone: res.datas.corporatePhone,
                number: res.datas.number,
                address: res.datas.address,
                bank: res.datas.bank,
                account: res.datas.account,
                phoneNumber: res.datas.phoneNumber
              })
            }
            //发票类型默认选择
            for(let i = 0;i<that.data.invoiceTypeItems.length;i++){
              let item =  that.data.invoiceTypeItems[i];
              if(item.value===that.data.invoiceType){
                that.setData({
                  invoiceTypeIndex: i,
                })
              }
            }
            //发票抬头类型默认选择
            for(let i = 0;i<that.data.invoiceTitleItems.length;i++){
              let item =  that.data.invoiceTitleItems[i];
              if(item.value===that.data.invoiceTitle){
                that.setData({
                  invoiceTitleIndex: i,
                })
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

    // 选择发票类型
    bindPickerChange (e) {
      let that = this;
      that.setData({
        invoiceTypeIndex: e.detail.value,
        invoiceType: that.data.invoiceTypeItems[e.detail.value].value
      })
    },

    // 选择抬头类型
    radioChange (e) {
      let that = this;
      that.setData({
        invoiceTitle: e.detail.value
      });
      for(let i = 0;i<that.data.invoiceTitleItems.length;i++){
        let item = that.data.invoiceTitleItems[i];
        if(item.value===that.data.invoiceTitle){
          that.setData({
            invoiceTitleIndex: i,
          })
        }
      }
    },

    // 提交发票申请
    commitInvoice (event) {
      let that = this;
      user.checkLogin().then((function (res) {
        if (res) {
          util.request(api.CheckoutCommitInvoiceUrl,
              {
                invoiceType: that.data.invoiceType,
                invoiceTitle: that.data.invoiceTitle,
                content: that.data.content,
                personalName: that.data.personalName,
                corporateName: that.data.corporateName,
                personalPhone: that.data.personalPhone,
                corporatePhone: that.data.corporatePhone,
                number: that.data.number,
                address: that.data.address,
                bank: that.data.bank,
                account: that.data.account,
                phoneNumber: that.data.phoneNumber
              },
              "POST"
          ).then((res) => {
            if (res.success) {
              wx.showToast({
                title: '提交发票申请成功',
                icon: 'success',
                duration: 1000,
                mask:true,
                success: function () {
                  //跳转到结算页面页面
                  wx.navigateBack({
                    url: '/pages/component/orderConfirm/orderConfirm',
                  });
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

    // 取消发票申请
    cancelInvoice (event) {
      user.checkLogin().then((function (res) {
        if (res) {
          util.request(api.CheckoutCancelInvoiceUrl, {}, "POST").then((res) => {
            if (res.success) {
              wx.showToast({
                title: '取消开票成功',
                icon: 'success',
                duration: 1000,
                mask:true,
                success: function () {
                  //跳转到结算页面页面
                  wx.navigateBack({
                    url: '/pages/component/orderConfirm/orderConfirm',
                  });
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
    }
  }
});
