//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // leastDays: 3,
  },

  // onCalendarChange: function (e) {
  //   const startDate = new Date(e.detail.days[0]);
  //   const endDate = e.detail.days[1] ? new Date(e.detail.days[1]) : '';

  //   console.log(`选中 ${formatTime(startDate)} ~ ${endDate ? formatTime(endDate) : ''}，共 ${e.detail.count} 天`);
  // },

  //事件处理函数
  bindViewTap: function() {
   
  },
  date_select_change: function (e) {
    app.globalData.select_date = e.detail.select_date
    wx.navigateTo({
      url: '../my/room/room',
    })
  },
  onLoad: function () {
    this.selectComponent("#date_select").setDateRange('hello','time')   //这里就不传start_date和end_date了，就使用程序内置的事件（如果要传的话，两个正确的类型应该都是数字，代表当前时间的毫秒数,传事件格式也许,例如2020/9/9）
  },
})
