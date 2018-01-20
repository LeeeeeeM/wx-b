const util = require('../../utils/dealBdata')

Page({
    data: {
        hot: {},
        searchList: [],
        query: ''
    },

    onLoad(options) {
        this.getData(true)
    },

    bindKeyInput(e) {
        this.setData({
            query: e.detail.value
        })
    },

    getData(show) {
        var self = this
        if (show) {
            wx.showLoading({
                title: '(๑•̀ㅂ•́)و✧'
            })
        }
        const sList = ['subject', 'hot', 'sing-dance', 'ent-life', 'draw', 'otaku', 'single', 'online', 'e-sports', 'mobile-game', 'movie']
        const item = sList[Math.floor(Math.random() * sList.length)]

        wx.request({
            url: 'https://api.live.bilibili.com/index/refresh',
            method: 'get',
            data: {
                area: item
            },
            success(data) {
                const res = data.data.data
                const list = util.dealBdata(res.list).slice(0, 6).map(item => ({
                    ...item,
                    color: 'linear-gradient(45deg, #4c2369, #7093d6 80%, #b9a8f5)'
                }))
                const online = util.dealBdata(res.onlineList).slice(0, 6).map(item => ({
                    ...item,
                    color: 'linear-gradient(45deg, #4c2369, #7093d6 80%, #b9a8f5)'
                }))
                self.setData({
                    hot: {
                        list: list,
                        title: '推荐主播',
                        count: res.count
                    }
                })
            },
            fail() {

            },
            complete() {
                if (show) {
                    wx.hideLoading()
                }
                wx.stopPullDownRefresh()
            }
        })
    },

    onReady() {

    },

    searchRoom() {
        if (!this.data.query.trim()) {
            wx.showToast({
                title: 'emmmmm...给我内容呀,坟蛋',
                icon: 'none'
            })
            return
        }
        var self = this
        wx.showLoading({
            title: '(๑•̀ㅂ•́)و✧'
        })
        wx.request({
            url: 'https://api.energys.cn/room/search',
            data: {
                kw: this.data.query
            },
            success(res) {
                const list = res.data.data.map(item => ({
                    ...item,
                    roomid: Number(item.roomid),
                    user_cover: item.face,
                    color: 'linear-gradient(45deg, #4c2369, #7093d6 80%, #b9a8f5)'
                }))
                self.setData({
                    searchList: list
                })
            },
            fail() {
            },
            complete() {
                wx.hideLoading()
            }
        })
    },

    onUnload() {

    },

    onPullDownRefresh() {
        this.setData({
            query: '',
            searchList: []
        })
        this.getData()
    },
    onShareAppMessage() {

    },
    onRoomTap(e) {
        const data = e.currentTarget.dataset.alldata
        wx.setStorageSync('__roomInfo', data)
        wx.navigateTo({
            url: `/pages/room/room-detail?roomId=${data.roomid}`
        })
    }
})