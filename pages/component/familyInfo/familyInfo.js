// pages/component/familyInfo/familyInfo.js
const app = getApp()
const util = require('../../../utils/util');
const api = require('../../../config/api.js');

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
    region: [],
    regionCode: [],
    male: ['男','女'],
    // male: [{value: 'MALE', name: '男'},{value: 'FEMALE', name: '女'}],
    // age: [{value:'LESSEIGHTEEN' ,name: '18岁及以下',},
    //   {value:'EIGHTEENTOTWENTYFIVE' ,name: '18-25',},
    //   {value:'TWENTYFIVETOTHIRTY' ,name: '25-30',},
    //   {value:'THIRTYTOTHIRTYFIVE' ,name: '30-35',},
    //   {value:'THIRTYFIVETOFIFTY' ,name: '35-50',},
    //   {value:'FIFTYMORE' ,name: '50以上'}],
    idx: 0,
    customItem:'',
    area: '',
    electricityNumber: '',
    houseType: [
      ['1室','2室','3室','4室'],
      ['1厅','2厅','3厅','4厅','5厅'],
      ['1厨','2厨','3厨'],
      ['1卫','2卫','3卫','4卫','5卫'],
      ['1阳台','2阳台','3阳台','4阳台','5阳台']
    ],
    multiIndex: [0,0,0,0,0]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择所在地区
    bindRegionChange: function (e) {
      this.setData({
          region: e.detail.value,
          regionCode: e.detail.code
      })
    },

    changeHouseType (e) {
      console.log(e.detail)
      this.setData({
        multiIndex: e.detail.value
      })
    },
    // 选择性别
    bindMaleChange (e) {
      console.log(e);
      this.setData({
        idx: e.detail.value
      })
    },

    formSubmit:function(e){
      let that = this;
      var regionIso = "";
      var cityIso = "";
      var distinctIso = "";
      var electricityNumber = e.detail.value.electricityNumber;
      var isnum = !/(^[0-9]+(.[0-9]{1,3})?$)/.test(e.detail.value.area);
      var number = !/^\d{10}$/.test(electricityNumber);
      if(that.data.regionCode.length!=0){
        regionIso = that.data.regionCode[0];
        cityIso = that.data.regionCode[1];
        distinctIso = that.data.regionCode[2];
      }
      if(electricityNumber != "" && number){
        util.toast("请输入正确的电力户号!");
        return false;
      }
      if(e.detail.value.area != "" && isnum){
        util.toast("请输入正确的房屋面积!");
        return false;
      }
      
      util.request(api.PerfectInformation,  
          {
            regionIso: regionIso,
            cityIso: cityIso,
            distinctIso: distinctIso,
            electricityNumber: electricityNumber,
            area: e.detail.value.area
          },
          'POST',
          'application/json;charset=utf-8'
      ).then(function(res){
        if(res.success){
          wx.navigateBack({
            url: '../../mine/mine'
          })
        }else{
          util.toast("保存失败");
        }
      });
    },

    onShow:function(){
      let that = this;
      util.request(api.ReturnPerfectInformation,
        {
        },
        'GET',
        'application/x-www-form-urlencoded'
    ).then(function(res){
      if(res.success){
        var regionList = [];
        var regionCodeList = [];
        console.log();
        if(typeof(res.data.regionIso) != "undefined" && res.data.regionIso !=""){
          regionList = [res.data.regionName,res.data.cityName,res.data.distinctName];
          regionCodeList = [res.data.regionIso,res.data.cityIso,res.data.distinctIso]
        }
        that.setData({
          region:regionList,
          regionCode:regionCodeList,
          electricityNumber: res.data.electricityNumber,
          area: res.data.area
        });
      }
    });
    }
  }
})
