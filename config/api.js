var HybrisApiUrl = "https://api.cx2k-custstate1-d1-public.model-t.ccv2prod.sapcloud.cn/zddsws/"; //sgp测试环境
var ImageUrl = "https://api.cx2k-custstate1-d1-public.model-t.ccv2prod.sapcloud.cn";//图片地址
var HybrisApiUrl1 = "https://electronics.local:9002/zddswebservices/"; //sgp测试环境
var ImageUrl1 = "https://electronics.local:9002/images/";//图片地址

module.exports = {
  //ImageUrl
  ImageUrl: ImageUrl,//图片访问路径

  //整体首页
  BannerUrl: HybrisApiUrl + "miniprogram/b2c/home/banners",//整体首页轮播图
  PlateUrl: HybrisApiUrl + "miniprogram/b2c/home/plates",//整体首页栏位横幅
  ProductRecommendedUrl: HybrisApiUrl + "miniprogram/b2c/home/productRecommended",//整体首页商品推荐
  ProductCategoriesUrl: HybrisApiUrl + "miniprogram/b2c/home/productCategories",//整体首页商品类别

  //商城首页
  MallBannerUrl: HybrisApiUrl + "miniprogram/b2c/mallHome/banners",//商城首页轮播图
  MallCouponImageUrl: HybrisApiUrl + "miniprogram/b2c/mallHome/couponImage",//商城首页优惠券图片
  MallCategoriesUrl: HybrisApiUrl + "miniprogram/b2c/mallHome/productCategories",//商城首页商品类别
  MallSetMealUrl: HybrisApiUrl + "miniprogram/b2c/mallHome/setMealArea",//商城首页套餐专区
  MallRecommendedUrl: HybrisApiUrl + "miniprogram/b2c/mallHome/productRecommended",//整体首页商品推荐

  //商城购物车
  MallShowCartUrl: HybrisApiUrl + "miniprogram/b2c/cart/showCart",//商城购物车展示
  updateCartQtyUrl: HybrisApiUrl + "miniprogram/b2c/cart/updateCartQuantity",//商城更新或者删除购物车行

  //商城登录
  WeChatLogin: HybrisApiUrl + "miniprogram/b2c/login/loginByWeChat", //微信登录
  SmsLogin: HybrisApiUrl + "miniprogram/b2c/login/loginBySms", //短信登录
  SmsSend: HybrisApiUrl + "miniprogram/b2c/login/sendSms",//发送短信

  //商品
  ProductList:HybrisApiUrl +"miniprogram/b2c/product/products",//商品列表
  ProductDetail:HybrisApiUrl +"miniprogram/b2c/product/ProductDetail",//商品详情

  //商城个人中心
  MyOrder: HybrisApiUrl + "miniprogram/b2c/order/myOrder",//我的订单
  MyOrderDetail: HybrisApiUrl + "miniprogram/b2c/order/myOrderDetail",//我的订单详情


};
