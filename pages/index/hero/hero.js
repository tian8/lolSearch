// pages/index/hero/hero.js
Page({
  data: {
   
    /*recent: {
      battle_result: true,
      name: "Varus.jpg",
      name_cn: "匹配赛",
      created: "2016-10-10"
    }*/
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var player = wx.getStorage("players")
    var url = "http://api.lolbox.duowan.com/api/v3/player/dx1/";
    
    var me = this;
    wx.getStorage({
      key: 'players',
      success: function (res) {
       // console.log(res.data[options.index])

        url = url + res.data[options.index].user_id;
        var recent_url=url+"/game_recent";
        me.setData({
          url_img: res.data[options.index].url_img,
          pn: res.data[options.index].pn,
          server: res.data[options.index].game_zone.alias,
          user_id:res.data[options.index].user_id
        })
        // console.log(url);
        wx.request({
          url: url,
          method: 'GET',
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            console.log(res);
            me.setData({
                like: res.data.player_list[0].like,
                unlike: res.data.player_list[0].unlike,
                combat: res.data.player_list[0].box_score,
                t_zh: res.data.player_list[0].tier_rank.tier.name_cn,
                r_zh: res.data.player_list[0].tier_rank.rank.name,
                //recent:res.data.player_list[0].game_recent_list,
            })
          },
          fail: function () {
            console.log("数据获取失败");
          },
        });
        wx.request({
          url: recent_url,
          method: 'GET',
          header: {
            'content-type': 'json'
          },
          success: function(res){
            console.log(res);
                me.setData({
                recent:res.data.game_list,
            })
          },
          fail: function () {
            console.log("数据获取失败");
          },
        })
      }
    });
  },

  getGame:function(event){
      wx.navigateTo({
        url: '../gameZone/gameZone?userid='+this.data.user_id+"&gameid="+event.currentTarget.dataset.gameid,
        success: function(res){
          //console.log(res);
        },
        fail: function() {
          console.log("跳转失败")
        },
      })
  }
})