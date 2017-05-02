
//index.js
//获取应用实例
var app = getApp()
var dataArray = new Array()
Page({
  data: {  
  // 标注的数组
  markers: [],
  controls: [{
      id: 2000,
      iconPath: '/pages/images/tuijian.png',
      position: {
        left: 375 - 120,
        top: 50,
        width: 100,
        height: 40
      },
      clickable: true
    }]
  },
  // header: {'content-type': 'application/json'}
  onLoad: function () {
    var that = this
    this.animation = wx.createAnimation()
    // 调用网络请求, 请求停车场数据
    // list: [{ header: '今日热闻' }].concat(res.data.stories)
   wx.request({
     url: 'https://b2b.ezparking.com.cn/rtpi-service/parking?type=status&key=4tj2bDvzSDHb',
     data: {},
     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     header: { 'content-type': 'application/json' }, // 设置请求的 header
     success: function(res){
       // success
      dataArray = res.data // 数据数组
      var markers = new Array()
      for (var i = 0; i < dataArray.length; i ++)
      {
        var dic = dataArray[i]
        // console.log(dic.coordinateAmap) // 得到高德经纬度坐标点字符串
        var info = 
        {
            iconPath: "",
            id: 0,
            latitude: 31.237524,
            longitude: 121.5128895,
            width: 25,
            height: 25,
            name: ""
        };
        info.id = i
        info.width = 25
        info.height = 25
        // 通过 , 号分割
        var arrLongLa = new Array()
        arrLongLa = dic.coordinateAmap.split(",")
        var longitude = arrLongLa[0]
        var latitude = arrLongLa[1]
        // 赋值相关信息
        info.latitude = latitude
        info.longitude = longitude
        info.name = dic.address
        // 状态判断
        if (dic.status == "空")
        {
          info.iconPath = "/pages/images/markers_icon3.png"
        }else if (dic.status == "忙") {
          info.iconPath = "/pages/images/markers_icon1.png"
        }else if (dic.status == "满") {
          info.iconPath = "/pages/images/markers_icon2.png"
        }else if (dic.status == "关") {
        }else {
          info.iconPath = "/pages/images/markers_icon5.png"
          }
          // 添加进数组
          markers.push(info)
        }
        console.log(markers)
        that.setData(
          {markers: markers}
        )
     },
     fail: function() {
       // fail
     },
     complete: function() {
       // complete
     }
   })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {

    // 点击相应的坐标点取出相应的信息
    console.log(dataArray[e.markerId])
    console.log(e.markerId)
    this.animation.translate(Math.random() * 100 - 50, Math.random() * 100 - 50).step()
    this.setData({ animation: this.animation.export() })
    console.log('哈哈哈哈哈哈哈')
    
  },
  controltap(e) {
    console.log(e.controlId)
    switch (e.controlId)
    {
      case 2000:
            console.log('点击了推荐停车场')
            wx.navigateTo({
              url: '../detail/detail',
              success: function(res){
                // success
              },
              fail: function() {
                // fail
              },
              complete: function() {
                // complete
              }
            })
            break
      default: break
    }
  },
})

