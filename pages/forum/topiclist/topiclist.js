// pages/forum/topiclist/topiclist.js

const Util = require('../../../utils/util');
const moment = require('../../../utils/moment.min');

let self;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items:[],
        isRefreshing:false,
        isLoadMore:false,
        activeTabIndex:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        self = this;
        this.boardid = options.boardid || 0;
        this.offset = 0;
        this.orderby = '';
        this.loadMoreAble = false;
        //this.fetchData();

        if (this.boardid) {
            Util.request('/forum/get_board', {boardid:this.boardid}).then(response=>{
                const {board} = response.data;
                this.setData({board});
                wx.setNavigationBarTitle({
                    title: board.title,
                });
            });
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
        self.offset = 0;
        self.fetchData();
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
        let {boardid, offset, orderby} = self;
        Util.request('/forum/batchget_topic', {
            boardid,
            offset,
            orderby,
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
            wx.stopPullDownRefresh();
            self.loadMoreAble = response.data.items.length >= 20;
        });
    },
    onSwitchTab: function (e) {
        const activeTabIndex = parseInt(e.currentTarget.dataset.index);
        if (self.data.activeTabIndex === activeTabIndex) {
            return false;
        } else {
            self.setData({activeTabIndex});
            if (activeTabIndex === 1) {
                self.orderby = 'replies-desc';
            } else {
                self.orderby = 'time-desc';
            }
            self.fetchData();
        }
    }
});