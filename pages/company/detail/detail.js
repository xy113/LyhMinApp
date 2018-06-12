// pages/company/detail/detail.js
const Util = require('../../../utils/util');

let self;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        company:{},
        content:{},
        jobs:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        self = this;
        const company_id = options.company_id;
        wx.setNavigationBarTitle({
            title: '公司介绍',
        });
        Util.request('/company/get_company',{company_id}).then(response=>{
            const {company, content} = response.data;
            this.setData({company, content});
        });

        Util.request('/job/batchget_job', {company_id}).then(response => {
            const {items} = response.data;
            this.setData({jobs:items});
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
        Util.addToCollection(data_id, 'company', () => {
            wx.showToast({
                title:'已成功加入收藏夹',
                icon:'success'
            });
        });
    }
});