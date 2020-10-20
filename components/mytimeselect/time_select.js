// components/mytimeselect/time_select.js

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
    timeList : ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"],
    colorList:["azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure",
    "azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure",],
    tapList: [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,
      true,true,true,true,true,true,true,true,true,true,true,true,],//如果这一个时间节点被占用了，就不可以触发点击事件
    wordList: ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
    start_time: -1,   //这里不存具体的时间，存方格的索引值
    end_time: -2,
    isReserve : true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //根据服务端传过来的数据对表格进行初始化，看哪些时间端被占用了，设置成红色，并让这些方格不触发点击事件
    initData : function(meetings,isReserve){
      this.setData({
        colorList:["azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure",
        "azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure","azure",],
        tapList: [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,
          true,true,true,true,true,true,true,true,true,true,true,true,],//如果这一个时间节点被占用了，就不可以触发点击事件
        wordList: ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
        start_time: -1,   //这里不存具体的时间，存方格的索引值
        end_time: -2,
        isReserve : isReserve,
      })
      //获取总共有多少个会议
      for(let i=0;i<meetings.length;i++){
        //方格上显示详细信息：申请人加上申请理由
        var detail = app.globalData.username+"&"+meetings[i].reason
        var words = detail.split('')   //拿到每一个汉字
        //难点在于把每一个汉字映射到方格上面
        var gap = meetings[i].end_time-meetings[i].start_time+1
        // console.log(gap)
        //1.字符长度小于方格数，每个方格放一个字，顺序下来
        if(words.length<=gap){
          for(var k=meetings[i].start_time;k<=meetings[i].start_time+words.length-1;k++){
            this.setData({
              ["wordList["+k+"]"] : words[k-meetings[i].start_time],
            })
          }
        }else{//字符长度大于方格数
          //判断每个格子放几个字,剩下的文字顺延
          var one = parseInt(words.length/gap)
          var left = words.length-one*gap  //还剩几个
          // console.log(one)
          // console.log(left)
          //把文字组成的结果保存到新的数组里面
          var array = new Array()
          // for(var n=0;n<gap;n++){   //这个是竖直排列的文字
          //   var word = ""
          //   for(var k=0;k<one;k++){
          //     if(gap*k+n<=words.length-1){
          //       word = word+words[gap*k+n]
          //     }
          //   }
          //   array.push(word)
          // }
          //通过对比，还是选用水平文字展示
          var n = 0
          var count = 0
          for(var m=0;m<gap;m++){
            var word = ""
            for(;n<words.length;n++){
              if(word.length<one){
                word = word+words[n]
              }else if(count<left){
                  word = word+words[n++]
                  count++
                  break
              }else{
                break
              }
            }
            array.push(word)
          }
          for(var k=meetings[i].start_time;k<=meetings[i].end_time;k++){
            this.setData({
              ["wordList["+k+"]"] : array[k-meetings[i].start_time],
            })
          }
        }
        for(let j=meetings[i].start_time;j<=meetings[i].end_time;j++){   //设置被预定的时间端不触发点击事件
          this.setData({
            ["colorList["+j+"]"] : "pink",  //被选中的为红色
            ["tapList["+j+"]"] : false,
          })
        }
      }
    },
    time_tap : function(e){
      if(this.data.isReserve){
        var index = parseInt(e.currentTarget.id)
        //首先判断选择的方格是不是之前被预定过的，如果是，就不触发点击事件，同时提示用户
        if(this.data.tapList[index]){
          //逻辑判断当间隔选择时，可以实现全部选择的效果
          if(this.data.start_time<0){   //也就是没有初始值，第一次选择
            this.setData({
              ["colorList["+index+"]"] : "forestgreen",
              start_time :index,
            })
          }else if(this.data.start_time>=0 && this.data.end_time <0 ){  //没有选择截止时间
            if(index <= this.data.start_time){   //选择无效,end_time比start_time小
              this.setData({
                ["colorList["+this.data.start_time+"]"] : "azure",
                start_time : -1,
              })
              this.change()
            }else{  //对应间隔选择的情况
              var i
              var flag = false
              for(i=this.data.start_time+1;i<=index;i++){
                //判断这之间有没有被占用的空格
                if(this.data.tapList[i]==false){
                  flag = true
                  break
                }
              }
              if(flag){
                wx.showToast({
                  title: '所选时间段内有冲突',
                  icon : 'none',
                  duration : 1000
                })
              }else{  //之间没有被选中的空格
                for(i=this.data.start_time+1;i<=index;i++){
                  this.setData({
                    ["colorList["+i+"]"] : "forestgreen",
                  })
                }
                this.setData({
                  end_time : index,
                })
                this.change()  //将子组件里面的start_time和end_time传到父组件里面
              }
            }
          }else{//对应开始时间和结束时间都确定了,就清空重新开始
            //需要单独处理那些已被预定的时间端
            for(var i=0;i<this.data.tapList.length;i++){
              if(this.data.tapList[i]){
                this.setData({
                  ["colorList["+i+"]"] : "azure",
                })
              }
            }
            this.setData({
              start_time : -1,
              end_time : -2,
            })
            this.change()
          }
        }else{
          wx.showToast({
            title: '此时间段已被预定',
            icon : 'none',
            duration : 1000
          })
        }
      }else{   //这是在用户个人预定信息界面，如果点击到了预定的信息提示用户是否删除
        var index = parseInt(e.currentTarget.id)
        if(this.data.tapList[index]==false){  //点击部分被预定了
          this.delete(index)
        }
      }
    },
    change: function(){
      this.triggerEvent('change', { start_time: this.data.start_time,end_time: this.data.end_time }, { })
    },
    delete: function (index) {
      this.triggerEvent('delete', { index: index}, { })
    },
  }
})
