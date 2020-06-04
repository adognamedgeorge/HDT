// 计算属性
const computedBehavior = require('miniprogram-computed');
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: api.ImageUrl,
    cartData: [],
    pk:'',
    totalItems:'',
    subTotal:'',
    totalPrice:'',
  },

  //更新商品数据
  updateProductNum(event){
    let that = this;
    user.checkLogin().then((function (res) {
      if (res) {
        wx.showLoading({title: 'loading'});
        util.request(api.UpdateCartQtyUrl,
            {
              quantity: event.currentTarget.dataset.quantity,
              product:event.currentTarget.dataset.product,
              cartItem:that.data.pk,
            }, 'POST',
            'application/x-www-form-urlencoded'
        ).then((function (res) {
          wx.hideLoading();
          if(res.success){
            if (res.datas.entries==null||res.datas.entries.length==0){
              that.setData({
                cartData: [],
                pk:'',
                totalItems:0,
                subTotal:0,
                totalPrice:0,
              })
            }else{
              that.setData({
                cartData: res.datas.entries,
                pk:res.datas.pk,
                totalItems:res.datas.totalItems,
                subTotal:res.datas.subTotal,
                totalPrice:res.datas.totalPrice,
              })
            }
          }else{
            util.toast(res.msg, false);
          }
        }));
      } else {
        //跳转到登录页面
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    }));
  },

  //获取购物车展示数据
  getCart(){
    let that = this;
    user.checkLogin().then((function (res) {
      if (res) {
        wx.showLoading({title: 'loading'});
        util.request(api.MallShowCartUrl,
            {}, 'GET',
            'application/x-www-form-urlencoded'
        ).then((function (res) {
          wx.hideLoading();
          if(res.success){
            if (res.datas.entries==null||res.datas.entries.length==0){
              that.setData({
                cartData: [],
                pk:'',
                totalItems:0,
                subTotal:0,
                totalPrice:0,
              })
            }else{
              that.setData({
                cartData: res.datas.entries,
                pk:res.datas.pk,
                totalItems:res.datas.totalItems,
                subTotal:res.datas.subTotal,
                totalPrice:res.datas.totalPrice,
              })
            }
          }else{
            util.toast(res.msg, false);
          }
        }));
      } else {
        //跳转到登录页面
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    }));
  },

  //跳转到商品详情
  gotoProductDetail(event){
    wx.navigateTo({
      url: '/pages/component/goodsInfo/goodsInfo?code='+event.currentTarget.dataset.code
    })
  },

  //跳转到结算页面
  gotoCheckout(event){
    wx.navigateTo({
      url: '/pages/component/orderConfirm/orderConfirm',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCart();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

});
