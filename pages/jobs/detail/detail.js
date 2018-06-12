// pages/jobs/detail/detail.js
const Util = require('../../../utils/util');

let self;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        job:{},
        company:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        self = this;
        const job_id = options.job_id;

        Util.request('/job/get_job',{job_id}).then(response=>{
            const {job,company} = response.data;
            this.setData({job,company});
            wx.setNavigationBarTitle({
              title: job.title,
            });
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

    },

    addToCollection: function (e) {
        const data_id = e.currentTarget.dataset.id;
        Util.addToCollection(data_id, 'job', () => {
            wx.showToast({
                title:'已成功加入收藏夹',
                icon:'success'
            });
        });
    },
    
    postResume: function (e) {
        
    }
});