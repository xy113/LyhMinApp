// pages/forum/topic/topic.js
const Util = require('../../../utils/util');
const moment = require('../../../utils/moment.min');

let self;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topic:{},
        board:{},
        message:{},
        items:[],
        isRefreshing:false,
        isLoadMore:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        self = this;

        this.tid = options.tid;
        Util.request('/forum/get_topic', {tid:this.tid}).then(response=>{
            const {topic, board, message} = response.data;
            this.setData({topic,board,message});
            wx.setNavigationBarTitle({
                title: topic.title,
            });
        });
        this.fetchData();
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
    fetchData: () => {
        const {tid, offset, orderby} = self;
        Util.request('/forum/batchget_message', {
            tid,
            offset,
            orderby,
            count:20,
        }).then(response => {
            response.data.items.forEach((item) => {
                item.formatted_time = moment(new Date(new Date(item.created_at * 1000)))
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
    },
});