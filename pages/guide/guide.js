const user = require('../../services/user.js');
Page({
  data: {
    nickName: '',
    avatarUrl: '',
    gender:'',
  },

  getPhoneNumber (e) {
    let that =this;
    wx.showLoading({
      title: 'loading',
    });
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      user.loginByWXPhone(e.detail.iv,e.detail.encryptedData,
          that.data.nickName,that.data.gender,that.data.avatarUrl).then(function (res) {
        wx.hideLoading();
        if (res.success){
          wx.navigateBack({
            delta: 2
          });
        }
      });
    }else{
      wx.hideLoading();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options){
    console.log(options);
    this.setData({
      nickName:options.nickName,
      gender:options.gender,
      avatarUrl:options.avatarUrl,
    })
  },

  // 绑定按钮触发
  handlebind() {
    console.log('此处执行绑定事件')
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