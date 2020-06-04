// pages/mine/myOrder/orderInfor/logistics/logistics.js

const app = getApp()
const util = require('../../../../../utils/util.js');
const api = require('../../../../../config/api.js');

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
    logData: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toLogisticsDetail (event) {
      var pk = event.currentTarget.dataset.pk;
      wx.navigateTo({
        url: './logisticsDetail/logisticsDetail?pk='+pk
      })
    },
    onLoad:function(options){
      var that = this;
      util.request(api.DeliveryInfo,
        {
          orderCode:options.orderCode
        },
        'GET',
        'application/x-www-form-urlencoded'
    ).then((function (res) {
      if(res.code == 200){
        if(typeof(res.data) != 'undefined'){
          that.setData({
            logData:res.data
          });
        }
      }else{
        console.log(res.message);
      }
    }));
    }
  }
})
