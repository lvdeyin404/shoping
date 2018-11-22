// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seletedAllstatus: false,
    addPrice: 0,
    items:[
      { 'bus': '尼采电视旗舰店', 'selected':'true', 'value': [
        { 'name': '衣服', 'value': '尼索LED高清电视4k', 'selected': true, 'path': 'http://119.29.242.21/images/1.png', 'price':1899, 'number': 3},
        { 'name': '衣服', 'value': '高清显示屏', 'selected': true, 'path': 'http://119.29.242.21/images/3.png', 'price': 1899, 'number': 3},
        { 'name': '衣服', 'value': '机械键盘', 'selected': true, 'path': 'http://119.29.242.21/images/5.png', 'price': 1899, 'number': 3},
        ]
      },
      {
        'bus': '尼采电视旗舰店', 'selected': 'true', 'value': [
          { 'name': '衣服', 'value': '尼索LED高清电视4k', 'selected': true, 'path': 'http://119.29.242.21/images/1.png', 'price': 1899, 'number': 3},
          { 'name': '衣服', 'value': '高清显示屏', 'selected': true, 'path': 'http://119.29.242.21/images/3.png', 'price': 1899, 'number': 3},
          { 'name': '衣服', 'value': '机械键盘', 'selected': true, 'path': 'http://119.29.242.21/images/5.png', 'price': 1899, 'number': 3},
        ]
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //首先判断是否登录
    //获取3rd_session
    var session = wx.getStorageSync('session');
    //判断是否登录
    if (session) {
      // wx.request({
      //   url: 'http://119.29.242.21/xm2/public/index.php/index/Luck/details',
      //   data: {
      //     'lockid': self.lockid,
      //     'session': session,
      //   },
      //   success: function (e) {
      //     self.setData({
      //       imgUrls: e.data.data.lunbopath,
      //       LockData: e.data.data,
      //     })
      //     console.log(self.data.LockData);
      //   }
      // })
    } else {
      wx.showLoading({
        title: '请先登录',
      })
      setTimeout(function () {
        wx.hideLoading();
        wx.switchTab({
          url: '../user/user',
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
    this.toSum();
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

  //商品选中状态
  bindCheckbox:function(e){
    //获得index
    var index = e.target.dataset.index;
    var subindex = e.target.dataset.subindex;
    //原始的icon状态
    var status = this.data.items[index].value[subindex].selected;
    var items = this.data.items;
    var is_status = true;
    //取反
    items[index].value[subindex].selected = !status;
    //判断商品是否全部选中，如果全部选中则选中店铺状态，反之取消
    for (var i = 0; i < (this.data.items[index].value).length; i++) {
      if (items[index].value[i].selected == false){
          is_status = false;
      }
    }

    if(is_status == true){
      items[index].selected = true;
    }else{
      items[index].selected = false;
    }
    //重新赋值
    this.setData({
      items: items
    })
    this.toSum();
  },

  //店铺选中
  bindSelectedDp: function (e) {
    //获得index
    var index = e.target.dataset.index;
    //如果选中则子商品全部选中,反之全部不选中
    //原始的icon状态
    var status = this.data.items[index].selected;
    var items = this.data.items;
    //取反
    items[index].selected = !status;
    items[index].value
    for (var i = 0; i < (this.data.items[index].value).length; i++) {
      items[index].value[i].selected = !status;
    }
    //重新赋值
    this.setData({
      items: items
    })
    this.toSum();
  },

  //全选
  bindSelectedAll:function(e){
    //目前状态
    var seletedAllstatus = this.data.seletedAllstatus;
    // 取反
    seletedAllstatus = !seletedAllstatus;
    //设置商品状态
    var carts = this.data.items;
    for (var i = 0; i < (carts).length; i++) {
      for (var j=0; j< (carts[i].value).length; j++){
        carts[i].value[j].selected = seletedAllstatus;
      }
      carts[i].selected = seletedAllstatus;
    }
    //设置
    this.setData({
      items: carts,
      seletedAllstatus: seletedAllstatus,
    })
    this.toSum();
  },

  // 商品数量---减
  bindreduce:function(e){
    // 获取数据
    var items = this.data.items;
    //获取index
    var index = e.target.dataset.index;
    var subindex = e.target.dataset.subindex;
    //判断当前number是否为0，为0则返回false
    if(items[index].value[subindex].number == 0){
      return false;
    }
    //修改数目
    items[index].value[subindex].number = items[index].value[subindex].number - 1;
    //重新赋值
    this.setData({
      items: items,
    })
    this.toSum();
  },

  //商品数量---加
  bindincr:function(e){
    // 获取数据
    var items = this.data.items;
    //获取index
    var index = e.target.dataset.index;
    var subindex = e.target.dataset.subindex;
    //修改数目
    items[index].value[subindex].number = items[index].value[subindex].number + 1;
    //重新赋值
    this.setData({
      items: items,
    })
    this.toSum();
  },

  //删除购物车
  binddel:function(e){
    var self = this;
    //获取数据
    var items = this.data.items;
    //获取index
    var index = e.target.dataset.index;
    var subindex = e.target.dataset.subindex;

    wx.showModal({
      title: '提示',
      content: '是否确定删除',
      success:function(res){
        if(res.confirm){
          //删除对应内容
          items[index].value.splice(subindex,1);
          //如果该店铺下的所有商品都删除了  则删除该店铺的信息
          if (items[index].value == "") {
            items.splice(index, 1);
          }
          self.setData({
            items: items,
          })
          self.toSum();
        }else{
          return false;
        }
      }
    });
  },

  toSum:function(e){
    //获取items
    var items = this.data.items;
    //取出选中的
    var sum = 0;
    for(var i=0;i<items.length;i++){
      for (var j = 0; j < (items[i].value).length;j++){
        if (items[i].value[j].selected == true){
          sum += items[i].value[j].price * items[i].value[j].number;
        }
      }
    }
    //将总价替换到页面
    this.setData({
      items: items,
      addPrice: sum.toFixed(2),
    })
  }
})