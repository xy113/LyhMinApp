// pages/forum/newtopic/newtopic.js
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
        self = this;
        this.boardid = options.boardid || 0;
        this.submiting = false;
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
    formSubmit:function (e) {
        const {boardid} = self;
        const {title, message} = e.detail.value;

        if (self.submiting) {
          return false;
        }

        if (title.length < 5) {
          wx.showToast({
              title:'标题不能少于5个字哦',
              icon:'none'
          });
          return false;
        }

        if (message.length < 5) {
            wx.showToast({
                title:'话题内容不能少于5个字哦',
                icon:'none'
            });
            return false;
        }

        self.submiting = true;
        Util.request('/forum/add_topic',{
            boardid,
            title,
            message
        }, 'POST').then(response => {
            self.submiting = false;
            wx.navigateBack();
        }).catch(error=>{
            self.submiting = false;
        });
    }
});