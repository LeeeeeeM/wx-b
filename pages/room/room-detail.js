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

        self.room = new Room(data.roomid)

        self.room.then(self.dealReply) 

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