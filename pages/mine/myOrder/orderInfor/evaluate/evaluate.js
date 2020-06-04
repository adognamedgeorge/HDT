// pages/mine/myOrder/orderInfor/evaluate/evaluate.js
const util = require('../../../../../utils/util.js');
const api = require('../../../../../config/api.js');
const user = require('../../../../../services/user.js');
Component({
    /**
    * 组件的属性列表
    */
    properties: {

    },

    /**
    * 组件的初始数据
    */
    data: {
        imagePath: api.ImageUrl,
        files: [{
            error: true
        }],
        orderDetail:null,
        orderCode:"",
    },
    /**
    * 组件的方法列表
    */
    methods: {
        onLoad (options) {
            this.setData({
                orderCode:options.code,
                selectFile: this.selectFile.bind(this),
                uploadFile: this.uploadFile.bind(this)
            });
            this.getOrderDetail();
        },
        chooseImage: function (e) {
            var that = this;
            wx.chooseImage({
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    that.setData({
                        files: that.data.files.concat(res.tempFilePaths)
                    });
                    console.log(files)
                }
            })
        },
        previewImage: function(e){
            wx.previewImage({
                current: e.currentTarget.id, // 当前显示图片的http链接
                urls: this.data.files // 需要预览的图片http链接列表
            })
        },
        selectFile(files) {
            console.log('files', files)
            // 返回false可以阻止某次文件上传
        },
        uploadFile(files) {
            console.log('upload files', files)
            // 文件上传的函数，返回一个promise
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject('some error')
                }, 1000)
            })
        },
        uploadError(e) {
            console.log('upload error', e.detail)
        },
        uploadSuccess(e) {
            console.log('upload success', e.detail)
        },
        commentInput(event){
            let that=this;
            let comment = event.detail.value;
            let entryNumber = event.currentTarget.dataset.item;
            for(let i = 0;i<this.data.orderDetail.entries.length;i++) {
                let item = this.data.orderDetail.entries[i];
                if (item.entryNumber == entryNumber) {
                    item.comment= comment;
                }
            }
            that.setData({
                orderDetail: that.data.orderDetail,
            });
        },
        //物流评分
        changeLogisticsRating(event){
            let that=this;
            let entryNumber = event.currentTarget.dataset.item;
            for(let i = 0;i<this.data.orderDetail.entries.length;i++) {
                let item = this.data.orderDetail.entries[i];
                if (item.entryNumber == entryNumber) {
                    item.logisticsRating= event.currentTarget.dataset.num;
                }
            }
            that.setData({
                orderDetail: that.data.orderDetail,
            });
        },
        //商品评分
        changeProductRating(event){
            let that=this;
            let entryNumber = event.currentTarget.dataset.item;
            for(let i = 0;i<this.data.orderDetail.entries.length;i++) {
                let item = this.data.orderDetail.entries[i];
                if (item.entryNumber == entryNumber) {
                    item.productRating= event.currentTarget.dataset.num;
                }
            }
            that.setData({
                orderDetail: that.data.orderDetail,
            });
        },
        //获取订单详细信息
        getOrderDetail(){
            let that = this;
            util.request(api.MyOrderDetail,
                {code:that.data.orderCode},
                'GET',
                'application/x-www-form-urlencoded'
            ).then((function (res) {
                if(res.success){
                    for(let i = 0;i<res.datas.entries.length;i++) {
                        let item = res.datas.entries[i];
                        item.logisticsRating=5;
                        item.productRating=5;
                        item.comment="";
                    }
                    that.setData({
                        orderDetail: res.datas,
                    });
                }else{
                    console.log(res.msg);
                }
            }));
        },
        addOrderReviews(){
            let that = this;
            for(let i = 0;i<this.data.orderDetail.entries.length;i++) {
                let item = this.data.orderDetail.entries[i];
                if (item.comment.length<5) {
                    util.toast("评论不能少于5个字", false);
                    return;
                }
            }
            user.checkLogin().then((function (res) {
                if (res) {
                    wx.showLoading({title: 'loading'});
                    util.request(api.AddOrderReviews,
                        {
                            orderCode:that.data.orderDetail.code,
                            productReviewsParamsList:that.data.orderDetail.entries
                        },
                        'POST',
                    ).then((function (res) {
                        wx.hideLoading();
                        if(res.success){
                            wx.navigateBack({
                                delta: 1
                            });
                        }else{
                            console.log(res.msg);
                            util.toast(res.msg, false);
                        }
                    }));
                }else {
                    //跳转到登录页面
                    wx.navigateTo({
                        url: '/pages/login/login',
                    });
                }
            }));
        }
    }
})
