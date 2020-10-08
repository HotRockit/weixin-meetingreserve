// pages/my/register/register.js
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
    confirmPassword : "",
    phone : "",
    img: "../../../icons/unsee.png",
    isPassword : true,
    isPhone : false,
  },

  usernameInput : function (e) {
    var username = e.detail.value
    if (username!="" && this.data.password!="" && this.data.confirmPassword!="" && this.data.isPhone){
      this.setData({
        disabled : false,
        btnstate : "primary",
        username : username,
      });
    }else if (username!="" && (this.data.password=="" || this.data.confirmPassword=="" || !this.data.isPhone)){
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
    if (password!="" && this.data.username!="" && this.data.confirmPassword!="" && this.data.isPhone){
      this.setData({
        disabled : false,
        btnstate : "primary",
        password : password,
      });
    }else if (password!="" && (this.data.username=="" || this.data.confirmPassword=="" || !this.data.isPhone)){
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

  confirmPasswordInput : function(e){
    var password = e.detail.value
    if (password!="" && this.data.password!="" && this.data.confirmPassword!="" && this.data.isPhone){
      this.setData({
        disabled : false,
        btnstate : "primary",
        confirmPassword : password,
      });
    }else if (password!="" && (this.data.password=="" || this.data.confirmPassword=="" || !this.data.isPhone)){
      this.setData({
        disabled : true,
        btnstate : "default",
        confirmPassword : password,
      });
    }else{
      this.setData({
        disabled : true,
        btnstate : "default",
      });
    }
  },

  phoneInput : function(e){
    var phoneNumber = e.detail.value
    if (phoneNumber.length === 11) {
       this.checkPhoneNum(phoneNumber)
    }else{
      this.setData({
        disabled : true,
        btnstate : "default",
        isPhone : false,
      })
    }
  },

  
checkPhoneNum: function (phoneNumber) {
 
  var str = /^1[3456789]\d{9}$/
   
  if (str.test(phoneNumber)) {
    //手机号格式正确
    if(this.data.username!="" && this.data.password!="" && this.data.confirmPassword!=""){
      this.setData({
        disabled : false,
        btnstate : "primary",
        phone : phoneNumber,
        isPhone : true,
      })
     }else{
      this.setData({
        disabled : true,
        btnstate : "default",
        phone : phoneNumber,
        isPhone : true,
      })
     }
  } else {
    wx.showToast({
      title: '手机号格式不正确',
      icon : "none",
      duration : 1000,
    })
  }
},


  register : function(e){
    var page = this;   //这个是因为在request里面拿不到全局的data里面的值，所以这个保存这个this对象，在request里面使用
    if (this.data.username != "" && this.data.password != "" && this.data.confirmPassword != "" && this.data.phone != "" && this.data.password === this.data.confirmPassword && this.data.isPhone){
      wx-wx.request({
        url: 'http://'+app.globalData.host+':'+app.globalData.port+'/user/register',
        method : "GET",
        dataType : "json",
        data: {
          "username" : page.data.username,
          "password" : page.data.password,
          "phone" : page.data.phone,
        },
        success: (result) => {
          if(result.data.data==0){  //用户存在
            wx.showToast({
              title: '用户已存在',
              icon : 'none',
              duration : 1000
            })
          }else if(result.data.data==1){//操作失败
            wx.showToast({
              title: '注册失败，请重试',
              icon : 'none',
              duration : 1000
            })
          }else{   //注册成功   wx.redirectTo和wx.navigateTo不能跳转到tab页面
            wx.showToast({
              title: '注册成功',
              icon : 'success',
              duration : 1000,
              success:function(){ 
                setTimeout(function () { 
                  wx.redirectTo({
                    url: '../login/login',
                  })
                 }, 1000) 
             }
            })
          }
        },
        fail: (res) => {console.log(res)},
        complete: (res) => {},
      })
    }else if(this.data.username != "" && this.data.password != "" && this.data.confirmPassword != "" && this.data.phone != "" && this.data.password != this.data.confirmPassword){
      wx.showToast({
        title: '两次密码不一致',
        icon : 'none',
        duration : 1000
      })
    }else if(this.data.username != "" && this.data.password != "" && this.data.confirmPassword != "" && this.data.phone != "" && this.data.password === this.data.confirmPassword && !this.data.isPhone){
      wx.showToast({
        title: '手机号格式不对',
        icon : 'none',
        duration : 1000
      })
    }else{
      wx.showToast({
        title: '请将信息填写完整',
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