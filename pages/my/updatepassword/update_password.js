// pages/updatepassword/update_password.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnstate: "default",
    disabled: true,
    username: "",
    password: "",
    newPassword : "",
    confirmNewPassword : "",
    img: "../../../icons/unsee.png",
    isPassword : true,
  },

  passwordInput : function(e){
    var password = e.detail.value
    if (password!="" && this.data.newPassword !="" && this.data.confirmNewPassword!=""){
      this.setData({
        disabled : false,
        btnstate : "primary",
        password : password,
      });
    }else if (password!="" && (this.data.newPassword =="" || this.data.confirmNewPassword=="")){
      this.setData({
        disabled : true,
        btnstate : "default",
        password : password,
      });
    }else{
      this.setData({
        disabled : true,
        btnstate : "default",
      });
    }
  },

  newPasswordInput : function(e){
    var password = e.detail.value
    if (password!="" && this.data.password !="" && this.data.confirmNewPassword!=""){
      this.setData({
        disabled : false,
        btnstate : "primary",
        newPassword : password,
      });
    }else if (password!="" && (this.data.password =="" || this.data.confirmNewPassword=="")){
      this.setData({
        disabled : true,
        btnstate : "default",
        newPassword : password,
      });
    }else{
      this.setData({
        disabled : true,
        btnstate : "default",
      });
    }
  },

  confirmNewPasswordInput : function(e){
    var password = e.detail.value
    if (password!="" && this.data.newPassword !="" && this.data.password!=""){
      this.setData({
        disabled : false,
        btnstate : "primary",
        confirmNewPassword : password,
      });
    }else if (password!="" && (this.data.password =="" || this.data.newPassword=="")){
      this.setData({
        disabled : true,
        btnstate : "default",
        confirmNewPassword : password,
      });
    }else{
      this.setData({
        disabled : true,
        btnstate : "default",
      });
    }
  },

  showPassword: function(e){
    if(this.data.img == "../../../icons/unsee.png"){
      this.setData({
        img : "../../../icons/see.png",
        isPassword : false,
      });
    }else{
      this.setData({
        img : "../../../icons/unsee.png",
        isPassword : true,
      });
    }
  },

  confirm : function(){
    if(this.data.password == "" || this.data.newPassword == "" || this.data.confirmNewPassword == ""){
      wx.showToast({
        title: '请将信息填写完整',
        icon : 'none',
        duration : 1000
      })
    }else if(this.data.password != app.globalData.password){
      wx.showToast({
        title: '原密码错误',
        icon : 'none',
        duration : 1000
      })
    }else if(this.data.newPassword != this.data.confirmNewPassword){
      wx.showToast({
        title: '新密码不一致',
        icon : 'none',
        duration : 1000
      })
    }else{
      var page = this
      wx-wx.request({
        url: 'http://'+app.globalData.host+':'+app.globalData.port+'/user/updatePassword',
        method : "GET",
        dataType : "json",
        data: {
          "username" : page.data.username,
          "password" : page.data.newPassword,
        },
        success: (result) => {
          if(result.data.data==0){  //操作失败
            wx.showToast({
              title: '操作失败',
              icon : 'none',
              duration : 1000
            })
          }else{
            wx.showToast({
              title: '修改成功',
              icon : 'none',
              duration : 1000,
              success:function(){ 
                setTimeout(function () { 
                  //这里要清理缓存，也就是登陆信息，这样跳转到登陆页面就不会自动登陆了
                  wx.clearStorage({
                    success: (res) => {
                      wx.redirectTo({
                        url: '../login/login',
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
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      username : app.globalData.username,
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