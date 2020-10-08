// pages/my/time/time.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnstate: "default",
    disabled: true,
    start_time : -1,
    end_time : -2,
    realTimeList : ["","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30",
  "16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00"],
  },

  reserve : function(){
    wx.navigateTo({
      url: '../reserve/reserve?time='+this.data.realTimeList[this.data.start_time+1]+'---'+this.data.realTimeList[this.data.end_time+2]+'&start_time='+this.data.start_time+'&end_time='+this.data.end_time,
    })
  },

  time_select_change : function(e){
    if(e.detail.start_time != -1 && e.detail.end_time != -2){
      this.setData({
        start_time : e.detail.start_time,
        end_time : e.detail.end_time,
        btnstate : "primary",
        disabled : false,
      })
    }else{
       this.setData({
        start_time : e.detail.start_time,
        end_time : e.detail.end_time,
        btnstate : "default",
        disabled : true,
       })
    }
  },

  // room_select_change : function(e){
  //   console.log(e.detail.select_room)
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    //获取服务端会议记录
    wx-wx.request({
      url: 'http://'+app.globalData.host+':'+app.globalData.port+'/meeting/queryMeeting',
      method : "GET",
      dataType : "json",
      data: {
        "user" : "",
        "day" : app.globalData.select_date,
        "room" : app.globalData.select_room,
      },
      success: (result) => {
       this.selectComponent("#time_select").initData(result.data.data,true)
      },
      fail: (res) => {console.log(res)},
      complete: (res) => {},
    })
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