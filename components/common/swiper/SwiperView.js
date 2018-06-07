// components/common/swiper/SwiperView.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type:Array,
      value:[]
    },
    height:{
      type:String,
      value:wx.getSystemInfoSync().screenWidth * 0.5+'px'
    },
    "indicator-dots":{
      type:Boolean,
      value:true
    },
    "indicator-color": {
      type: String,
      value: "#fff"
    },
    "indicator-active-color": {
      type: String,
      value: "#f00"
    },
    "autoplay": {
      type: Boolean,
      value: true
    },
    "current": {
      type: Number,
      value: 0
    },
    "interval": {
      type: Number,
      value: 3000
    },
    "duration": {
      type: Number,
      value: 500
    },
    "circular": {
      type: Boolean,
      value: true
    },
    "vertical": {
      type: Boolean,
      value: false
    },
    "display-multiple-items": {
      type: Number,
      value: 1
    },
    "bindchange": {
      type: Function,
      value: () => null
    },
    "bindanimationfinish": {
      type: Function,
      value: () => null
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    props:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
