/**
 * 用户相关服务
 */
const util = require('../utils/util.js');
const api = require('../config/api.js');

function loginByWXPhone(ivPhone, encryptedPhoneData,nickName,gender,avatarUrl) {
    let code = null;
    return new Promise(function (resolve, reject) {
        return util.login().then((res) => {
            code = res.code;
            return wx.getStorageSync("userId")
        }).then((result) => {
            util.request(api.WeChatLogin,
                {
                    code: code,
                    ivPhone: ivPhone,
                    encryptedPhoneData: encryptedPhoneData,
                    nickName:nickName,
                    gender:gender,
                    avatarUrl:avatarUrl,
                },
                'POST',
                'application/x-www-form-urlencoded'
            ).then(res => {
                if (res.success) {
                    wx.setStorageSync('userId', res.datas.userId);
                    //从后台获取的token，前端自己保存到全局变量中，备用；以后每次使用request都把该变量存入header变量
                    wx.setStorageSync('mini_token', res.datas.miniToken);
                    resolve(res);
                }
            }).catch((err) => {
                reject(err);
            });
        }).catch((err) => {
            reject(err);
        })
    });
}
/**
 * 调用微信登录
 */
function loginByWeChat() {
    let code = null;
    return new Promise(function (resolve, reject) {
        return util.login().then((res) => {
            code = res.code;
            return wx.getStorageSync("userId")
        }).then((result) => {
            wx.getUserInfo({
                success: function (res) {
                    console.log(res.userInfo);
                    let iv = res.iv;
                    let encryptedData = res.encryptedData;
                    let signature = res.signature;
                    let rawData = res.rawData;
                    // 登录远程服务器
                    //上传用户信息和登录用的code，获取token
                    util.request(api.WeChatLogin,
                        {
                            code: code,
                            signature: signature,
                            rawData: rawData,
                            encryptedData: encryptedData,
                            iv: iv
                        },
                        'POST',
                        'application/x-www-form-urlencoded'
                    ).then(res => {
                        if (res.success) {
                            wx.setStorageSync('userId', res.datas.userId);
                            //从后台获取的token，前端自己保存到全局变量中，备用；以后每次使用request都把该变量存入header变量
                            wx.setStorageSync('mini_token', res.datas.miniToken);
                            resolve(res);
                        }
                    }).catch((err) => {
                        reject(err);
                    });
                },
                fail: function () {
                    //this.authSetting();
                }
            });
        }).catch((err) => {
            reject(err);
        })
    });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
    return new Promise(function (resolve, reject) {
        let result = false;
        let userId = wx.getStorageSync('userId');
        let token = wx.getStorageSync('mini_token');
        if (userId && token) {
            result = true;
        }
        resolve(result);
    });
}
/**
 * 调用发送短信
 */
function loginBySms(phone,code) {
    return new Promise(function (resolve, reject) {
        return util.request(api.SmsLogin,
            {
                phone: phone,
                code:code,
            },
            'POST',
            'application/x-www-form-urlencoded'
        ).then(res => {
            if (res.success) {
                wx.setStorageSync('userId', res.datas.userId);
                //从后台获取的token，前端自己保存到全局变量中，备用；以后每次使用request都把该变量存入header变量
                wx.setStorageSync('mini_token', res.datas.miniToken);
                resolve(res);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}

/**
 * 调用发送短信
 */
function sendSms(phone) {
    return new Promise(function (resolve, reject) {
        return util.request(api.SmsSend,
            {
                phone: phone
            },
            'POST',
            'application/x-www-form-urlencoded'
        ).then(res => {
            if (res.success) {
                resolve(res);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports = {
    checkLogin: checkLogin,
    loginByWeChat: loginByWeChat,
    sendSms: sendSms,
    loginBySms: loginBySms,
    loginByWXPhone:loginByWXPhone,
};
