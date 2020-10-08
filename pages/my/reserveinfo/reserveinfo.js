// pages/my/reserveinfo/reserveinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select_date : "",
    select_room : "",
  },

  room_select_change : function(e){
    this.setData({
      select_room : e.detail.select_room,
    })
    this.initMeetingData()
  },

  date_select_change: function (e) {
    this.setData({
      select_date : e.detail.select_date,
    })
    this.initMeetingData()
  },

  initMeetingData : function(){
    //获取服务端会议记录
    var page = this
    wx-wx.request({
      url: 'http://'+app.globalData.host+':'+app.globalData.port+'/meeting/queryMeeting',
      method : "GET",
      dataType : "json",
      data: {
        "user" : app.globalData.username,
        "day" : page.data.select_date,
        "room" : page.data.select_room,
      },
      success: (result) => {
       this.selectComponent("#time_select").initData(result.data.data,false)
      },
      fail: (res) => {console.log(res)},
      complete: (res) => {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.selectComponent("#date_select").setDateRange('hello','time')   //这里就不传start_date和end_date了，就使用程序内置的事件（如果要传的话，两个正确的类型应该都是数字，代表当前时间的毫秒数,传事件格式也许,例如2020/9/9）
    //初始化会议室数据
    var page = this
    wx-wx.request({
      url: 'http://'+app.globalData.host+':'+app.globalData.port+'/meeting/queryMeetingRoom',
      method : "GET",
      dataType : "json",
      data: {
      },
      success: (result) => {
        this.selectComponent("#room_select").setRoomRange(result.data.data)
        page.setData({
          select_date : app.globalData.current_date,
          select_room : app.globalData.current_room,
        })
        this.initMeetingData()
      },
      fail: (res) => {console.log(res)},
      complete: (res) => {},
    })
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