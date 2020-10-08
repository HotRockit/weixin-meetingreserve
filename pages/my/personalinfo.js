// pages/my/personalinfo.js

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  tapFun : function(e){
    if(e.currentTarget.id=="child1"){
      wx.navigateTo({
        url: './reserveinfo/reserveinfo',
      })
    }else if(e.currentTarget.id=="child2"){
      wx.navigateTo({
        url: '../my/updatepassword/update_password',
      })
    }else if(e.currentTarget.id=="child3"){
      wx.showModal({
        title: '账户注销',
        content: '确定要注销账户吗?',
        success (res) {
          if (res.confirm) {
            wx-wx.request({
              url: 'http://'+app.globalData.host+':'+app.globalData.port+'/user/deleteUser',
              method : "GET",
              dataType : "json",
              data: {
                "username" : app.globalData.username,
              },
              success: (result) => {
                if(result.data.data==0){
                  wx.showToast({
                    title: '注销失败',
                    icon : 'none',
                    duration : 1000
                  })
                }else if(result.data.data==1){
                  wx.showToast({
                    title: '注销成功',
                    icon : 'success',
                    duration : 1000,
                    success:function(){ 
                      setTimeout(function () { 
                        wx.clearStorage({
                          success: (res) => {
                            wx.redirectTo({
                              url: './register/register',
                            })
                          },
                        })
                       }, 1000) 
                   }
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
    }else if(e.currentTarget.id=="child4"){
      wx.showModal({
        title: '清理缓存',
        content: '确定要清理缓存吗(包括你的登录信息)?',
        success (res) {
          if (res.confirm) {
            //清理缓存,也就是保存在本地的用户登陆信息
            wx.clearStorage({
              success: (res) => {
                wx.showToast({
                  title: '清理成功',
                  icon : 'success',
                  duration : 1000
                })
              },
              fail : (res) =>{
                wx.showToast({
                  title: '清理失败',
                  icon : 'none',
                  duration : 1000
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.showToast({
        title: '此功能正考虑加入',
        icon : 'none',
        duration : 2000
      })
    }
  },

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