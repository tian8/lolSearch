// pages/index/gameZone/gameZone.js
Page({
  data:{},
  onLoad:function(options){
    var url = "http://api.lolbox.duowan.com/api/v3/player/dx1/";
    url = url+options.userid+"/game/"+options.gameid;
    var me = this;
    wx.request({
      url:url,
      method:'GET',
      header:{
        'content-type':'json'
      },
      success:function(res){
          me.setData({
            team_win:res.data.player_game_list[0].team_win,
            team_lose:res.data.player_game_list[0].team_lose,
          });
      },
      fail:function(){
        console.log("失败了");
      }
    })
  },
})