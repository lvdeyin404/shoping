//app.js
App({
  onLaunch: function () {
    var self = this;

    // 获取3rd_session
    var session = wx.getStorageSync('session') || []
    // 判断是否存在3rd_session
    if(!session){
      console.log('未登录过');
      //self.login();
    }else{
      //判断登录态是否过期
      wx.checkSession({
        success: function(){
          //未过期
          console.log("登录态未过期");
          self.rd_session = session;
          self.getUserInfo();
        },
        fail: function(){
          //过期
          console.log('登录过期');
          // self.login();
        }
      })
    }
},

  login:function(){
    var self = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: 'http://119.29.242.21/xm2/public/index.php/index/index/login',
            data: {
              code: res.code,
            },
            success: function (res) {
              console.log(res.data);
              wx.setStorageSync('session', res.data);
              self.rd_session = wx.getStorageSync('session');
              self.getUserInfo();
            }
          })
        } else {
          console.log('获取登录信息失败');
        }
      }
    })
  },

  getUserInfo:function(){
    var self = this;
    //查看用户授权信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              wx.request({
                url: 'http://119.29.242.21/xm2/public/index.php/index/index/encode_info',
                data: {
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  rawData: res.rawData,
                  signature: res.signature,
                  session: self.rd_session,
                },
                success: function (e) {
                  console.log(e.data.status);
                  if (e.data.status == 1) {
                    self.globalData.userInfo = e.data.data;
                    wx.redirectTo({
                      url: '../list/list',
                    })
                    console.log(self.globalData.userInfo);
                  }else if(e.data.status == 0){
                    //3rd_session过期 重新调用wx.login
                    console.log(e.data.message);
                    // self.login();
                  }
                }
              })

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: function (e) {
              console.log("getuserinfo error");
            }
          })
        } else {
          //用户未授权
          console.log("用户未授权,跳转授权页面");
          // wx.redirectTo({
          //   url: '../index/index',
          // })
        }
      }
    })
  },

  rd_session: null,
  globalData: {
    userInfo: null
  }
})