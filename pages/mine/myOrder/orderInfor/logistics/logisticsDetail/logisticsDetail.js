// pages/mine/myOrder/orderInfor/logistics/logisticsDetail/logisticsDetail.js

const app = getApp()
const util = require('../../../../../../utils/util.js');
const api = require('../../../../../../config/api.js');
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
    imagePath:api.ImageUrl,
    logDetailData: [
      // {add: '杭州已经收货', date: '2020-05-23 15:09:09'},
      // {add: '福州中转部', date: '2020-06-23 15:09:09'},
      // {add: '上海堡垒中转部', date: '2020-07-23 15:09:09'},
      // {add: '温州中转部', date: '2020-08-23 15:09:09'}
    ],
    logisticsNumber:'',
    carrierName:'',
    images:[],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad:function(options){
      var that = this;
      util.request(api.DeliveryInfoDetail,
        {
          pk:options.pk
        },
        'GET',
        'application/x-www-form-urlencoded'
    ).then((function (res) {
      if(res.code == 200){
        that.setData({
          logisticsNumber:res.logisticsNumber,
          carrierName:res.carrierName,
          logDetailData:res.logistics,
          images:res.images
        });
      }else{
        console.log(res.message);
      }
    }));
    }
  }
})
