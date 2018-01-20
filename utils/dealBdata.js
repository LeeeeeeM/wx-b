var dealBdata = function(res) {
    if (type(res, 'array')) {
        for (var k = res.length; k > 0; k--) {
            if (!res[k] && res[k] !== 0) {
                res.splice(k, 1);
            }
        }
    }
    return res;
}

var type = function(o, type) {
    return Object.prototype.toString.call(o).slice(8, -1).toLowerCase() === type;
}

module.exports = {
    dealBdata: dealBdata
};