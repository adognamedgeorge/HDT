// pages/home/coupons/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponData: [
      {
        price: 20,
        full: 199,
        title: '夏日优惠券通用',
        txt: '全场通用',
        time: '2019.09.20-2020.03.25',
        type: 0
      },
      {
        price: 50,
        full: 399,
        title: '冬日日优惠券通用',
        txt: '限时使用',
        time: '2019.09.20-2020.04.25',
        type: 1
      },
      {
        price: 10,
        full: 99,
        title: '春日优惠券通用',
        txt: '全场不通用',
        time: '2020.02.20-2020.03.25',
        type: 2
      }
    ]
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
})