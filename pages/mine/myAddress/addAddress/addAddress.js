const util = require('../../../../utils/util');
const api = require('../../../../config/api.js');

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
      source: "",
      selectId: "",
      region:[],
      regionCode:[],
      customItem:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
      bindRegionChange: function (e) {
          this.setData({
              region: e.detail.value,
              regionCode: e.detail.code
          })
      },

      formSubmit:function(e){
          let that = this;
          var cellphoneReg = !/^[1][3,4,5,7,8][0-9]{9}$/.test(e.detail.value.cellphone);
          if(e.detail.value.firstName == ''){
              util.toast("请填写收件人");
          }else if(cellphoneReg){
              util.toast("请填写正确格式的手机号");
          }else if(that.data.regionCode.length==0){
              util.toast("请选择地区");
          }else if(e.detail.value.line1 == ''){
              util.toast("请填写详细地址");
          }else{
              util.request(api.AddOrUpdateAddress,
                  {
                      firstName: e.detail.value.firstName,
                      cellphone: e.detail.value.cellphone,
                      line1: e.detail.value.line1,
                      regionIso: that.data.regionCode[0],
                      cityIso: that.data.regionCode[1],
                      distinctIso: that.data.regionCode[2],
                      default: e.detail.value.default
                  },
                  'POST',
                  'application/json;charset=utf-8'
              ).then(function (res) {
                  if (res.success) {
                      wx.navigateBack({
                          url: '../myAddress?source='+that.data.source+"&selectId="+that.data.selectId
                      })
                  } else {
                      util.toast("添加失败");
                  }
              });
          }
      },

      onLoad:function(options){
          this.setData({
              source: options.source,
              selectId: options.selectId,
          });
      },
  }
});
