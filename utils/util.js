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
          /*if (!wx.getStorageSync('loginPage')) {
            wx.clearStorageSync();
            wx.setStorageSync('companyId', '1')
            wx.navigateTo({
              url: '/pages/login/login'
            })
          }*/
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

module.exports = {
  formatTime: formatTime,
  request: request,
  login: login,
};



