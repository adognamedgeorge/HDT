const api = require('../../config/api.js');
const util = require('../../utils/util.js');
const user = require('../../services/user.js');

//获取应用实例
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imagePath: api.ImageUrl,
    isLoginShow:true,
    province: '',
    city: '杭州',
    banner: [],
    tabContent: [
      {imgSrc: '../../resources/img/money-ticket.png', txt: '领券中心', bg: 'bg1'},
      {imgSrc: '../../resources/img/tuangou.png', txt: '限时团购', bg: 'bg2'},
      {imgSrc: '../../resources/img/shopping-bag.png', txt: '套餐专区', bg: 'bg3'},
      {imgSrc: '../../resources/img/message-fill.png', txt: '信息完善', bg: 'bg4'}
    ],
    plateData: [],
    recData: [],
    newRceData: [],
    cateData: []
  },

  // 点击显示推荐商品
  showRec: function (e) {
    this.setData({
      newRecData: this.data.recData
    })
  },

  // 获取定位
  getLocat: function (e) {
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        console.log(res);
        console.log(res.latitude);
        console.log(res.longitude);
        const url = 'http://api.map.baidu.com/geocoder/v2/';
        const ak = 'VhueKFIWhIAjSgU07cYpgfu0I2aTuGTe';
        wx.request({
          url,
          data: {
            ak,
            location: `${res.latitude}, ${res.longitude}`,
            output: 'json'
          },
          successs: function (res) {
            console.log(res);
            if (res.data.status === "0") {
              this.setData({
                province: res.data.result.addressComponent.province,
                city: res.data.result.addressComponent.city
              })
            } else {
              this.setData({
                city: '未知位置'
              })
            }
          }
        })
      }
    })
  },

  // 跳转到搜索二级页
  bindToSearch: function (e) {
    wx.navigateTo({
      url: "../component/search/search"
    })
  },

  // 跳转到我的tabbar页
  bindToLogin: function (e) {
    wx.showLoading({
      title: 'loading',
      success: function () {
        wx.navigateTo({
          url: '../login/login'
        })
      }
    });
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
  },

  bindToGoodsInfo (e) {
    wx.navigateTo({
      url: '../component/goodsInfo/goodsInfo?code='+e.currentTarget.dataset.code
    })
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
    case 3: 
      wx.navigateTo({
        url: '../component/familyInfo/familyInfo'
      })
    }
  },
  bindToItem(e){
    console.log(e)
    switch(e.currentTarget.dataset.idx){
      case 0:
        wx.switchTab({
          url:'../mall/mall'
        });
        break;
       case 1:
        wx.navigateTo({
          // url:'../mall/sorts/sorts'
        });
        break;
       case 2:
        wx.navigateTo({
          // url:'../mall/sets/sets'
        });
        break;
    }
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

  //获取轮播图片
  getBannerData: function (){
    let that = this;
    //查询首页轮播图片
    util.request(api.BannerUrl, {}, "GET").then(function (res) {
      if (res.success) {
        that.setData({
          banner: res.datas
        })
      }
    });
  },

  //获取栏位横幅
  getPlateData: function (){
    let that = this;
    var itemUrl = "";
    //查询栏位横幅
    util.request(api.PlateUrl, {}, "GET").then(function (res) {
      if (res.success) {
        let plates = res.datas;
        for (let i in plates) {
          if(plates[i].type==='JDLS'){
            plates[i].name = "家电零售"
          }else if(plates[i].type==='YDFW'){
            plates[i].name = "用电服务"
          }else if(plates[i].type==='HYGF'){
            plates[i].name = "户用光伏"
          }
        }
        that.setData({
          plateData: plates
        })
      }
    });
    
  },

  //获取推荐商品
  getRecommendedData: function (){
    let that = this;
    //查询推荐商品
    util.request(api.ProductRecommendedUrl, {}, "GET").then(function (res) {
      if (res.success) {
        that.setData({
          recData: res.datas
        })
      }
    });
  },

  //获取商品类别
  getCategoriesData: function (){
    let that = this;
    //查询商品类别
    util.request(api.ProductCategoriesUrl, {}, "GET").then(function (res) {
      if (res.success) {
        that.setData({
          cateData: res.datas
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    user.checkLogin().then((function (res) {
      that.getBannerData();
      that.getPlateData();
      that.getRecommendedData();
      that.getCategoriesData();
      if (res) {
        that.setData({
          isLoginShow:true
        });
      } else {
        //跳转到登录页面
        /*wx.navigateTo({
          url: '/pages/login/login',
        })*/
        that.setData({
          isLoginShow:false
        })
      }
    }));
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
    return {
      title: '浙江国网ToC零售商城',
      desc: '浙江国网ToC零售商城',
      path: '/pages/home/home'
    }
  }
});
