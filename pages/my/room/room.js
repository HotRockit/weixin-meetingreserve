// pages/my/room/room.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomList : [],
    parseRoomList: [],
  },

  //请求结果返回的是一个对象数组，展示的时候我们每行固定两个，这是就可以将返回的一维数组转换为二维数组,这里返回的是对象数组和值类型数组操作还不一样
  parseArray : function(array){
    let len = array.length
    let n = 3   //每行显示三个
    let lineNum = len % n ===0 ? len/n : Math.floor((len/n)+1)
    let res = []
    for(let i=0; i < lineNum;i++){
      let tmp = array.slice(i*n,i*n+n)
      res.push(JSON.parse(JSON.stringify(tmp)))
    }
    return res
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取服务端会议室数据
    wx-wx.request({
      url: 'http://'+app.globalData.host+':'+app.globalData.port+'/meeting/queryMeetingRoom',
      method : "GET",
      dataType : "json",
      data: {
      },
      success: (result) => {
       this.setData({
         roomList : result.data.data,
         parseRoomList : this.parseArray(result.data.data)
       })
      },
      fail: (res) => {console.log(res)},
      complete: (res) => {},
    })
  },

  room_tap : function(e){
    if(e.currentTarget.id==""){
      wx.showToast({
        title: '此会议室不存在，请重新选择',
        icon : 'none',
        duration : 1000
      })
    }else{
      app.globalData.select_room = e.currentTarget.id
      wx.navigateTo({
        url: '../time/time',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})