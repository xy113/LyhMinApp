const Util = require('../../utils/util');
const moment = require('../../utils/moment.min');

let self;
Page({
    data: {
        background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
        imgs: [],
        news: [],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        circular: true,
        interval: 5000,
        duration: 500,
        previousMargin: 0,
        nextMargin: 0,
        menus: [
            {
                title: '盘联新闻',
                img: '../../asset/img/mobile/news.png',
                url: '../post/list/list?catid=15&title=盘联新闻'
            },
            {
                title: '部门招新',
                img: '../../asset/img/mobile/zhaoxin.png',
                url: '../recruit/list/list?catid=1'
            },
            {
                title: '活动招募',
                img: '../../asset/img/mobile/zhaomu.png',
                url: '../recruit/list/list?catid=2'
            },
            {
                title: '工作机会',
                img: '../../asset/img/mobile/zhaopin.png',
                url: '../jobs/jobs/jobs'
            },
            {
                title: '加入联谊会',
                img: '../../asset/img/mobile/jiaru.png',
                url: '../join/lisence/lisence'
            },
            {
                title: '联谊会达人',
                img: '../../asset/img/mobile/daren.png',
                url: '../index/index'
            },
            {
                title: '合作伙伴',
                img: '../../asset/img/mobile/hezuo.png',
                url: '../company/list/list'
            },
            {
                title: '组织架构',
                img: '../../asset/img/mobile/zuzhi.png',
                url: '../pages/detail/detail?pageid=51'
            }
        ]
    },
    onLoad: function () {
        self = this;
        Util.request('/block/batchget_item', {block_id:10}).then(response => {
            this.setData({
                imgs:response.data.items
            });
        });

        Util.request('/post/batchget_item', {count:10}).then(response => {
            let news = response.data.items;
            news.forEach((item) => {
                item.formatted_time = moment(new Date(item.created_at * 1000)).format('MM-DD')
            });
            this.setData({news});
        });
    },
    changeProperty: function (e) {
        var propertyName = e.currentTarget.dataset.propertyName
        var newData = {}
        newData[propertyName] = e.detail.value
        this.setData(newData)
    },
    changeIndicatorDots: function (e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function (e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function (e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function (e) {
        this.setData({
            duration: e.detail.value
        })
    },
    
});
