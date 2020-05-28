const util = require('../../../../../utils/util');
const api = require('../../../../../config/api.js');
const user = require('../../../../../services/user.js');

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
    orderEntry: {},
    type: "",
    code: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options) {
      let that = this;
      that.setData({
        orderEntryPk: options.pk
      });
    },

    onShow: function () {
      let that = this;
      that.showOrderEntry();
    },

    //获取订单行的信息
    showOrderEntry (){
      let that = this;
      user.checkLogin().then((function (res) {
         if (res) {
            util.request(api.AfterSaleService, {pk:that.data.orderEntryPk, show:true}, "GET").then((res) => {
              if (res.success) {
                that.setData({
                  type: res.datas.type,
                  code: res.datas.code,
                  orderEntry: res.datas.entries[0]
                })
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

    bindToRefund () {
      let that = this;
      if(that.data.code){
        if(that.data.type === "REFUND"){
          //退款申请详情页面
          wx.navigateTo({
            url: './refund/refundDetail/refundDetail?code='+that.data.code
          })
        }
      }else{
        //退款申请填写页面
        wx.navigateTo({
          url: './refund/refund?pk='+that.data.orderEntryPk
        })
      }
    },

    bindToReturn () {
      let that = this;
      if(that.data.code){
        if(that.data.type === "REPLACEMENT"){
          //退款退货申请详情页面
          wx.navigateTo({
            url: './regoods/regoodsDetail/regoodsDetail?code='+that.data.code
          })
        }
      }else{
        //退款退货申请填写页面
        wx.navigateTo({
          url: './regoods/regoods?pk='+that.data.orderEntryPk
        })
      }
    }
  },

  //组件生命周期
  pageLifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
    show: function() {
      // 页面被展示
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  }
  /*生命周期	参数	描述	最低版本
  created	无	在组件实例刚刚被创建时执行	1.6.3
  attached	无	在组件实例进入页面节点树时执行	1.6.3
  ready	无	在组件在视图层布局完成后执行	1.6.3
  moved	无	在组件实例被移动到节点树另一个位置时执行	1.6.3
  detached	无	在组件实例被从页面节点树移除时执行	1.6.3
  error	Object Error	每当组件方法抛出错误时执行	2.4.1
  show	无	组件所在的页面被展示时执行	2.2.3
  hide	无	组件所在的页面被隐藏时执行	2.2.3
  resize	Object Size	组件所在的页面尺寸变化时执行	2.4.0*/
});
