// components/date_select.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    select_room: '',
    room_range: []
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setRoomRange: function(rooms){
      if(rooms.length>0){
        this.setData({
          //默认选中第一个
          select_room : rooms[0].room_name, 
          room_range : rooms,
        })
      }else{
        this.setData({
          room_range : rooms,
        })
      }
      app.globalData.current_room = this.data.select_room
    },
    change: function(){
      this.triggerEvent('change', { select_room: this.data.select_room }, { })
    },
    tap: function(e){
      this.setData({select_room: e.currentTarget.id})
      this.change()
    },
  }
})
