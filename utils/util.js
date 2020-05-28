var api = require('../config/api.js');

const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n
};

/**
 * 封装微信的的request
 */
function request(url, data, method = "GET",Content="application/json") {
  console.log(`接口请求地址为:${url} 请求方式为:${method}`);
  console.log(`接口请求数据为:${JSON.stringify(data)}`);
  wx.showNavigationBarLoading();
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': Content,
        'Token': wx.getStorageSync('mini_token'),
        'uuid': wx.getStorageSync('userId'),
        'Cookie': wx.getStorageSync('cookie'),
      },
      success: function (res) {
        wx.hideNavigationBarLoading();
        wx.setStorageSync('cookie', res.header['Set-Cookie']);
        console.log(`接口请求结果为:${JSON.stringify(res)}`);
        if (res.statusCode === 200) {
          res.data.param = JSON.stringify(data);
          resolve(res.data);
        } else if (res.statusCode === 401) {
          //跳转到登录页面
          /*if (!wx.getStorageSync('loginPage')) {*/
            wx.clearStorageSync();
            wx.navigateTo({
              url: '/pages/login/login'
            })
          /*}*/
        } else {
          reject(res.errMsg);
        }
      },
      fail: function (err) {
        wx.hideNavigationBarLoading();
        wx.setStorageSync('cookie', err.header['Set-Cookie']);
        reject(err)
      }
    })
  });
}

/**
 * 调用微信登录
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          //登录远程服务器
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

/**
 * 调用微信支付
 */
function weChatPayment(param, orderCode) {
  wx.requestPayment({
    timeStamp: param.timeStamp,
    nonceStr: param.nonceStr,
    package: param.package,
    signType: param.signType,
    paySign: param.paySign,
    success: function (res) {
      console.log(res);
      //校验支付状态，跳转到支付成功页面
      request(api.PaymentQueryUrl, {code : orderCode}, "POST",'application/x-www-form-urlencoded'
      ).then((res) => {
        if (res.success) {
          //跳转到支付成功页面
          wx.navigateTo({
            url: '/pages/component/paied/paied?code='+res.datas
          })
        }else{
          //util.toast(res.msg, false);
          //跳转到支付失败-订单列表页面
          wx.navigateTo({
            url: '/pages/mine/myOrder/myOrder'
          })
        }
      });
    },
    fail: function (res) {
      //跳转到支付失败-订单列表页面
      console.log(res);
      wx.navigateTo({
        url: '/pages/mine/myOrder/myOrder'
      })
    },
    complete: function (res) {
      console.log(res)
    }
  })
}

/**
 * 提示信息
 */
function toast(msg,icon){
  let aicon = "none";
  if (icon){
    aicon=icon;
  }
  wx.showToast({
    title: msg,
    icon: aicon,
    duration: 1000,
    mask:true
  });
  /*wx.showToast({
      title:"成功",
      icon: 'loading...',//图标，支持"success"、"loading"
      image: '/images/tan.png',//自定义图标的本地路径，image 的优先级高于 icon
      duration: 2000,//提示的延迟时间，单位毫秒，默认：1500
      mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false
      success:function(){},
      fail:function(){},
      complete:function(){}
  })*/
}

module.exports = {
  formatTime: formatTime,
  request: request,
  login: login,
  toast: toast,
  weChatPayment: weChatPayment,
};



