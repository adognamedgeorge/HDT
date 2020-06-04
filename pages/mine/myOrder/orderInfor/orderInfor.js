const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');

//获取应用实例
const app = getApp();
let that;

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
    orderDetail: {},
    code: "",
    timeToCancel: "",
    timeToDelivered: "",
    paidDeadline: null,
    deliveredDeadline: null,
    buttons: [{text: '取消'}, {text: '确认'}],
    dialogShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad:function(options){
      that=this;
      this.setData({
        code:options.code
      });
    },

    onShow: function(){
      this.getOrderDetail();
    },

    //时间计数
    countTime () {
      let timeToCancel = null;
      let timeToDelivered = null;
      if (that.data.paidDeadline) {
        timeToCancel = that.diffTime(new Date(), that.data.paidDeadline);
      }
      if (that.data.deliveredDeadline) {
        timeToDelivered = that.diffTime(new Date(), that.data.deliveredDeadline);
      }
      that.setData({
        timeToCancel: timeToCancel,
        timeToDelivered: timeToDelivered,
      });
      setTimeout(that.countTime, 1000)
    },

    //获取订单详细信息
    getOrderDetail(){
      let that = this;
      that.setData({
        isLoad:true
      });
      util.request(api.MyOrderDetail,
          {code:that.data.code},
          'GET',
          'application/x-www-form-urlencoded'
      ).then((function (res) {
        that.setData({
          isLoad:false
        });
        if(res.success){
          let timeToCancel = "";
          let timeToDelivered = "";
          if (res.datas.creationTime){
            var paidDeadline  = new Date(res.datas.creationTime);
            //加1小时
            paidDeadline.setHours(paidDeadline.getHours() + 1);
          }
          if (res.datas.shippingTime){
            var deliveredDeadline  = new Date(res.datas.shippingTime);
            //加15天
            deliveredDeadline.setDate(deliveredDeadline.getDate() + 15);
          }
          that.setData({
            orderDetail: res.datas,
            paidDeadline:paidDeadline,
            deliveredDeadline:deliveredDeadline,
          });
          that.countTime();
        }else{
          console.log(res.msg);
        }
      }));
    },

    //时间差函数
    diffTime(startDate,endDate) {
        var diff=endDate.getTime() - startDate.getTime();//时间差的毫秒数
        var isNegative = false;
        if (diff < 0) {
          diff = -diff;
          isNegative=true;
        }
        //计算出相差天数
        var days=Math.floor(diff/(24*3600*1000));

        //计算出小时数
        var leave1=diff%(24*3600*1000);    //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000));
        //计算相差分钟数
        var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000));

        //计算相差秒数
        var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1000);

        var returnStr = seconds + "秒";
        if(minutes>0) {
          returnStr = minutes + "分" + returnStr;
        }
        if(hours>0) {
          returnStr = hours + "小时" + returnStr;
        }
        if(days>0) {
          returnStr = days + "天" + returnStr;
        }
      if (isNegative) {
        returnStr = "-" + returnStr;
      }
      return returnStr;
    },

    //跳转售后服务申请页面
    bindToAddServe (event) {
      wx.navigateTo({
        url: './myService/myService?pk='+event.currentTarget.dataset.pk
      })
    },

    //跳转售后服务详情页面
    bindToShowServe(event){
      let type = event.currentTarget.dataset.type;
      if(type == "REFUND"){
        //退款申请详情页面
        wx.navigateTo({
          url: './myService/refund/refundDetail/refundDetail?code='+event.currentTarget.dataset.returncode
        })
      }else if(type == "REPLACEMENT"){
        //退款退货申请详情页面
        wx.navigateTo({
          url: './myService/regoods/regoodsDetail/regoodsDetail?code='+event.currentTarget.dataset.returncode
        })
      }
    },

    //跳转物流信息查看
    toLogistics () {
      wx.navigateTo({
        url: './logistics/logistics'
      })
    },

    //跳转订单评价
    toReceived (event) {
      wx.navigateTo({
        url: './evaluate/evaluate?code='+event.currentTarget.dataset.code
      })
    },

    //跳转商品详情页
    orderInformation(event){
      wx.navigateTo({
        url: '/pages/component/goodsInfo/goodsInfo?code='+event.currentTarget.dataset.code
      });
    },

    //取消订单
    toCancelOrder (event) {
      
    },

    //立即付款
    toPaid (event) {
      //根据支付方式判断唤起哪种支付
      
    },

    //查看发票
    toInvoice (event) {
      
    },

    //确认收货
    toDelivered (event) {
      this.setData({
        dialogShow: true
      })
    },

    tapDialogButton (e) {
      this.setData({
        dialogShow: false
      })
    }
  },

  /*组件生命周期*/
  lifetimes: {
    ready() {
      //console.log("在组件在视图层布局完成后执行");
      //this.getOrderDetail();
    }
  }
});
