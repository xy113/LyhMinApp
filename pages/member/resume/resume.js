// pages/member/resume/resume.js
const Util = require('../../../utils/util');
const app = getApp();

let self;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        self = this;
        wx.setNavigationBarTitle({
            title: '我的简历',
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
      this.fetchData();
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
      this.fetchData();
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

    fetchData : function () {
        Util.request('/resume/batchget').then(response=>{
            //console.log(response);
            self.setData({
                items:response.data.items
            });
            wx.stopPullDownRefresh();
        });
    },

    generateResume: function () {
        Util.request('/resume/generate').then(response=>{
            if (response.errcode) {
                wx.showToast({
                    title:response.errmsg
                });
            } else {
                this.fetchData();
            }
        });
    },
    deleteResume: function (e) {
        const {id} = e.currentTarget.dataset;
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
                if (sm.confirm) {
                    Util.request('/resume/delete', {id}).then(response=>{
                        self.fetchData();
                    });
                } else if (sm.cancel) {

                }
            }
        });
    }
});