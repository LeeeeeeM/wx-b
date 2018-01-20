var util = require('../../utils/dealBdata')

Page({
    data: {
        list: []
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
              area: 'all'
            },
            success: function(data) {
                const res = data.data.data
                const result = []
                for (const k in res) {
                    if (res[k].tagList) {
                        result.push({
                            title: res[k].tagList.join('、'),
                            list: util.dealBdata(res[k].list).map(item => ({
                                ...item,
                                color: 'linear-gradient(45deg, #4c2369, #7093d6 80%, #b9a8f5)'
                            }))
                        })
                    }
                }
                self.setData({
                    list: result
                })
            },
            fail: function() {

            },
            complete: function() {
                if (show) {
                    wx.hideLoading()
                }
                wx.stopPullDownRefresh()
            }
        });
    },
    onRoomTap(e) {
        const data = e.currentTarget.dataset.alldata
        wx.setStorageSync('__roomInfo', data)
        wx.navigateTo({
            url: `/pages/room/room-detail?roomId=${data.roomid}`
        })
    },
    onPullDownRefresh: function () {
        this.getData()
    }
})