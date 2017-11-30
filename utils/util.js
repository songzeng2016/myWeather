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
}

export default wc
