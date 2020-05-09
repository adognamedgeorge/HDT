// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    province: '',
    city: '杭',
    imgSrc: [
      "../../resources/img/a.jpg",
      "../../resources/img/b.png",
      "../../resources/img/c.png"
    ],
    tabContent: [
      {imgSrc: '../../resources/img/all.png', txt: '领券中心', bg: 'bg1'},
      {imgSrc: '../../resources/img/fix.png', txt: '限时团购', bg: 'bg2'},
      {imgSrc: '../../resources/img/home.png', txt: '套餐专区', bg: 'bg3'},
      {imgSrc: '../../resources/img/assess.png', txt: '信息完善', bg: 'bg4'}
    ],
    sortData: [
      {title: '新零售', imgSrc: '../../resources/img/a.jpg'},
      {title: '用电服务', imgSrc: '../../resources/img/b.png'},
      {title: '户用光伏', imgSrc: '../../resources/img/c.png'}
    ],
    recData: [
      {
        imgSrc: '../../resources/img/a.jpg', 
        name: '商品名称商品名称商品名称aaaa',
        title: '辅助说明辅助说明辅助说明bbb', 
        label: '自营店面',
        tags: ['标签内容1', '标签内容2', '标签内容3']
      },
      {
        imgSrc: '../../resources/img/b.png', 
        name: '商品名称商品名称商品名称aaaa',
        title: '辅助说明辅助说明辅助说明bbb', 
        label: '自营店面',
        tags: ['标签内容1', '标签内容2']
      },
      {
        imgSrc: '../../resources/img/c.png', 
        name: '商品名称商品名称商品名称aaaa',
        title: '辅助说明辅助说明辅助说明bbb', 
        label: '自营店面',
        tags: ['标签内容1']
      }
    ],
    newRceData: [],
    cateData: [
      {imgSrc: '../../resources/img/d.png', name: '手机'},
      {imgSrc: '../../resources/img/d.png', name: '平板'},
      {imgSrc: '../../resources/img/d.png', name: '冰箱'},
      {imgSrc: '../../resources/img/d.png', name: '洗衣机'},
      {imgSrc: '../../resources/img/d.png', name: '手机'},
      {imgSrc: '../../resources/img/d.png', name: '平板'},
      {imgSrc: '../../resources/img/d.png', name: '冰箱'},
      {imgSrc: '../../resources/img/d.png', name: '洗衣机'}
    ]
  },
  // 点击显示推荐商品
  showRec (e) {
    this.setData({
      newRecData: this.data.recData
    })
  },
  // 获取定位
  getLocat (e) {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        console.log(res)
        console.log(res.latitude)
        console.log(res.longitude)
        const url = 'http://api.map.baidu.com/geocoder/v2/';
        const ak = 'VhueKFIWhIAjSgU07cYpgfu0I2aTuGTe';
        wx.request({
          url,
          data: {
            ak,
            location: `${res.latitude}, ${res.longitude}`,
            output: 'json'
          },
          success: function (res) {
            console.log(res)
            if (res.data.status == "0") {
              that.setData({
                province: res.data.result.addressComponent.province,
                city: res.data.result.addressComponent.city
              })
            } else {
              that.setData({
                city: '未知位置'
              })
            }
          }
        })
      }
    })
  },
  // 跳转到搜索二级页
  bindToSearch (e) {
    wx.navigateTo({
      url: "../component/search/search"
    })
  },
  // 跳转到我的tabbar页
bindToMine (e) {
  wx.showLoading({
    title: 'loading',
    success: function () {
      wx.switchTab({
        url: '../mine/mine'
      })
    }
  })
  setTimeout(function () {
    wx.hideLoading()
  }, 500)
},

bindToView (e) {
  console.log(e)
  switch (e.currentTarget.dataset.idx) {
  case 0:
    wx.navigateTo({
      url: './coupons/coupon'
    });
    break;
  case 2:
    wx.navigateTo({
      url: '../mall/sets/sets'
    });
    break;
  }
},

bindToGoodsInfo () {
  wx.navigateTo({
    url: '../goodsInfo/goodsInfo'
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      newRecData: this.data.recData.slice(0,2)
    })
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