// pages/forum/index/index.js
const Util = require('../../../utils/util');
const moment = require('../../../utils/moment.min');

let self;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        focus_imgs:[],
        boards:[],
        topics:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        self = this;

        Util.request('/block/batchget_item',{block_id:12}).then(response => {
            const focus_imgs = response.data.items;
            this.setData({focus_imgs});
        });

        Util.request('/forum/batchget_board').then(response => {
            const boards = response.data.items;
            this.setData({boards});
        });

        Util.request('/forum/batchget_topic', {count:10}).then(response => {
            const topics = response.data.items;
            topics.forEach((topic) => {
                topic.formatted_time = moment(new Date(topic.created_at * 1000)).format('MM-DD hh:mm');
            });
            this.setData({topics});
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