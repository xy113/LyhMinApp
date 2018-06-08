// pages/post/list/list.js

const Util = require('../../../utils/util');
const moment = require('../../../utils/moment.min.js');

let self;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items:[],
        isRefreshing:false,
        isLoadMore:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      self = this;
      this.catid = options.catid || 0;
      this.offset = 0;
      self.loadMoreAble = false;
      this.fetchData();

      let title = options.title || '盘联新闻';
      wx.setNavigationBarTitle({
        title: title,
      });
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
      if (self.data.isRefreshing || self.data.isLoadMore) {
        return false;
      } else {
          self.offset = 0;
          self.setData({isRefreshing:true});
          self.fetchData();
      }

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (self.data.isRefreshing || self.data.isLoadMore || !self.loadMoreAble) {
            return false;
        } else {
            self.offset+= 20;
            self.setData({isLoadMore:true});
            self.fetchData();
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    //请求数据
    fetchData: () => {
      const {catid, offset} = self;
      Util.request('/post/batchget_item', {
          catid,
          offset,
          count:20,
      }).then(response => {
          response.data.items.forEach((item) => {
            item.formatted_time = moment(new Date(item.created_at * 1000))
              .format('YYYY-MM-DD');
          });
          let items = self.data.items;
          if (self.data.isLoadMore) {
            items = items.concat(response.data.items);
          } else {
            items = response.data.items;
          }
          self.setData({
              items,
              isRefreshing:false,
              isLoadMore:false
          });
          self.loadMoreAble = response.data.items.length >= 20;
      });
    }
});