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
      fail: function () {
        wx.showModal({
          title: '警告⚠️',
          content: '你确定不授权吗！',
          success: function (res) {
            if (res.confirm) {
              that.onLoad()
              wx.vibrateLong({})
            } else if (res.cancel) {
              wx.showToast({
                title: '晚了',
                icon: 'loading'
              })
            }
          },
          complete: function () {

          }
        })
      }
    })
  },
  getWeather: function (res) {
    const that = this
    let getData = {
      location: res.latitude + ',' + res.longitude
    }

    wc.get('', getData, (res) => {
      console.log(res.data)

      let data = res.data.HeWeather6[0]
      let { basic, now, update } = data
      let hourList = data.hourly
      let futureList = data.daily_forecast

      for (let i in futureList) {
        futureList[i].day = new Date(futureList[i].date).getDay()
      }

      let todayList = [futureList.shift()]

      for (let i in hourList) {
        // hourList[i].hour = hourList[i].time.split(' ')[1]
        hourList[i].hour = wc.getTime(hourList[i].time.split(' ')[1].split(':')[0])
      }

      // 加入现在的信息
      hourList.unshift({
        hour: '现在',
        cond_code: now.cond_code,
        tmp: now.tmp
      })

      that.setData({
        basic,
        now,
        todayList,
        hourList,
        futureList,
        update
      })
    })
  },
  onShareAppMessage: function () {

  }
})
