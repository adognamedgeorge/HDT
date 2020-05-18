// pages/mine/userManager/userManager.js
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
      {value: 'boy', name: '男'},
      {value: 'girl', name: '女'}
    ],
    date: '请选择生日',
    userImg: '',
    nickName: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    radioChange (e) {
      const items = this.data.radioData
      for (let i = 0, len = items.length; i < len; ++i) {
        items[i].checked =items[i].value === e.detail.value
      }
      this.setData({
        items
      })
    },
    bindDateChange (e) {
      this.setData({
        date: e.detail.value
      })
    },

    saveUserInfor () {
      util.request(
        api.apiUrl + 'miniprogram/b2c/customer/editCustomer',
        {
          "birthday": "2019-12-12",
          "gender": "MALE",
          "phone": "123456789",
          "realName": "",
          "userId": "",
          "wxNickname": "Edward"
        },
        "POST",
        "application/x-www-form-urlencoded",
        {
          success (res) {
            console.log(res)
          }
        }
      )
    },

    onLoad: function () {
      // 从父组件mine获取头像等数据
      const eventChannel = this.getOpenerEventChannel()
      var that = this
      eventChannel.on('acceptDataFromOpenPage', function (data) {
        console.log(data.data)
        if (data.data) {
          that.setData({
            nickName: data.data.nickName,
            userImg: data.data.avatarUrl
          })
        } else {
          that.setData({
            nickName: '暂无',
            userImg: ''
          })
        }
      })
    }
  }

})
