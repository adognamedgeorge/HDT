// pages/goodsInfo/goods/goods.js
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
    isHid: true,
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
    ]
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
        isHid: true
      })
    }
  }
})
