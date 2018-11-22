// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      'http://119.29.242.21/images/banner1.jpg',
      'http://119.29.242.21/images/banner2 .jpg',
      'http://119.29.242.21/images/banner3.jpg',
      'http://119.29.242.21/images/banner4.jpg',
    ],
    noticelists:[],
    LockData: [],
    border1: 'color: #F9464C; border-bottom: solid 1rpx #F9464C;',
    border2: '',
    border3: '',
    border4: '',
  },

  bindhot:function(e){
    this.setData({
      border1: 'color: #F9464C; border-bottom: solid 1rpx #F9464C;',
      border2: '',
      border3: '',
      border4: '',
    })
  },

  // 点击进度获取数据
  bindspedd:function(e){
    this.setData({
      border1: '',
      border2: 'color: #F9464C; border-bottom: solid 1rpx #F9464C;',
      border3: '',
      border4: '',
    })
    // wx.request({
    //   url: 'http://119.29.242.21/xm2/public/index.php/index/Luck/index',
    //   data: {
    //     order: 'speed',
    //   },
    // })
  },

  //点击需要人次
  bindtotal:function(e){
    this.setData({
      border1: '',
      border2: '',
      border3: 'color: #F9464C; border-bottom: solid 1rpx #F9464C;',
      border4: '',
    })
  },

  //点击全部
  bindall:function(e){
    this.setData({
      border1: '',
      border2: '',
      border3: '',
      border4: 'color: #F9464C; border-bottom: solid 1rpx #F9464C;',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var self = this;
    //请求数据
    wx.request({
      url: 'http://119.29.242.21/xm2/public/index.php/index/Luck/index',
      success: function (e) {
        console.log(e.data.data);
        self.setData({
          LockData: e.data.data,
        })
      }
    })
    wx.request({
      url: 'http://119.29.242.21/xm2/public/index.php/index/Luck/notice',
      success:function(e){
        if(e.data.status == 1){
          self.setData({
            noticelists: e.data.data,
          })
        }
      }
    })
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