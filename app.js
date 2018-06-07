//app.js
const Util = require('./utils/util.js');
App({
    onLaunch: function () {
        Util.login().then(res=>{
            const code = res.code;
            Util.getUserInfo().then(res => {
                const userInfo = res.userInfo;
                Util.request('/account/signin', {code, userInfo}, 'POST').then(response=>{
                    if(response.errcode) {

                    }else {
                        wx.setStorageSync('token', response.data.token);
                    }
                });
            });
        });
    },
    
    globalData: {
        userInfo: null,
    }
});