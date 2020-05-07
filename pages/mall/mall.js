// pages/mall/mall.js
const computedBehavior = require('miniprogram-computed')
Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    swiperData: [
      '../../resources/img/c.png',
      '../../resources/img/b.png',
      '../../resources/img/a.jpg'
    ],
    goodsData: [
      {imgSrc: '../../resources/img/d.png', txt: '家电'},
      {imgSrc: '../../resources/img/d.png', txt: '厨卫家电'},
      {imgSrc: '../../resources/img/d.png', txt: '生活电器'},
      {imgSrc: '../../resources/img/d.png', txt: '个人健康'},
      {imgSrc: '../../resources/img/d.png', txt: '家电'},
      {imgSrc: '../../resources/img/d.png', txt: '厨卫家电'},
      {imgSrc: '../../resources/img/d.png', txt: '生活电器'},
      {imgSrc: '../../resources/img/d.png', txt: '个人健康'},
      {imgSrc: '../../resources/img/all.png', txt: '老胡'}
    ],
    a: 1,
    b: 1,
    packageData: [
      {
        title: '汽车活动套餐',
        price: '2723.00',
        content: [
          '../../resources/img/a.jpg',
          '../../resources/img/b.png',
          '../../resources/img/c.png',
          '../../resources/img/d.png'
        ]
      },
      {
        title: '家电活动套餐',
        price: '1234.00',
        content: [
          '../../resources/img/b.png',
          '../../resources/img/a.jpg',
          '../../resources/img/d.png',
          '../../resources/img/c.png'
        ]
      }
    ]
  },
  computed: {
    sum (data) {
      return data.a + data.b
    },
    goodsData2 (data) {
      const pages = []
      data.goodsData.forEach((item, index) => {
        const page = Math.floor(index / 8)
        console.log(page)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
        console.log(pages)
      })
      return pages
    }
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