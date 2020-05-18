// pages/login/login.js
const user = require('../../services/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    phone:'',
    code:'',
    oneButton: [{text: '登录', extClass: 'my_btn'}],
    btnIner: '发送验证码',
    btnType: 'primary',
    time: 60,
    isDisable: false
  },
  phoneInput(e){
    this.setData({
      phone: e.detail.value
    })
  },
  codeInput(e){
    this.setData({
      code: e.detail.value
    })
  },
  telLogin (e) {
    this.setData({
      isShow: true
    })
  },

  sendBtn(e){
    let that = this
    user.sendSms(that.data.phone).then(function (res) {
      if (res.success) {
        console.log("已经发送");
        that.codeTime()
      }
    });
  },

  // 验证码时间间隔
  codeTime () {
    let that = this
    let timer = that.data.time--
    if (timer > 0) {
      that.setData({
        btnIner: timer + 's秒后重发',
        isDisable: true
      })
      setTimeout(that.codeTime, 1000)
    } else {
      that.setData({
        btnIner: "发送验证码",
        isDisable: false,
        time: 60
      })
    }
  },

  tapDialogBtn () {
    let that = this;
    user.loginBySms(this.data.phone,this.data.code).then(function (res) {
        if (res.success){
          that.setData({
            isShow: false
          });
          wx.navigateBack({
            delta: 1
          });
        }
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