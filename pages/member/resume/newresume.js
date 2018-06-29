// pages/member/resume/newresume.js

const Util = require('../../../utils/util');

let self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eduArray:[
        '选择学历',
        '小学',
        '初中',
        '高中',
        '大专',
        '本科',
        '硕士',
        '博士'
    ],
      eduIndex:0,
      resume:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    wx.setNavigationBarTitle({
      title: '新建简历',
    });

    self.id = options.id || 0;
    if (self.id) {
      Util.request('/resume/get',{id:self.id}).then(response=>{
        console.log(response);
          const {resume} = response.data;
          self.setData({resume,eduIndex:resume.education});
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
    onPickerEdu: function (e) {
        this.setData({
            eduIndex:e.detail.value
        })
    },
    onSubmit: function (e) {
        const {title,name, age, phone, email, education, work_exp, address, introduction} = e.detail.value;

        if (!title) {
          wx.showToast({
              title:'请填写标题'
          });
          return false;
        }

        if (!name) {
            wx.showToast({
                title:'请填写姓名'
            });
            return false;
        }

        if (!age) {
            wx.showToast({
                title:'请填写年龄'
            });
            return false;
        }

        if (!phone) {
            wx.showToast({
                title:'请填写联系电话'
            });
            return false;
        }

        if (!email) {
            wx.showToast({
                title:'请填写电子邮箱'
            });
            return false;
        }

        if (!education) {
            wx.showToast({
                title:'请填写学历'
            });
            return false;
        }

        if (!work_exp) {
            wx.showToast({
                title:'请填写工作经验'
            });
            return false;
        }

        if (!address) {
            wx.showToast({
                title:'请填写所在地址'
            });
            return false;
        }

        const resume = e.detail.value;
        Util.request('/resume/save',{id:self.id,resume}, 'POST').then(response=>{
            wx.navigateBack({
              
            });
        });
    }
});