// pages/my/login/login.js
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
    img: "../../../icons/unsee.png",
    isPassword : true
  },

  usernameInput : function (e) {
    var username = e.detail.value
    // console.log(username)
    if (username!="" && this.data.password!=""){
      this.setData({
        disabled : false,
        btnstate : "primary",
        username : username,
      });
    }else if(username!="" && this.data.password==""){
      this.setData({
        disabled : true,
        btnstate : "default",
        username : username,
      });
    }else{
      this.setData({
        disabled : true,
        btnstate : "default",
      });
    }
  },

  passwordInput : function(e){
    var password = e.detail.value
    if (password!="" && this.data.username!=""){
      this.setData({
        disabled : false,
        btnstate : "primary",
        password : password,
      });
    }else if(password!="" && this.data.username==""){
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

  login : function(e){
    var page = this;   //这个是因为在request里面拿不到全局的data里面的值，所以这个保存这个this对象，在request里面使用
    if (this.username != "" && this.password != ""){
      wx-wx.request({
        url: 'http://'+app.globalData.host+':'+app.globalData.port+'/user/login',
        method : "GET",
        dataType : "json",
        data: {
          "username" : page.data.username,
          "password" : page.data.password,
        },
        success: (result) => {
          if(result.data.data.username==""){  //没有此用户
            wx.showToast({
              title: '用户名或密码错误',
              icon : 'none',
              duration : 1000
            })
          }else if(result.data.data.state==1){  //账号被冻结了
            wx.showToast({
              title: '账号已被冻结',
              icon : 'none',
              duration : 1000
            })
          }else{   //登陆成功   wx.redirectTo和wx.navigateTo不能跳转到tab页面
            //登陆完成之后将用户信息保存在本地，下次就不用登陆了
            wx.setStorage({
              data: result.data.data.username,
              key: 'username',
            })
            wx.setStorage({
              data: result.data.data.password,
              key: 'password',
            })
            wx.showToast({
              title: '登陆成功',
              icon : 'success',
              duration : 1000,
              success:function(){ 
                setTimeout(function () { 
                  app.globalData.username = page.data.username
                  app.globalData.password = page.data.password
                  wx.switchTab({
                    url: '../../index/index',
                  })
                 }, 1000) 
             }
            })
          }
        },
        fail: (res) => {console.log(res)},
        complete: (res) => {},
      })
    }else{
      wx.showToast({
        title: '用户名和密码不能为空',
        icon : 'none',
        duration : 1000
      })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var page = this
    wx.getStorage({
      key: 'username',
      success (res) {
        page.setData({
          username : res.data,
        })
        wx.getStorage({
          key: 'password',
          success (res) {
            page.setData({
              password : res.data,
            })
            wx.showToast({
              title: '登陆成功',
              icon : 'none',
              duration : 1000,
              success:function(){ 
                setTimeout(function () { 
                  app.globalData.username = page.data.username
                  app.globalData.password = page.data.password
                  wx.switchTab({
                    url: '../../index/index',
                  })
                 }, 1000) 
             }
            }) 
          }
        })
      }
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