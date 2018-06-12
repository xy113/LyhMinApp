//app.js
const Util = require('./utils/util.js');
App({
    onLaunch: function () {
        Util.login().then(res=>{
            const code = res.code;
            Util.getUserInfo().then(res => {
                console.log(res);
                const userInfo = res.userInfo;
                this.globalData.userInfo = userInfo;
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