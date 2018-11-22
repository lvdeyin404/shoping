// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://119.29.242.21/images/banner1.jpg',
      'http://119.29.242.21/images/banner2 .jpg',
      'http://119.29.242.21/images/banner3.jpg',
      'http://119.29.242.21/images/banner4.jpg',
    ],
    limitgoods:[],
    newPro:[],
    weekHot:[],
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,
    title:'',
    is_title:false,
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
    var self = this;
    //限时抢购
    wx.request({
      url: 'http://119.29.242.21/xm2/public/index.php/index/Goods/getIndex',
      success: function(e){
        console.log(e);
        if(e.data.status == 1){
          var time = e.data.data[0].time;
          var totalSecond = time - Date.parse(new Date()) / 1000;
          self.setData({
            limitgoods: e.data.data[0],
            newPro: e.data.data['newpro'],
            weekHot: e.data.data['weekHot'],
          })
          //定时器
          var interval = setInterval(function () {
            //秒数
            var second = totalSecond;

            //天数
            var day = Math.floor(second / 3600 / 24);
            var dayStr = day.toString();
            if (dayStr.length == 1) dayStr = '0' + dayStr;

            //小时数
            var hr = Math.floor((second - day * 3600 * 24) / 3600);
            var hrStr = hr.toString();
            if (hrStr.length == 1) hrStr = '0' + hrStr;

            //分钟数
            var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
            var minStr = min.toString();
            if (minStr.length == 1) minStr = '0' + minStr;

            //秒数
            var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
            var secStr = sec.toString();
            if (secStr.length == 1) secStr = '0' + secStr;

            self.setData({
              countDownDay: dayStr,
              countDownHour: hrStr,
              countDownMinute: minStr,
              countDownSecond: secStr,
            });
            totalSecond--;
            if (totalSecond < 0) {
              clearInterval(interval);
              wx.showToast({
                title: '活动已结束',
              })
              self.setData({
                title: '活动已结束',
                is_title: true,
                countDownDay: '00',
                countDownHour: '00',
                countDownMinute: '00',
                countDownSecond: '00',
              });
            }
          }.bind(this), 1000);
        }
        
      }
    })
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