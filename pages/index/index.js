Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    imgs: [
      { url:'https://lyh.songdewei.com/storage/image/2018/05/kN9Sd7g0qDauXAobSkSLH06vpTRHQlIZvE5OH9G2.jpeg'},
      { url: 'https://lyh.songdewei.com/storage/image/2018/05/ahLyyicz04EcWEX8yB4PCIjRQkUeWkKJe3EpGpgp.jpeg' }
    ],
    server: "https://lyh.songdewei.com",
    news: [
      { title: '一篇文章', createdTime: '2018-06-05', image: 'image/2018/03/Ujf2hWIxxZXtBQTXl6YsLsAzddShS7T1UuCbetGr.jpeg', view_num: '0', comment_num:'0'},
      { title: '一篇文章', createdTime: '2018-06-05', image: 'image/2018/03/Ujf2hWIxxZXtBQTXl6YsLsAzddShS7T1UuCbetGr.jpeg', view_num: '0', comment_num: '0' },
      { title: '一篇文章', createdTime: '2018-06-05', image: 'image/2018/03/Ujf2hWIxxZXtBQTXl6YsLsAzddShS7T1UuCbetGr.jpeg', view_num: '0', comment_num: '0' },
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    menus: [
      {
        title: '盘联新闻',
        img: '../../asset/img/mobile/news.png',
        url: '../index/index'
      },
      {
        title: '部门招新',
        img: '../../asset/img/mobile/zhaoxin.png',
        url: '../index/index'
      },
      {
        title: '活动招募',
        img: '../../asset/img/mobile/zhaomu.png',
        url: '../index/index'
      },
      {
        title: '工作机会',
        img: '../../asset/img/mobile/zhaopin.png',
        url: '../index/index'
      },
      {
        title: '加入联谊会',
        img: '../../asset/img/mobile/jiaru.png',
        url: '../index/index'
      },
      {
        title: '联谊会达人',
        img: '../../asset/img/mobile/daren.png',
        url: '../index/index'
      },
      {
        title: '合作伙伴',
        img: '../../asset/img/mobile/hezuo.png',
        url: '../index/index'
      },
      {
        title: '组织架构',
        img: '../../asset/img/mobile/zuzhi.png',
        url: '../index/index'
      }
    ]
  },
  onLoad: function () {
    // this.getImgs()
    // this.getNews()
  },
  changeProperty: function (e) {
    var propertyName = e.currentTarget.dataset.propertyName
    var newData = {}
    newData[propertyName] = e.detail.value
    this.setData(newData)
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  getImgs: function () {
    var the = this
    wx.request({
      url: getApp().globalData.servers + '/getImgs',
      data: {
        currentPage: 2
      },
      success: function (res) {
        // console.log(res)
        var data = res.data.data
        the.setData({
          imgs: data
        })
        // console.log(the.data.imgs)
      }
    })
  },
  turnTime(t) {
    var time = new Date(t)
    var now = new Date()
    var res = ''
    if (now.getFullYear() != time.getFullYear()) {
      res = time.getFullYear() + '-' + (time.getMonth() < 9 ? ('0' + (time.getMonth() + 1)) : (time.getMonth() + 1)) + '-' + time.getDate()
    } else {
      if (now.getMonth() != time.getMonth()) {
        res = (time.getMonth() < 9 ? ('0' + (time.getMonth() + 1)) : (time.getMonth() + 1)) + '-' + time.getDate()
      } else {
        res = (now - time) / 86400000 + '天前'
      }
    }
    return res

  },
  getNews: function (page = 1) {
    var the = this
    wx.request({
      url: getApp().globalData.servers + '/getNews',
      data: {
        currentPage: page
      },
      success: function (res) {
        console.log(res)
        var data = res.data.data
        for (var i = 0; i < data.length; i++) {
          console.log(data[i].created_at)
          data[i].createdTime = the.turnTime(data[i].created_at * 1000)
        }
        the.setData({
          news: data
        })
        console.log(the.data.news)
      }
    })
  }
})
