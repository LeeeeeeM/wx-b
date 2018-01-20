let touchPosition = []

const touchStart = function(e) {
    if (e.changedTouches.length === 1 && e.touches.length === 1) {
        touchPosition.push({
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        })
    }
}

const touchEnd = function(e, p1, p2) {
    let direction
    if (e.changedTouches.length === 1 && e.touches.length === 0) {
        touchPosition.push({
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        })
    }
    if (touchPosition.length === 2) {
        direction = touchPosition[1].x - touchPosition[0].x < 0 ? 0 : 1
        touchPosition = []
        wx.redirectTo({
            url: '/pages/portal/portal'
        })
    }
}