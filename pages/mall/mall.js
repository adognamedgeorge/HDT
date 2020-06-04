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
    searchContent:'',
    swiperBanner: [],
    goodsData: [],
    a: 1,
    b: 1,
    packageData: [
      {
        title: '家电套餐',
        price: '2723.00',
        content: [
          {imgSrc: '../../resources/img/missing_product.jpg'},
          {imgSrc: '../../resources/img/missing_product.jpg'},
          {imgSrc: '../../resources/img/missing_product.jpg'},
          {imgSrc: '../../resources/img/missing_product.jpg'}
        ]
      }
    ],
    recommendData: [
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
  // 跳转领券页
  bindToHomeCoupon () {
    wx.navigateTo({
      url: '../home/coupons/coupon'
    })
  },

  toSorts: function (e) {
    wx.navigateTo({
      url: './sorts/sorts'
    })
  },
  searchContentInput(e){
    this.setData({
      searchContent: e.detail.value
    })
  },
  toSearch: function (e) {
    var that=this;
    wx.navigateTo({
      url: "../component/goodsList/goodsList?name="+that.data.searchContent
    })
  },
  bindToSets: function (e) {
    wx.navigateTo({
      url: './sets/sets'
    })
  },
  toProductList(e) {
    wx.navigateTo({
      url: "../component/goodsList/goodsList?sort=salesVolume-desc"
    })
  },
  bindToGoodsList (e) {
    wx.navigateTo({
      url: "../component/goodsList/goodsList?categoryCode="+e.currentTarget.dataset.code
    })
  },
  bindToGoodsInfo (e) {
    wx.navigateTo({
      url: '../component/goodsInfo/goodsInfo?code='+e.currentTarget.dataset.code
    })
  },
  // 点击键盘上的搜索
  bindconfirm:function(e){
    var that=this;
    var discountName=e.detail.value['search - input'] ?e.detail.value['search - input'] : e.detail.value
    console.log('e.detail.value', discountName)
    wx.navigateTo({
      url: "../component/goodsList/goodsList?name="+discountName
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
      if (res.success) {
        this.setData({
          recommendData: res.datas
        })
      }
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