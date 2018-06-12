// pages/member/feedback/feedback.js
const Util = require('../../../utils/util');

let self;
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '意见反馈',
        });

        this.submiting = false;
        self = this;
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

    formSubmit: function (e) {
        const {title, message} = e.detail.value;

        if (self.submiting) {
            return false;
        }

        if (title.length < 5) {
            wx.showToast({
                title:'主题不能少于5个字哦',
                icon:'none'
            });
            return false;
        }

        if (title.message < 5) {
            wx.showToast({
                title:'问题描述不能少于5个字哦',
                icon:'none'
            });
            return false;
        }

        self.submiting = true;
        Util.request('/feedback', {title,message}).then(response => {
            wx.showToast({
                title:'你的反馈已提交',
                icon:'none',
                complete:()=>{
                    wx.navigateBack();
                }
            });
        });
    }
});