//index.js
//获取应用实例
const app = getApp()
const { wc } = app

Page({
  data: {
  },
  onLoad: function () {
    const that = this

    wx.getLocation({
      success: function (res) {
        console.log(res)

        let getData = {
          location: res.latitude + ',' + res.longitude
        }
        wc.get('forecast', getData, (res) => {
          console.log(res)
          that.setData({
            futureList: res.data.HeWeather6[0].daily_forecast
          })
        })
      },
    })
  }
})
