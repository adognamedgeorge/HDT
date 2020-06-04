const util = require('../../../utils/util');
const api = require('../../../config/api.js');

const app = getApp();

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
        source: "",
        selectId: "",
        addData: [],
        dialogShow: false,
        pk: "",
        buttons: [{text: '取消'}, {text: '确认'}],
        onbutton: [{text: '确认'}]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLoad: function (options) {
            let that = this;
            that.setData({
                source: options.source,
                selectId: options.selectId
            });
        },

        //添加收货地址
        addAddress() {
            if(this.data.addData.length<10){
                wx.navigateTo({
                    url: './addAddress/addAddress?source='+this.data.source+"&selectId="+this.data.selectId
                })
            }else{
                util.toast("最多添加10条地址");
            }
        },

        //编辑收货地址
        editAddress(e){
            var pk = e.currentTarget.dataset.pk;
            var defaults = e.currentTarget.dataset.default;
            var firstName = e.currentTarget.dataset.firstName;
            var cellphone = e.currentTarget.dataset.cellPhone;
            var line1 = e.currentTarget.dataset.line1;
            var regionName = e.currentTarget.dataset.regionName;
            var regionIso = e.currentTarget.dataset.regionIso;
            var cityName = e.currentTarget.dataset.cityName;
            var cityIso = e.currentTarget.dataset.cityIso;
            var distinctName = e.currentTarget.dataset.distinctName;
            var distinctIso = e.currentTarget.dataset.distinctIso;
            wx.navigateTo({
              url: './editAddress/editAddress?pk='+pk+"&firstName="+firstName+"&cellphone="
                  +cellphone+"&line1="+line1+"&regionName="+regionName+"&regionIso="+regionIso+"&cityName="
                  +cityName+"&cityIso="+cityIso+"&distinctName="+distinctName+"&distinctIso="+distinctIso+"&default="+defaults
                  +"&source="+this.data.source+"&selectId="+this.data.selectId
            })
        },

        //地址列表页面显示，调用数据查询接口
        onShow: function () {
            let that = this;
            util.request(api.MyAddress,
                {},
                'GET',
                'application/x-www-form-urlencoded'
            ).then((function (res) {
                if (res.success) {
                    //无数据，显示暂无收获地址
                    if(typeof(res.data) != 'undefined'){
                        that.setData({
                            addData: res.data
                        });
                    }
                } else {
                    util.toast("数据获取请求失败");
                }
            }));
        },

        //显示弹框
        showDialog(e) {
            this.setData({
                dialogShow: true,
                pk:e.currentTarget.dataset.pk
            })
        },

        //删除弹框提示
        tapDialogButton(e) {
            if (e.detail.index == 1) {
                this.delete(this.data.pk);
                this.setData({
                    dialogShow: false
                })
            } else {
                this.setData({
                    dialogShow: false
                })
            }
        },

        //删除地址
        delete: function (obj) {
            let that = this;
            util.request(api.DeleteAddress,
                {pk: obj},
                'GET',
                'application/x-www-form-urlencoded'
            ).then(function (res) {
                if (res.success) {
                    that.onShow();
                } else {
                    util.toast("收货地址删除失败");
                }
            })
        },

        //选择收货地址
        selectAddress: function (event) {
            let that = this;
            let id = event.currentTarget.dataset.id;
            if(that.data.source=="checkout"){
                console.log(id);
                util.request(api.CheckoutSelectAddressUrl,
                    {id : id},
                    'POST',
                    'application/x-www-form-urlencoded'
                ).then(function (res) {
                    if (res.success) {
                        wx.navigateBack({
                            url: '/pages/component/orderConfirm/orderConfirm',
                        })
                    } else {
                        util.toast("选择收货地址失败");
                    }
                });
            }
        }
    }
});
