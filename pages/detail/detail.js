var dataArray = new Array();
var newDataArray = new Array();
var list = new Array();
Page({
  onLoad: function(options) {
    var that = this
    // https://b2b.ezparking.com.cn/rtpi-service/parking?type=status&key=4tj2bDvzSDHb
    wx.request({
      url: '',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'application/json' }, // 设置请求的 header
      success: function(res){
        // success
        dataArray = res.data;

        for (var i = 0; i < dataArray.length; i ++) {
          var parkInfo = {
            address: "",
            aviPlaces: "",
            name: "",
            id: "",
            photo: "",
            url: "",
            count: ""
          }
          // 赋值
          var dic = dataArray[i];
          parkInfo.address = dic.address;
          parkInfo.aviPlaces = dic.availablePlaces;
          parkInfo.name = dic.name;
          parkInfo.id = dic.id;
          parkInfo.photo = dic.photo;
          parkInfo.url = "https:///parking?key=P01890EQ52678RTX&type=photo&id="+dic.id+"&file="+dic.photo;
          parkInfo.count = i;
          // 添加数组元素.
          newDataArray.push(parkInfo)
        }
        console.log(newDataArray)

        that.setData(
          {list: newDataArray}
        )
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    
  }
})