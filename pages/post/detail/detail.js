// pages/post/detail/detail.js
const Util = require('../../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        aid:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let aid = options.aid || 0;
        let url = Util.getPostUrl(aid);
        this.setData({url,aid});

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

    addToCollection: function (e) {
        console.log(e);
        const aid = this.data.aid;
        Util.addToCollection(data_id, 'article', () => {
            wx.showToast({
                title:'已成功加入收藏夹',
                icon:'success'
            });
        });
    }
});