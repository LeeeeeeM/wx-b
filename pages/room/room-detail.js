const {Room} = require('../../utils/websocket')

Page({
    data: {
        list: [],
        detail: {

        },
        scrollTop: 0
    },

    onLoad(options) {
        const self = this
        const data = wx.getStorageSync('__roomInfo')
        self.setData({
            detail: data
        })

        self.getLastReply(data.roomid)

        self.room = new Room(data.roomid)

        self.room.then(self.dealReply) 

    },

    getLastReply(roomid) {
        const self = this
        wx.request({
            method: 'post',
            url: 'https://api.live.bilibili.com/ajax/msg',
            data: {
                roomid
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                const data = res.data.data.room
                const list = data.map(item => ({
                    text: item.text,
                    name: item.nickname
                }))
                self.setData({
                    list
                })
            },
            fail() {
            }
        })
    },

    dealReply(res) {
        const list = this.data.list.slice()
        list.push(res)
        this.setData({
            list
        })
    },

    onReady() {
        this.query = wx.createSelectorQuery().in(this).select('#replyBox')
    },

    onUnload() {
        this.room.destroy()
    },

    onShareAppMessage: function () {

    }
})