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

    ageArr: [{id:'LESSEIGHTEEN' ,name: '18岁及以下'},
      {id:'EIGHTEENTOTWENTYFIVE' ,name: '18-25'},
      {id:'TWENTYFIVETOTHIRTY' ,name: '25-30'},
      {id:'THIRTYTOTHIRTYFIVE' ,name: '30-35'},
      {id:'THIRTYFIVETOFIFTY' ,name: '35-50'},
      {id:'FIFTYMORE' ,name: '50以上'}],
    idx: 0,
    ageIdx: 0,
    incomeArr: [{id:'TEN' ,name: '0-10W'},
      {id:'TWENTY' ,name: '10W-20W'},
      {id:'THIRTY' ,name: '20W-30W'},
      {id:'FOURTY' ,name: '30W-40W'},
      {id:'FIFTY' ,name: '40W-50W'},
      {id:'HUNDRED' ,name: '50w-100w'},
      {id:'OTHER' ,name: '100w以上'}],
      incomeIdx: 0,
    customItem:'',
    area: '',
    electricityNumber: '',
    houseType: [
      [{id: 'ONE', name: '1室'},{id: 'TWO', name: '2室'},{id: 'THREE', name: '3室'},{id: 'FOUR', name: '4室'},{id: 'FIVE', name: '5室'},{id: 'OTHER', name: '其他'}],
      [{id: 'ONE', name: '1厅'},{id: 'TWO', name: '2厅'},{id: 'THREE', name: '3厅'},{id: 'FOUR', name: '4厅'},{id: 'FIVE', name: '5厅'},{id: 'OTHER', name: '其他'}],
      [{id: 'ONE', name: '1厨'},{id: 'TWO', name: '2厨'},{id: 'THREE', name: '3厨'},{id: 'FOUR', name: '4厨'},{id: 'FIVE', name: '5厨'},{id: 'OTHER', name: '其他'}],
      [{id: 'ONE', name: '1卫'},{id: 'TWO', name: '2卫'},{id: 'THREE', name: '3卫'},{id: 'FOUR', name: '4卫'},{id: 'FIVE', name: '5卫'},{id: 'OTHER', name: '其他'}],
      [{id: 'ONE', name: '1阳台'},{id: 'TWO', name: '2阳台'},{id: 'THREE', name: '3阳台'},{id: 'FOUR', name: '4阳台'},{id: 'FIVE', name: '5阳台'},{id: 'OTHER', name: '其他'}]
    ],
    multiIndex: [0,0,0,0,0],
    // houseType的id列表
    idArr: [],
    maleArr: [{id: 'MALE', name: '男'}, {id: 'FEMALE', name: '女'}],
    population: '',
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
      console.log(e,e.detail.value)
      let a = this.data.houseType
      let i = e.detail.value
      this.setData({
        multiIndex: e.detail.value,
        idArr: [
          a[0][i[0]].id,
          a[1][i[1]].id,
          a[2][i[2]].id,
          a[3][i[3]].id,
          a[4][i[4]].id
        ]
      })
    },
    // 选择性别
    bindMaleChange (e) {
      this.setData({
        idx: e.detail.value
      })
    },
    //选择年龄段
    bindAgeChange (e){
      this.setData({
        ageIdx: e.detail.value
      })
    },
    //选择家庭收入
    bindIncomeChange (e){
      this.setData({
        incomeIdx: e.detail.value
      })
    },

    formSubmit:function(e){
      let that = this;
      var regionIso = "";
      var cityIso = "";
      var distinctIso = "";
      var electricityNumber = e.detail.value.electricityNumber;
      var population = e.detail.value.population;
      var isnum = !/(^[0-9]+(.[0-9]{1,3})?$)/.test(e.detail.value.area);
      var number = !/^\d{10}$/.test(electricityNumber);
      var populationReg = !/^[1-9]\d*$/.test(population);
      var room = "";
      var livingroom = "";
      var kitchen = "";
      var toilet = "";
      var balcony = "";
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
      if(population != "" && populationReg){
          util.toast("请输入正确的家庭人数!");
          return false;
      }
      if(that.data.idArr.length!=0){
        room = that.data.idArr[0];
        livingroom = that.data.idArr[1];
        kitchen = that.data.idArr[2];
        toilet = that.data.idArr[3];
        balcony = that.data.idArr[4];
      }
      util.request(api.PerfectInformation,  
          {
            regionIso: regionIso,
            cityIso: cityIso,
            distinctIso: distinctIso,
            electricityNumber: electricityNumber,
            area: e.detail.value.area,
            room: room,
            livingroom: livingroom,
            kitchen: kitchen,
            toilet: toilet,
            balcony: balcony,
            gender: that.data.maleArr[that.data.idx].id,
            ageCode:that.data.ageArr[that.data.ageIdx].id,
            population : e.detail.value.population,
            incomeCode:that.data.incomeArr[that.data.incomeIdx].id
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
        var roomList = [];
        let dt = res.data;
        if(typeof(dt.regionIso) != "undefined" && dt.regionIso !=""){
          regionList = [dt.regionName, dt.cityName, dt.distinctName];
          regionCodeList = [dt.regionIso, dt.cityIso, dt.distinctIso];
        }
        roomList = [dt.room, dt.livingroom, dt.kitchen, dt.toilet, dt.balcony];

        let i, j, newArr = [];
        for (i = 0; i < roomList.length; i++) {
          for (j = 0; j < roomList.length; j++) {
            if (i == j) {
              that.data.houseType[i].forEach((item, index) => {
                item.id == roomList[j] ?  newArr.push(index) : 0
              })
            }
          }
        }

        var sexIdx = 0;
        if(typeof(dt.gender) !='undefined'){
          switch(dt.gender){
              case "MALE":
                sexIdx = 0;
                break;
                case "FEMALE":
                  sexIdx = 1
                break;
          }
        }
        console.log(dt.ageCode);
        var ageCode = 0;
        if(typeof(dt.ageCode) !='undefined'){
          // switch(dt.ageCode){
          //     case "LESSEIGHTEEN":
          //       ageCode = 0;
          //       break;
          //     case "EIGHTEENTOTWENTYFIVE":
          //       ageCode = 1
          //       break;
          //     case "TWENTYFIVETOTHIRTY":
          //       ageCode = 2;
          //       break;
          //     case "THIRTYTOTHIRTYFIVE":
          //       ageCode = 3;
          //       break;
          //     case "THIRTYFIVETOFIFTY":
          //       ageCode = 4;
          //     break;
          //     case "FIFTYMORE":
          //       ageCode = 5;
          //       break;
          // }
          that.data.ageArr.forEach((item, index) => {
            if (item.id == dt.ageCode) {
              ageCode = index
            }
          })

        }
        var incomeCode = 0;
        if(typeof(dt.incomeCode) !='undefined'){
          switch(dt.incomeCode){
              case "TEN":
                incomeCode = 0;
                break;
              case "TWENTY":
                incomeCode = 1
              break;
              case "THIRTY":
                incomeCode = 2;
                break;
              case "FOURTY":
                incomeCode = 3;
                break;
              case "FIFTY":
                incomeCode = 4;
              break;
              case "HUNDRED":
                incomeCode = 5;
                break;
              case "OTHER":
                incomeCode = 6;
                break;
          }
        }
        that.setData({
          region:regionList,
          regionCode:regionCodeList,
          electricityNumber: dt.electricityNumber,
          area: dt.area,
          multiIndex: newArr,
          idx:sexIdx,
          ageIdx: ageCode,
          population : dt.population,
          incomeIdx: incomeCode
        });
      }
    });
    }
  }
})
