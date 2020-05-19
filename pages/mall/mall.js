// pages/mall/mall.js
// 计算属性
const computedBehavior = require('miniprogram-computed');
const util = require('../../utils/util');
const api = require('../../config/api');
Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    imgPath: api.ImageUrl,
    swiperBanner: [],
    goodsData: [],
    a: 1,
    b: 1,
    packageData: [
      {
        title: '汽车活动套餐',
        price: '2723.00',
        content: [
          {imgSrc: '../../resources/img/a.png'},
          {imgSrc: '../../resources/img/a.png'},
          {imgSrc: '../../resources/img/a.png'},
          {imgSrc: '../../resources/img/a.png'}
        ]
      },
      {
        title: '家电活动套餐',
        price: '1234.00',
        content: [
          {imgSrc: '../../resources/img/a.png'},
          {imgSrc: '../../resources/img/a.png'},
          {imgSrc: '../../resources/img/a.png'},
          {imgSrc: '../../resources/img/a.png'}
        ]
      }
    ],
    recommendData: [
      {imgSrc: '../../resources/img/a.png', text: '炒锅砂锅aaaaa炒锅炒锅', price: '345'},
      {imgSrc: '../../resources/img/a.png', text: '炒锅砂锅aaaaa', price: '345'},
      {imgSrc: '../../resources/img/a.png', text: '炒锅砂锅aaaaa', price: '345'},
      {imgSrc: '../../resources/img/a.png', text: '炒锅砂锅aaaaa', price: '345'},
      {imgSrc: '../../resources/img/a.png', text: '炒锅砂锅aaaaa', price: '345'},
      {imgSrc: '../../resources/img/a.png', text: '炒锅砂锅aaaaa', price: '345'},
      {imgSrc: '../../resources/img/a.png', text: '炒锅砂锅aaaaa', price: '345'},
      {imgSrc: '../../resources/img/a.png', text: '炒锅砂锅aaaaa', price: '345'}
    ]
  },
  computed: {
    sum (data) {
      return data.a + data.b
    },
    // 商品类别分页轮播
    goodsData2 (data) {
      const pages = []
      data.goodsData.forEach((item, index) => {
        const page = Math.floor(index / 10)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  },

  toSorts: function (e) {
    wx.navigateTo({
      url: './sorts/sorts'
    })
  },

  bindToSets: function (e) {
    wx.navigateTo({
      url: './sets/sets'
    })
  },

  // 获取轮播图
  getBanner () {
    util.request(api.MallBannerUrl, {}, "GET").then((res) => {
      if (res.success) {
        this.setData({
          swiperBanner: res.datas
        })
      }
    })
  },

  // 获取优惠券
  getCoupon () {
    util.request(api.MallCouponImageUrl, {}, "GET").then((res) => {
      if (res.success) {
        console.log(res)
      }
    })
  },

  // 获取商品类别
  getCategory () {
    util.request(api.MallCategoriesUrl, {}, "GET").then((res) => {
      if (res.success) {
        this.setData({
          goodsData: res.datas
        })
      }
    })
  },

  // 获取套餐数据
  getPackage () {
    util.request(api.MallSetMealUrl, {}, "GET").then((res) => {
      if (res.success) {
        console.log(res)
      }
    })
  },

  // 获取商品推荐数据
  getRec () {
    util.request(api.MallRecommendedUrl, {}, "GET").then((res) => {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this
    that.getBanner()
    that.getCoupon()
    that.getCategory()
    that.getPackage()
    that.getRec()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  fn1: function () {
    console.log('fn1')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.fn1()
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