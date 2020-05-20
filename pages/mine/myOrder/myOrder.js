// pages/mine/myOrder/myOrder.js
const util = require('../../../utils/util.js');
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
    pageSize: 10,
    pageNum: 0,
    isLoad:true,
    tabData: [{name:'全部',code:''},{name:'待付款',code:'created'},{name:'待发货',code:'piad'},{name:'待收款',code:'delivered'},{name:'待评价',code:'received'}],
    navActive: 0,
    list:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindBar (e) {
      if(this.data.navActive!=e.currentTarget.dataset.idx){
        this.setData({
          navActive: e.currentTarget.dataset.idx,
          list: [],
          pageNum:0
        })
        this.getOrderList();
      }
    },
    toOrderInfor (event) {
      wx.navigateTo({
        url: './orderInfor/orderInfor?code='+event.currentTarget.dataset.code
      })
    },
    getOrderList(){
      let that = this;
      that.setData({
        isLoad:true
      });
      util.request(api.MyOrder,
          {
            status: this.data.tabData[this.data.navActive].code,
            page:this.data.pageNum,
            size:this.data.pageSize
          },
          'POST',
          'application/x-www-form-urlencoded'
      ).then((function (res) {
        that.setData({
          isLoad:false
        });
        console.log(res)
        if(res.success){
          //that.data.list = that.data.list.concat(res.datas);
          let newlist = that.data.list.concat(res.datas);
          that.setData({
            list: newlist
          })
        }else{
          console.log(res.msg);
        }
      }));
    },

    onReachBottom:function(){
      if (!this.data.isLoad) {
        this.setData({
          pageNum:this.data.pageNum+1
        })
        this.getOrderList();
      }
    },
  },

  /*组件生命周期*/
  lifetimes: {
    created() {
      console.log("在组件实例刚刚被创建时执行")
    },
    attached() {
      console.log("在组件实例进入页面节点树时执行")
    },
    ready() {
      console.log("在组件在视图层布局完成后执行")
      this.getOrderList();
    },
    moved() {
      console.log("在组件实例被移动到节点树另一个位置时执行")
    },
    detached() {
      console.log("在组件实例被从页面节点树移除时执行")
    },
    error() {
      console.log("每当组件方法抛出错误时执行")
    },
    /*组件所在页面的生命周期 */
    pageLifetimes: {
      show: function () {
        // 页面被展示
        console.log("页面被展示")
      },
      hide: function () {
        // 页面被隐藏
        console.log("页面被隐藏")
      },
      resize: function (size) {
        // 页面尺寸变化
        console.log("页面尺寸变化")
      }
    }
  }
})
