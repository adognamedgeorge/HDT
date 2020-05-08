// pages/mall/sets/sets.js
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
    setsData: [
      {
        name: '欧舒丹套餐',
        setPrice: 599,
        delPrice: 899,
        content: [
          {imgSrc: '../../../resources/img/a.jpg', price: 100},
          {imgSrc: '../../../resources/img/a.jpg', price: 100},
          {imgSrc: '../../../resources/img/a.jpg', price: 100},
          {imgSrc: '../../../resources/img/a.jpg', price: 100},
          {imgSrc: '../../../resources/img/a.jpg', price: 100},
          {imgSrc: '../../../resources/img/a.jpg', price: 100}
        ]
      },
      {
        name: '厨房特惠套餐',
        setPrice: 699,
        delPrice: 999,
        content: [
          {imgSrc: '../../../resources/img/a.jpg', price: 100},
          {imgSrc: '../../../resources/img/a.jpg', price: 100},
          {imgSrc: '../../../resources/img/a.jpg', price: 100},
          {imgSrc: '../../../resources/img/a.jpg', price: 100},
          {imgSrc: '../../../resources/img/a.jpg', price: 100},
          {imgSrc: '../../../resources/img/a.jpg', price: 100}
        ]
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
