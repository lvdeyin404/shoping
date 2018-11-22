// pages/list/list-item/list-item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    LockData: [],
  },

  // 参与抽奖
  bindjoin:function(e){
    console.log(e);
    var self = this;
    wx.request({
      url: 'http://119.29.242.21/xm2/public/index.php/index/Luck/joinlock',
      data: {
        lockid: e.target.dataset.lockid,
        userid: e.target.dataset.userid,
      },
      success:function(e){
        if(e.data.status == 1){
          wx.showToast({
            title: '参与成功',
            duration: 2000,
            success:function(e){
              self.onReLoad();
            }
          })
        }else{
          wx.showToast({
            title: '参与失败',
            icon: 'none',
            duration: 2000,
          })
        }
      }
    })
  },

  lockid:'',

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    //当前抽奖id存储  以便刷新当前页面
    self.lockid = options.lockid;
    //获取3rd_session
    var session = wx.getStorageSync('session');
    //判断是否登录
    if(session){
      wx.request({
        url: 'http://119.29.242.21/xm2/public/index.php/index/Luck/details',
        data: {
          'lockid': self.lockid,
          'session': session,
        },
        success: function (e) {
          if(e.data.status == 0){
            wx.showLoading({
              title: '请先登录',
            })
            setTimeout(function () {
              wx.hideLoading();
              wx.switchTab({
                url: '../../user/user',
              })
            }, 2000);
          }else{
            self.setData({
              imgUrls: e.data.data.lunbopath,
              LockData: e.data.data,
            })
            console.log(self.data.LockData);
          }
        }
      })
    }else{
      wx.showLoading({
        title: '请先登录',
      })
      setTimeout(function(){
        wx.hideLoading();
        wx.switchTab({
          url: '../../user/user',
        })
      },2000);
    }
    
  },

  //重新加载本页面
  onReLoad:function(){
    var self = this;
    //获取3rd_session
    var session = wx.getStorageSync('session');
    //判断是否登录
    if (session) {
      wx.request({
        url: 'http://119.29.242.21/xm2/public/index.php/index/Luck/details',
        data: {
          'lockid': self.lockid,
          'session': session,
        },
        success: function (e) {
          self.setData({
            imgUrls: e.data.data.lunbopath,
            LockData: e.data.data,
          })
          console.log(self.data.LockData);
        }
      })
    } else {
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