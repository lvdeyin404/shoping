// pages/user/user.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    if (app.globalData.userInfo){
      self.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log(app.globalData.userInfo);
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

  },

  getUserInfo:function(res){
    var self = this;
    wx.request({
      url: 'http://119.29.242.21/xm2/public/index.php/index/index/encode_info',
      data: {
        encryptedData: res.detail.encryptedData,
        iv: res.detail.iv,
        rawData: res.detail.rawData,
        signature: res.detail.signature,
        session: app.rd_session,
      },
      success: function (e) {
        if (e.data.status == 1) {
          app.globalData.userInfo = e.data.data;
          self.setData({
            userInfo: e.data.data,
            hasUserInfo: true,
          })
        } else if (e.data.status == 0) {
          //3rd_session过期 重新调用wx.login
          console.log(e.data.message);
          app.login();

        }
      }
    })
  }
})