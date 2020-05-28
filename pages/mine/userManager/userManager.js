// pages/mine/userManager/userManager.js
const app = getApp()
const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
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
    radioData: [
      {value: 'MALE', name: '男'},
      {value: 'FEMALE', name: '女'}
    ],
    male: '',
    birthday: '',
    userImg: '',
    nickName: '',
    realName: '',
    phone: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // radioChange (e) {
    //   const items = this.data.radioData
    //   for (let i = 0, len = items.length; i < len; ++i) {
    //     items[i].checked =items[i].value === e.detail.value
    //   }
    //   this.setData({
    //     items
    //   })
    // },
    bindDateChange (e) {
      this.setData({
        birthday: e.detail.value
      })
    },

    formSubmit (e) {
      console.log(e.detail.value)
      util.request(api.EditCustomer,
        e.detail.value,
        'POST',
        'application/json;charset=utf-8'
    ).then((function (res) {
      if(res.success){
       //跳转到登录页面
         wx.navigateBack({
           url: '../../mine/mine',
         });
      }else{
        util.toast("更新失败");
      }
    }));
    },
    onLoad: function () {
      // 从父组件mine获取头像等数据
      // const eventChannel = this.getOpenerEventChannel()
      // var that = this
      // eventChannel.on('acceptDataFromOpenPage', function (data) {
      //   console.log(data.data)
      //   if (data.data) {
      //     that.setData({
      //       nickName: data.data.nickName,
      //       userImg: data.data.avatarUrl
      //     })
      //   } else {
      //     that.setData({
      //       nickName: '暂无',
      //       userImg: ''
      //     })
      //   }
      // })
    },


    onShow:function(){
      let that = this;
      util.request(api.PersonCenter,
        {
        },
        'GET',
        'application/x-www-form-urlencoded'
    ).then((function (res) {
      if(res.success){
        var wxPicture = res.customerDate.wxPicture;
        if (wxPicture == '' || typeof(wxPicture) == 'undefined') {
          wxPicture = '../../../resources/img/black.jpeg';
        }
        that.setData({
          userImg: wxPicture,
          nickName: res.customerDate.name,
          realName: res.customerDate.realName,
          phone: res.customerDate.phone,
          male: res.customerDate.gender,
          birthday: res.customerDate.birthday
        });
      }else{
        console.log(res.msg);
      }
    }));
    }
  }
})
