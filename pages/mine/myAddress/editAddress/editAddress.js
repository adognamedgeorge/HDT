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
    pk: '',
    firstName:'',
    cellphone:'',
    line1:'',
    default:false
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //省市区选择
    bindRegionChange: function (e) {
      this.setData({
        region: e.detail.value,
        regionCode: e.detail.code
      })
    },

    //表单提交
    formSubmit:function(e){
      let that = this;
      if(e.detail.value.firstName == ''){
        util.toast("请填写收件人");
      }else if(e.detail.value.cellphone == ''){
        util.toast("请填写手机号");
      }else if(that.data.regionCode.length==0){
        util.toast("请选择地区");
      }else if(e.detail.value.line1 == ''){
        util.toast("请填写详细地址");
      }else{
        util.request(api.AddOrUpdateAddress,
          {
            pk:e.detail.value.pk,
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
              util.toast("编辑失败");
          }
      });
      }
    },

    onLoad:function(options){
      this.setData({
        source: options.source,
        selectId: options.selectId,
        pk: options.pk,
        firstName: options.firstName,
        cellphone: options.cellphone,
        line1: options.line1,
        default: options.default,
        region:[options.regionName,options.cityName,options.distinctName],
        regionCode:[options.regionIso,options.cityIso,options.distinctIso]
      });
    },

    switchChange (e) {
      console.log(e.detail)
    }
  }
});
