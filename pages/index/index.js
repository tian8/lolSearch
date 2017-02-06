//index.js
//获取应用实例



var app = getApp()
Page({
  data: {
    title:"战绩查询",
    searchResult:false,
    players:[]
  },
  onSearch:function(event){
    if(event.detail.value==null&&event.detail.value==""){
      this.setData({
        searchResult:false
      })
      return ;
    };
    var value = event.detail.value;
    var me = this;
    wx.request({
      url: 'http://api.lolbox.duowan.com/api/v3/player/search/?game_zone=all&player_name_list='+value,
      method: 'GET', 
      header: {
      'content-type': 'json'
      },
      success: function(res){
        me.setData({
          searchResult:true,
          players:res.data.player_list
        })
        wx.setStorage({
          key: 'players',
          data: res.data.player_list,
          success: function(res){
            console.log("存储数据成功");
          },
          fail: function() {
            console.log("存储数据失败");
          },
        })
        console.log(res.data.player_list);
      },
      fail: function() {
        console.log("获取数据失败");
      },
    })
  },
  getPlayer:function(event){
      wx.navigateTo({
        url: 'hero/hero?pn='+event.currentTarget.dataset.pn+'&index='+event.currentTarget.dataset.index,
      })
  }
})
