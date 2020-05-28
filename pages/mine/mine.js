// pages/mine/mine.js
const app = getApp()
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')

    userInfo:{
      avatarUrl:"",//用户头像
      nickName:"",//用户昵称
    },
    phone:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    console.log(e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  getPhoneNumber (e) {
    console.log(e)
  },

  bindToOrder (e) {
    wx.navigateTo({
      url: './myOrder/myOrder'
    })
  },

  bindToAddress () {
    wx.navigateTo({
      url: './myAddress/myAddress'
    })
  },
  bindToFamilyInfo(){
    wx.navigateTo({
      url: '../component/familyInfo/familyInfo'
    });
  },
  toUserManager () {
    wx.navigateTo({
      url: './userManager/userManager',
      // events: {
      //   acceptDataFromOpenPage: function (data) {
      //     console.log(data)
      //   }
      // },
      success (res) {
        res.eventChannel.emit('acceptDataFromOpenPage', {data: app.globalData.userInfo})
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    /*wx.login({
      success (res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.cx2k-custstate1-d1-public.model-t.ccv2prod.sapcloud.cn/zddsws/test/login?id=moonsky&&code=' + res.code,
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })*/
  },

  bindToMypon (e) {
    wx.navigateTo({
      url: './myCoupon/myCoupon'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    user.checkLogin().then((function (res) {
      if (res) {
        //登陆成功的情况下获取账户信息
        util.request(api.PersonCenter,
            {
            },
            'GET',
            'application/x-www-form-urlencoded'
        ).then((function (res) {
          if(res.success){
            var wxPicture = res.customerDate.wxPicture;
            if (wxPicture == '' || typeof(wxPicture) == 'undefined') {
              wxPicture = '../../resources/img/black.jpeg';
            }
            that.setData({
              ['userInfo.avatarUrl']: wxPicture,
              ['userInfo.nickName']: res.customerDate.name,
              phone:res.customerDate.phone
            });
          }else{
            console.log(res.msg);
          }
        }));
      } else {
        //跳转到登录页面
        wx.navigateTo({
          url: '/pages/login/login',
        });
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

  }
})
