// pages/component/bill/bill.js
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
    typeArr: ['电子普通发票', '纸质增值税专用发票'],
    idx: 0,
    items: [
      {name: 'enterprise', value: '企业单位', checked: 'true'},
      {name: 'personal', value: '个人/非企业单位'}
    ],
    idx2: 0,
    cellsData: [
      {title: '*发票抬头', footer: '填写发票抬头'},
      {title: '*发票税号', footer: '纳税人识别号'},
      {title: '*发票内容', footer: '商品明细'},
      {title: '*单位地址', footer: '填写单位地址'},
      {title: '*电话号码', footer: '填写电话号码'},
      {title: '*开户银行', footer: '填写开户银行'},
      {title: '*银行账号', footer: '填写银行账户'}
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择发票类型
    bindPickerChange (e) {
      console.log(e.detail)
      this.setData({
        idx: e.detail.value
      })
    },
    // 选择抬头类型
    radioChange (e) {
      console.log(e)
      // const items = this.data.items
      // for (let i = 0, len = items.length; i < len; ++i) {
      //   items[i].checked = items[i].value === e.detail.value
      // }

      // this.setData({
      //   items
      // })
    }
  }
})
