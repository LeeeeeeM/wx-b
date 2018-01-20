const util = require('../../utils/dealBdata')

Page({
    data: {
        hot: {},
        online: {}
    },
    onLoad() {
        this.getData(true)
    },
    getData(show) {
        var self = this
        if (show) {
            wx.showLoading({
                title: '(๑•̀ㅂ•́)و✧'
            })
        }
        wx.request({
            url: 'https://api.live.bilibili.com/index/refresh',
            method: 'get',
            data: {
              area: 'hot'
            },
            success(data) {
                const res = data.data.data
                const list = util.dealBdata(res.list).slice(0, 4).map(item => ({
                    ...item,
                    color: 'linear-gradient(45deg, #4c2369, #7093d6 80%, #b9a8f5)'
                }))
                const online = util.dealBdata(res.onlineList).slice(0, 4).map(item => ({
                    ...item,
                    color: 'linear-gradient(45deg, #4c2369, #7093d6 80%, #b9a8f5)'
                }))
                self.setData({
                    hot: {
                        list: list,
                        title: '热门主播',
                        count: res.count
                    },
                    online: {
                        list: online,
                        title: '在线主播'
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
    onRoomTap(e) {
        const data = e.currentTarget.dataset.alldata
        wx.setStorageSync('__roomInfo', data)
        wx.navigateTo({
            url: `/pages/room/room-detail?roomId=${data.roomid}`
        })
    },
    onPullDownRefresh() {
        this.getData()
    },
    toSearch() {
        wx.navigateTo({
            url: '/pages/search/search'
        })
    },
    toAll() {
        wx.navigateTo({
            url: '/pages/allrooms/allrooms'
        })
    }
})