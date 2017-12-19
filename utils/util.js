const [HOST, KEY] = ['https://free-api.heweather.com/s6/weather/', 'df1ccd019dd0493a92fa681497b8d490']

class wc {
  constructor() {
    this.host = HOST
    this.key = KEY
  }

  get(type, data, success) {
    data.key = this.key
    wx.request({
      url: this.host + type,
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
