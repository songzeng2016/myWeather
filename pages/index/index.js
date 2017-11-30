//index.js
//获取应用实例
const app = getApp()
const { wc } = app

Page({
  data: {
  },
  onLoad: function () {

    wx.getLocation({
      success: function (res) {
        console.log(res)

        let getData = {
          location: res.latitude + ',' + res.longitude
        }
        wc.get('forecast', getData, res => {

        })
      },
    })
  }
})
