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
      {name: '个人', value: 'PERSONAL'},
      {name: '企业', value: 'COMPANY'}
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
    phoneNumber: "",
    companyArr: [
      {title: '*发票抬头', holder: '填写发票抬头', value: '', id: 'corporateName'},
      {title: '*发票税号', holder: '纳税人识别号', value: '', id: 'number'},
      {title: '*发票内容', holder: '商品明细', value: '', id: 'content'},
      {title: '*单位地址', holder: '填写单位地址', value: '', id: 'address'},
      {title: '*电话号码', holder: '填写电话号码', value: '', id: 'corporatePhone'},
      {title: '*开户银行', holder: '填写开户银行', value: '', id: 'bank'},
      {title: '*银行账号', holder: '填写银行账户', value: '', id: 'account'}
    ]
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
      let invoiceTypes;
      //数据必填校验
      if(that.data.invoiceTitle==="PERSONAL"){
        invoiceTypes = "GENERAL";
        if(that.data.personalName.replace(/\s*/g,"").length===0){
          util.toast("请填写发票抬头", false);
          return;
        }
        if(that.data.content.replace(/\s*/g,"").length===0){
          util.toast("请填写发票内容", false);
          return;
        }
      }else if(that.data.invoiceTitle==="COMPANY"){
        invoiceTypes = that.data.invoiceType;
        if(that.data.corporateName.replace(/\s*/g,"").length===0){
          util.toast("请填写发票抬头", false);
          return;
        }
        if(that.data.number.replace(/\s*/g,"").length===0){
          util.toast("请填写纳税人识别号", false);
          return;
        }
        if(that.data.content.replace(/\s*/g,"").length===0){
          util.toast("请填写发票内容", false);
          return;
        }
        if(that.data.address.replace(/\s*/g,"").length===0){
          util.toast("请填写单位地址", false);
          return;
        }
        if(that.data.corporatePhone.replace(/\s*/g,"").length===0){
          util.toast("请填写电话号码", false);
          return;
        }
        if(that.data.bank.replace(/\s*/g,"").length===0){
          util.toast("请填写开户银行", false);
          return;
        }
        if(that.data.account.replace(/\s*/g,"").length===0){
          util.toast("请填写银行账户", false);
          return;
        }
      }
      if(that.data.phoneNumber.replace(/\s*/g,"").length===0){
        util.toast("请填写收票人手机", false);
        return;
      }
      user.checkLogin().then((function (res) {
        if (res) {
          util.request(api.CheckoutCommitInvoiceUrl,
              {
                invoiceType: invoiceTypes,
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
