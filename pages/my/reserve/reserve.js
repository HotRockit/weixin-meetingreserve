// pages/my/reserve/reserve.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select_room : "",
    select_date : "",
    username : "",
    reason : "",
    time : "",
    start_time : -1,
    end_time : -2,
    btnstate: "default",
    disabled: true,
  },

  textInput : function(e){
    var value = e.detail.value
    if(value != ""){
      this.setData({
        reason : value,
        disabled : false,
        btnstate : "primary",
      })
    }else{
      this.setData({
        disabled : true,
        btnstate : "default",
      })
    }
  },

  addMeeting : function(){
    if(this.data.reason==""){
      wx.showToast({
        title: '请填写申请原因',
        icon : 'none',
        duration : 1000
      })
    }else{
      var page = this
      wx.showModal({
        title: '会议预定',
        content: '确定要预约上述会议室?',
        success (res) {
          if (res.confirm) {
            //其实这里隐藏了一个Bug，如果一个用户在你打开选择时间界面之后，还在你提交预定之前完成预约，而且你们俩的时间还有冲突的话
            //这时就会出现问题，所以最还在提交之前再次验证，如果没问题就继续预定，如果有问题，就返回到时间页面，重新选择时间
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
                var meetings = result.data.data
                var flag = false
                for(var i=0;i<meetings.length;i++){
                  //这种情况说明被占用了
                  if((page.data.start_time>=meetings[i].start_time&&page.data.start_time<=meetings[i].end_time)||
                  (page.data.end_time>=meetings[i].start_time&&page.data.end_time<=meetings[i].end_time)){
                    flag = true
                    break
                  }
                }
                //给用户提示，然后跳转到时间界面重新选择
                if(flag){
                  wx.showToast({
                    title: '此时间段在你操作期间已被预定',
                    icon : 'none',
                    duration : 1000,
                    success:function(){ 
                      setTimeout(function () { 
                        wx.redirectTo({
                          url: '../time/time',
                        })
                       }, 1000) 
                   } 
                  })
                }else{
                   //验证完之后再提交预定
                  wx-wx.request({
                    url: 'http://'+app.globalData.host+':'+app.globalData.port+'/meeting/addMeeting',
                    method : "GET",
                    dataType : "json",
                    data: {
                      "meetingRoomName" : page.data.select_room,
                      "user" : page.data.username,
                      "start" : page.data.start_time,
                      "end" : page.data.end_time,
                      "reason" : page.data.reason,
                      "borrow" : page.data.select_date,
                    },
                    success: (result) => {
                      if(parseInt(result.data.data)===1){
                        wx.showToast({
                          title: '预约成功',
                          icon : 'success',
                          duration : 1000,
                          success:function(){ 
                            setTimeout(function () { 
                              wx.redirectTo({
                                url: '../time/time',
                              })
                             }, 1000) 
                         } 
                        })
                      }else{
                        wx.showToast({
                          title: '操作失败',
                          icon : 'success',
                          duration : 1000
                        })
                      }
                    },
                    fail: (res) => {console.log(res)},
                    complete: (res) => {},
                  })
                }
              },
              fail: (res) => {console.log(res)},
              complete: (res) => {},
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      select_room : app.globalData.select_room,
      select_date : app.globalData.select_date,
      username : app.globalData.username,
      time : options.time,
      start_time : options.start_time,
      end_time : options.end_time,
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