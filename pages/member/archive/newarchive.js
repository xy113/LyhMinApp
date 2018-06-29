// pages/member/archive/newarchive.js
const Util = require('../../../utils/util');
const app = getApp();

let self;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        birthday:'',
        enrollyear:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        self = this;
        wx.setNavigationBarTitle({
            title: '编辑档案',
        });

        Util.request('/archive/get').then(response=>{
            const {archive} = response.data;
            if (archive) {
                this.setData({
                    archive,
                    birthday:archive.birthday,
                    enrollyear:archive.enrollyear
                })
            }
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

    onPickerBirthday: function (e) {
        this.setData({
            birthday:e.detail.value
        })
    },

    onPickerEnrollyear: function (e) {
        this.setData({
            enrollyear:e.detail.value
        })
    },
    
    onSubmit: function (e) {
        console.log(e);
        const {fullname,sex,phone, birthday,university, enrollyear, birthplace, location} = e.detail.value;

        if (!fullname) {
            wx.showToast({
                title:'请填写姓名'
            });
            return false;
        }

        if (!phone) {
            wx.showToast({
                title:'请填写电话'
            });
            return false;
        }

        if (!birthday) {
            wx.showToast({
                title:'请选择出生日期'
            });
            return false;
        }

        if (!university) {
            wx.showToast({
                title:'请填写就读大学'
            });
            return false;
        }

        if (!enrollyear) {
            wx.showToast({
                title:'请选择入学年份'
            });
            return false;
        }

        if (!birthplace) {
            wx.showToast({
                title:'请填写籍贯'
            });
            return false;
        }

        if (!location) {
            wx.showToast({
                title:'请填写所在地'
            });
            return false;
        }

        let archive = e.detail.value;
        Util.request('/archive/save',{archive},'POST').then(response=>{
            //console.log(response);
            wx.navigateBack({

            });
        });
    }
});