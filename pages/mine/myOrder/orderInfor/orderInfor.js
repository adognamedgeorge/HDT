// pages/mine/myOrder/orderInfor/orderInfor.js
const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
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
    orderDetail:{},
    code:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toMyService () {
      wx.navigateTo({
        url: './myService/myService'
      })
    },
    bindToLogistics () {
      wx.navigateTo({
        url: './logistics/logistics'
      })
    },
    onLoad:function(options){
      console.log(options);
      this.setData({
        code:options.code
      })
    },
    getOrderDetail(){
      let that = this;
      that.setData({
        isLoad:true
      });
      util.request(api.MyOrderDetail,
          {
            code:that.data.code
          },
          'GET',
          'application/x-www-form-urlencoded'
      ).then((function (res) {
        that.setData({
          isLoad:false
        });
        console.log(res)
        if(res.success){
          that.setData({
            orderDetail: res.datas
          })
        }else{
          console.log(res.msg);
        }
      }));
    },
  },
  /*组件生命周期*/
  lifetimes: {
    ready() {
      console.log("在组件在视图层布局完成后执行")
      this.getOrderDetail();
    },
  }
})
