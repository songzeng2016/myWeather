const [HOST, KEY] = ['https://free-api.heweather.com/s6/weather', 'df1ccd019dd0493a92fa681497b8d490']
const payHost = 'https://api.heweather.net/s6/weather'

class wc {
  constructor() {
    this.host = HOST
    this.key = KEY
    this.payHost = payHost
  }

  get(type, data, success, isPay) {
    data.key = this.key
    wx.request({
      url: (isPay ? this.payHost : this.host) + type,
      data,
      success: res => {
        typeof success === 'function' && success(res)
      }
    })
  }

  getTime(time) {
    if (!time) {
      return
    }

    time = parseInt(time)

    if (time > 12) {
      return '下午' + (time - 12) + '时'
    } else {
      return '上午' + time + '时'
    }
  }
}

export default wc
