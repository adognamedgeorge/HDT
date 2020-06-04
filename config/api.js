// 正式
// var HybrisApiUrl = "https://api.cx2k-custstate1-p1-public.model-t.ccv2prod.sapcloud.cn/zddsws/"; //sgp测试环境
// var ImageUrl = "https://api.cx2k-custstate1-p1-public.model-t.ccv2prod.sapcloud.cn";//图片地址

// 测试
var HybrisApiUrl = "https://api.cx2k-custstate1-d1-public.model-t.ccv2prod.sapcloud.cn/zddsws/"; //sgp测试环境
var ImageUrl = "https://api.cx2k-custstate1-d1-public.model-t.ccv2prod.sapcloud.cn";//图片地址

//var HybrisApiUrl = "https://electronics.local:9002/zddswebservices/"; //sgp测试环境
//var ImageUrl = "https://electronics.local:9002";//图片地址

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
  MallCategoryTreeUrl: HybrisApiUrl + "miniprogram/b2c/mallHome/productCategoryTree",//商城首页商品类别树

  //商城购物车
  MallShowCartUrl: HybrisApiUrl + "miniprogram/b2c/cart/showCart",//商城购物车展示
  UpdateCartQtyUrl: HybrisApiUrl + "miniprogram/b2c/cart/updateCartQuantity",//商城更新或者删除购物车行
  AddCartEntryUrl: HybrisApiUrl + "miniprogram/b2c/cart/addCartEntry",//商城添加购物车行

  //商城购物车结算
  CheckoutAddressUrl: HybrisApiUrl + "miniprogram/b2c/checkout/address",//商城结算地址信息获取
  CheckoutShowCartUrl: HybrisApiUrl + "miniprogram/b2c/checkout/showCart",//商城结算购物车展示
  CheckoutAddressListUrl: HybrisApiUrl + "miniprogram/b2c/checkout/addressList",//商城结算地址信息列表
  CheckoutEditAddressUrl: HybrisApiUrl + "miniprogram/b2c/checkout/editAddress",//商城结算地址信息编辑
  CheckoutSaveAddressUrl: HybrisApiUrl + "miniprogram/b2c/checkout/saveAddress",//商城结算地址信息保存
  CheckoutRemoveAddressUrl: HybrisApiUrl + "miniprogram/b2c/checkout/removeAddress",//商城结算地址信息删除
  CheckoutSelectAddressUrl: HybrisApiUrl + "miniprogram/b2c/checkout/selectAddress",//商城结算地址信息选择
  CheckoutInvoiceUrl: HybrisApiUrl + "miniprogram/b2c/checkout/invoice",//商城结算发票信息
  CheckoutCommitInvoiceUrl: HybrisApiUrl + "miniprogram/b2c/checkout/commitInvoice",//商城结算发票信息提交
  CheckoutCancelInvoiceUrl: HybrisApiUrl + "miniprogram/b2c/checkout/cancelInvoice",//商城结算取消开票
  CheckoutPlaceOrderUrl: HybrisApiUrl + "miniprogram/b2c/checkout/placeOrder",//商城结算下单\

  //商城订单支付
  PaymentWeChatUrl: HybrisApiUrl + "miniprogram/b2c/payment/weChat",//商城微信支付
  PaymentQueryUrl: HybrisApiUrl + "miniprogram/b2c/payment/query",//商城支付信息查询
  PaymentCheckResultUrl: HybrisApiUrl + "miniprogram/b2c/payment/checkPayment",//商城支付结果

  //商城登录
  WeChatLogin: HybrisApiUrl + "miniprogram/b2c/login/loginByWeChat", //微信登录
  SmsLogin: HybrisApiUrl + "miniprogram/b2c/login/loginBySms", //短信登录
  SmsSend: HybrisApiUrl + "miniprogram/b2c/login/sendSms",//发送短信

  //商品
  ProductList:HybrisApiUrl +"miniprogram/b2c/product/products",//商品列表
  ProductDetail:HybrisApiUrl +"miniprogram/b2c/product/productDetail",//商品详情

  //商城个人中心
  MyOrder: HybrisApiUrl + "miniprogram/b2c/order/myOrder",//我的订单
  DeliveryInfo: HybrisApiUrl + "miniprogram/b2c/account/deliveryInfo",//物流列表
  DeliveryInfoDetail: HybrisApiUrl + "miniprogram/b2c/account/deliveryInfoDetail",//物流详情
  MyOrderDetail: HybrisApiUrl + "miniprogram/b2c/order/myOrderDetail",//我的订单详情
  AddOrderReviews: HybrisApiUrl + "miniprogram/b2c/order/addOrderReviews",//订单商品评论
  PersonCenter: HybrisApiUrl + "miniprogram/b2c/customer/returnCustomer",//个人中心
  EditCustomer:HybrisApiUrl + "miniprogram/b2c/customer/editCustomer",//编辑账号信息
  AddOrUpdateAddress:HybrisApiUrl + "miniprogram/b2c/account/addOrUpdateAddress",//添加或修改收货地址
  MyAddress:HybrisApiUrl + "miniprogram/b2c/account/getAddress",//收货地址列表
  DeleteAddress:HybrisApiUrl + "miniprogram/b2c/account/removeAddress",//删除收货地址
  PerfectInformation:HybrisApiUrl + "miniprogram/b2c/customer/perfectInformation",//保存完善信息
  ReturnPerfectInformation:HybrisApiUrl + "miniprogram/b2c/customer/returnPerfectInformation",//显示完善信息


  //退货退款服务
  AfterSaleServiceList: HybrisApiUrl + "miniprogram/b2c/afterSale/queryReturnRequests",//售后服务列表
  AfterSaleService: HybrisApiUrl + "miniprogram/b2c/afterSale/orderEntry",//申请售后服务
  SetReturnRequest: HybrisApiUrl + "miniprogram/b2c/afterSale/setReturnRequest",//填写售后申请服务
  UpdateReturnRequest: HybrisApiUrl + "miniprogram/b2c/afterSale/updateReturnRequest",//更新售后申请服务
  ReturnRequestDetail: HybrisApiUrl + "miniprogram/b2c/afterSale/returnRequest",//售后申请详情
  LogisticsSelect: HybrisApiUrl + "miniprogram/b2c/afterSale/logisticsSelect",//售后填写物流选择
  SaveLogistics: HybrisApiUrl + "miniprogram/b2c/afterSale/logistics",//售后填写物流保存
  CancelReturnRequest: HybrisApiUrl + "miniprogram/b2c/afterSale/cancelReturnRequest",//撤销售后申请

};
