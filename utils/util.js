const formatTime = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : '0' + n
};

const request = (path, data = {}, method = "GET") => {
    const token = wx.getStorageSync('token');
    return new Promise((resolve, reject) => {
        wx.request({
            url: 'https://lyh.songdewei.com/minapp'+path,
            data: data,
            method: method,
            header: {
                'Content-Type': 'application/json',
                'X-Token': token
            },
            success: (res) => {
                if (res.statusCode === 200) {

                    if (res.data.errcode === 401) {
                        //需要登录后才可以操作
                        wx.showModal({
                            title: '',
                            content: '请先登录',
                            success: (res) => {
                                if (res.confirm) {
                                    wx.switchTab({
                                        url: '/pages/ucenter/index/index'
                                    });
                                }
                            }
                        });
                    } else {
                        resolve(res.data);
                    }
                } else {
                    reject(res.errMsg);
                }

            },
            fail: (err) => {
                reject(err);
                console.log(err)
            }
        })
    });
};

/**
 * 检查微信会话是否过期
 */
const checkSession = () => {
    return new Promise((resolve, reject) => {
        wx.checkSession({
            success: () => {
                resolve(true);
            },
            fail: () => {
                reject(false);
            }
        })
    });
};

/**
 * 调用微信登录
 */
const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            success: (res) => {
                if (res.code) {
                    //登录远程服务器
                    console.log(res);
                    resolve(res);
                } else {
                    reject(res);
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};

const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            console.log(res);
                            resolve(res);
                        },
                        fail:error => {
                            reject(error);
                        }
                    });
                }
            },
            fail: error => {
                console.log(error);
                reject(error);
            }
        });
    });
};

const getPostUrl = (aid) => {
    return 'https://lyh.songdewei.com/mobile/post/detail/'+aid+'.html';
};

module.exports = {
    formatTime,
    request,
    checkSession,
    login,
    getUserInfo,
    getPostUrl
};