// pages/mine/myOrder/orderInfor/evaluate/evaluate.js
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
    files: [{
        error: true
    }],
    starColor: "#EBEBEB",
    onOff: true
  },

  onLoad () {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uploadFile: this.uploadFile.bind(this)
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
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

    // 评分
    changeColor (e) {
      if (this.data.onOff) {
        this.setData({
          starColor: 'orange',
          onOff: false
        })
      } else {
        this.setData({
          starColor: '#EBEBEB',
          onOff: true
        })
      }
    }
  }
})
