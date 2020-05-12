var HybrisApiUrl = "https://electronics.local:9002/zddswebservices/"; //sgp测试环境
var ImageUrl = "https://electronics.local:9002/images/";//图片地址

module.exports = {
  //ImageUrl
  ImageUrl: ImageUrl,//图片服务器路径

  //首页
  BannerUrl: HybrisApiUrl + "miniprogram/b2c/home/bannerImages",//首页轮播图


  WeChatLogin: HybrisApiUrl + "miniprogram/b2c/login/loginByWeChat", //微信登录

  SmsLogin: HybrisApiUrl + "miniprogram/b2c/login/loginBySms", //短信登录

  SmsSend: HybrisApiUrl + "miniprogram/b2c/login/sendSms",//发送短信

};
