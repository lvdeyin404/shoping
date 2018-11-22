// pages/list/myluck/myluck.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    border1: "color: #F9464C; border-bottom: solid 1rpx #F9464C;",
    border2: "",
    border3: "",
    border4: "",
    myluck:[],
  },

  //点击全部事件
  bindspan1: function (e) {
    var self = this;
    //获取srd_session 通过session能获取当前用户id
    var session = wx.getStorageSync('session');
    wx.request({
      url: 'http://119.29.242.21/xm2/public/index.php/index/Luck/myluck',
      data: {
        'session': session,
        'type': 'all',
      },
      success: function (e) {
        if (e.data.status == 1) {
          self.setData({
            border1: "color: #F9464C; border-bottom: solid 1rpx #F9464C;",
            border2: "",
            border3: "",
            border4: "",
            myluck: e.data.data,
          })
        }
      }
    })
  },

  //点击已中奖事件
  bindspan2:function(e){
    var self = this;
    //获取srd_session 通过session能获取当前用户id
    var session = wx.getStorageSync('session');
    wx.request({
      url: 'http://119.29.242.21/xm2/public/index.php/index/Luck/myluck',
      data: {
        'session': session,
        'type': '1',
      },
      success:function(e){
        if(e.data.status == 1){
          self.setData({
            border1: "",
            border2: "color: #F9464C; border-bottom: solid 1rpx #F9464C;",
            border3: "",
            border4: "",
            myluck: e.data.data,
          })
        }
      }
    })
  },

  //点击未中奖事件
  bindspan3: function (e) {
    var self = this;
    //获取srd_session 通过session能获取当前用户id
    var session = wx.getStorageSync('session');
    wx.request({
      url: 'http://119.29.242.21/xm2/public/index.php/index/Luck/myluck',
      data: {
        'session': session,
        'type': '2',
      },
      success: function (e) {
        if (e.data.status == 1) {
          self.setData({
            border1: "",
            border2: "",
            border3: "color: #F9464C; border-bottom: solid 1rpx #F9464C;",
            border4: "",
            myluck: e.data.data,
          })
        }
      }
    })
  },

  //点击未开奖事件
  bindspan4: function (e) {
    var self = this;
    //获取srd_session 通过session能获取当前用户id
    var session = wx.getStorageSync('session');
    wx.request({
      url: 'http://119.29.242.21/xm2/public/index.php/index/Luck/myluck',
      data: {
        'session': session,
        'type': '0',
      },
      success: function (e) {
        if (e.data.status == 1) {
          self.setData({
            border1: "",
            border2: "",
            border3: "",
            border4: "color: #F9464C; border-bottom: solid 1rpx #F9464C;",
            myluck: e.data.data,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    //获取srd_session 通过session能获取当前用户id
    var session = wx.getStorageSync('session') || [];
    //判断是否登录
    if(session){
      wx.request({
        url: 'http://119.29.242.21/xm2/public/index.php/index/Luck/myluck',
        data: {
          'session': session,
          'type': 'all',
        },
        success: function (e) {
          if (e.data.status == 0) {
            wx.showLoading({
              title: '请先登录',
            })
            setTimeout(function () {
              wx.hideLoading();
              wx.switchTab({
                url: '../../user/user',
              })
            }, 2000);
          } else {
            console.log(e.data.message);
            console.log(e.data.data);
            self.setData({
              myluck: e.data.data,
            })
          }
        }
      })
    }else{
      wx.showLoading({
        title: '请先登录',
      })
      setTimeout(function () {
        wx.hideLoading();
        wx.switchTab({
          url: '../../user/user',
        })
      }, 2000);
    }
    

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