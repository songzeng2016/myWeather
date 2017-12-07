//index.js
//获取应用实例
const app = getApp()
const { wc } = app

Page({
  data: {
    weeks: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  },
  onLoad: function () {
    const that = this

    wx.getLocation({
      success: function (res) {
        console.log(res)

        that.getWeather(res)
      },
    })
  },
  getWeather: function (res) {
    const that = this
    let getData = {
      location: res.latitude + ',' + res.longitude
    }

    wc.get('', getData, (res) => {
      console.log(res)

      let data = res.data.HeWeather6[0]
      let basic = data.basic
      let now = data.now
      let futureList = data.daily_forecast

      for (let i in futureList) {
        futureList[i].day = new Date(futureList[i].date).getDay()
      }

      that.setData({
        basic,
        now,
        futureList
      })
    })
  }
})
