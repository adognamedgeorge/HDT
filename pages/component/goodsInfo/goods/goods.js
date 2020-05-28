// pages/goodsInfo/goods/goods.js
// 计算属性
const computedBehavior = require('miniprogram-computed');
Component({
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    detail:{type:Object},
    imagePath:{type:String},
    cartNum:{type:String},
    isAddCart:{type: Boolean}
  },

  /**
   * 组件的初始数据
   */
  data: {
    isHid:true,
    setsData: [
      {
        title: '厨房电器套餐组合',
        price: 320,
        content: [
          {
            imgSrc: '../../../../resources/img/a.jpg',
            name: '九阳豆浆机',
            price: 320,
            delprice: 999
          },
          {
            imgSrc: '../../../../resources/img/b.png',
            name: '十阳豆浆机',
            price: 420,
            delprice: 699
          }
        ]
      },
      {
        title: '厨房电器套餐组合',
        price: 320,
        content: [
          {
            imgSrc: '../../../../resources/img/a.jpg',
            name: '九阳豆浆机',
            price: 320,
            delprice: 999
          },
          {
            imgSrc: '../../../../resources/img/b.png',
            name: '十阳豆浆机',
            price: 420,
            delprice: 699
          }
        ]
      },
      {
        title: '厨房电器套餐组合',
        price: 320,
        content: [
          {
            imgSrc: '../../../../resources/img/a.jpg',
            name: '九阳豆浆机',
            price: 320,
            delprice: 999
          },
          {
            imgSrc: '../../../../resources/img/b.png',
            name: '十阳豆浆机',
            price: 420,
            delprice: 699
          }
        ]
      },
      {
        title: '厨房电器套餐组合',
        price: 320,
        content: [
          {
            imgSrc: '../../../../resources/img/a.jpg',
            name: '九阳豆浆机',
            price: 320,
            delprice: 999
          },
          {
            imgSrc: '../../../../resources/img/b.png',
            name: '十阳豆浆机',
            price: 420,
            delprice: 699
          }
        ]
      }
    ],
    num: 1
  },

  computed: {
    sum (data) {
      return data.num
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showMoreCoupon () {
      this.setData({
        isHid: false
      })
    },
    close (e) {
      this.setData({
        isHid: true,
        isAddCart: true
      })
    },
    bindAddCart () {
      this.setData({
        isAddCart: false
      })
    },
    bindToOrderConfirm () {
      wx.navigateTo({
        url: '../../component/orderConfirm/orderConfirm'
      })
    },

    // 减
    minus () {
      let that = this
      if(that.data.num > 1) {
        that.setData({
          sum: that.data.num--
        })
      }
      console.log(that.data.sum)
    },
    // 加
    plus () {
      let that = this
      that.setData({
        sum: that.data.num++
      })
      console.log(that.data.sum)
    },
    addCart(event){
      let that = this
      this.triggerEvent('addCartEntry', {
        code: event.currentTarget.dataset.code,
        num:that.data.num
      })
    },
    toOrderConfirm(event){
      let that = this
      this.triggerEvent('toOrderConfirm', {
        code: event.currentTarget.dataset.code,
        num:1
      })
    },
    toCart(event){
      let that = this
      this.triggerEvent('toCart', {
      })
    },
  }
})
