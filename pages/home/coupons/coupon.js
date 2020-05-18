Page({
  data: {
    loading: false,
    couponData: []
  },
  onReady: function() {
    this.getData()
  },
  // 下拉刷新
  onRefresh() {
    if (this._freshing) return
    this._freshing = true
    setTimeout(() => {
      console.log("我刷新好了")
      // 数据请求后，triggered设置为false会回弹回去
      this.setData({
        triggered: false,
      })
      this._freshing = false
    }, 3000)
  },
  // 上拉加载
  scrollToLower: function (e) {
    console.log(this.data.loading)
    if (!this.data.loading){
      this.setData({
        pageNo: this.data.pageNo + 1
      })
      this.getData();
    }
  },
  getData: function() {
    var data = [
      {
        price: 20,
        full: 199,
        title: '夏日优惠券通用',
        txt: '全场通用',
        time: '2019.09.20-2020.03.25',
        type: 0
      },
      {
        price: 50,
        full: 399,
        title: '冬日日优惠券通用',
        txt: '限时使用',
        time: '2019.09.20-2020.04.25',
        type: 1
      },
      {
        price: 10,
        full: 99,
        title: '春日优惠券通用',
        txt: '全场不通用',
        time: '2020.02.20-2020.03.25',
        type: 2
      },
      {
        price: 20,
        full: 199,
        title: '夏日优惠券通用',
        txt: '全场通用',
        time: '2019.09.20-2020.03.25',
        type: 0
      },
      {
        price: 50,
        full: 399,
        title: '冬日日优惠券通用',
        txt: '限时使用',
        time: '2019.09.20-2020.04.25',
        type: 1
      },
      {
        price: 10,
        full: 99,
        title: '春日优惠券通用',
        txt: '全场不通用',
        time: '2020.02.20-2020.03.25',
        type: 2
      },
      {
        price: 20,
        full: 199,
        title: '夏日优惠券通用',
        txt: '全场通用',
        time: '2019.09.20-2020.03.25',
        type: 0
      },
      {
        price: 50,
        full: 399,
        title: '冬日日优惠券通用',
        txt: '限时使用',
        time: '2019.09.20-2020.04.25',
        type: 1
      },
      {
        price: 10,
        full: 99,
        title: '春日优惠券通用',
        txt: '全场不通用',
        time: '2020.02.20-2020.03.25',
        type: 2
      },
      {
        price: 20,
        full: 199,
        title: '夏日优惠券通用',
        txt: '全场通用',
        time: '2019.09.20-2020.03.25',
        type: 0
      },
      {
        price: 50,
        full: 399,
        title: '冬日日优惠券通用',
        txt: '限时使用',
        time: '2019.09.20-2020.04.25',
        type: 1
      },
      {
        price: 10,
        full: 99,
        title: '春日优惠券通用',
        txt: '全场不通用',
        time: '2020.02.20-2020.03.25',
        type: 2
      }
    ]
    // 设置全局loading,请求数据前设置为true，等待数据返回后设置为false才能进行下一次请求
    if (!this.data.loading) {
      this.setData({
        loading: false,
        couponData: this.data.couponData.concat(data)
      })
    }
  }
})