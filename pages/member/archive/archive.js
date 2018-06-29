// pages/member/archive/archive.js
const Util = require('../../../utils/util');
const app = getApp();

let self;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        self = this;
        wx.setNavigationBarTitle({
            title: '会员档案',
        });

        this.setData({
            userInfo:app.globalData.userInfo
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
        Util.request('/archive/get').then(response=>{
            //console.log(response);
            this.setData({
                archive:response.data.archive
            });
        });
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
      Util.request('/archive/get').then(response => {
        //console.log(response);
        this.setData({
          archive: response.data.archive
        });
        wx.stopPullDownRefresh();
      });
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
});