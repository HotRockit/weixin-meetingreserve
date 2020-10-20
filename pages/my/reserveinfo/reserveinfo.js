// pages/my/reserveinfo/reserveinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select_date : "",
    select_room : "",
    meetings : [],
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

  meeting_delete: function (e) {
    var index = e.detail.index
    var page = this
    let i
    wx.showModal({
      title: '取消会议',
      content: '确定要取消这个会议吗?',
      success (res) {
        if (res.confirm) {
          //判断选中的是哪个会议记录
          for(i=0;i<page.data.meetings.length;i++){
            if(index>=page.data.meetings[i].start_time && index<=page.data.meetings[i].end_time){  //判断选中的是这个会议
              wx-wx.request({
                url: 'http://'+app.globalData.host+':'+app.globalData.port+'/meeting/deleteMeeting',
                method : "GET",
                dataType : "json",
                data: {
                  "meeting_id" : page.data.meetings[i].meeting_id,
                },
                success: (result) => {
                  if(result.data.data==1){
                    wx.showToast({
                      title: '删除成功',
                      icon : 'success',
                      duration : 1000,
                      success:function(){ 
                        setTimeout(function () { 
                          page.initMeetingData()
                        }, 1000) 
                    }
                    })
                  }else{
                    wx.showToast({
                      title: '删除失败',
                      icon : 'none',
                      duration : 1000,
                    })
                  }
                },
                fail: (res) => {console.log(res)},
                complete: (res) => {},
              })
              return
            }
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
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
        page.setData({
          meetings : result.data.data,
        })
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