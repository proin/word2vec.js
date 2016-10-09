var m = function (source) {
    var fs = require('fs');

    // load data
    var data = fs.readFileSync(source) + '';
    data = data.split('\n');

    // vector operation
    var dist = function (a, b) {
        var result = 0;
        for (var i = 0; i < a.length; i++)
            result += a[i] * b[i];
        return result.toFixed(6);
    };

    var add = function (a, b) {
        var d = [];
        for (var i = 0; i < a.length; i++) {
            var p = parseFloat(a[i]) + parseFloat(b[i]);
            d.push(p.toFixed(6));
        }

        return d;
    };

    var del = function (a, b) {
        var d = [];
        for (var i = 0; i < a.length; i++) {
            var p = parseFloat(a[i]) - parseFloat(b[i]);
            d.push(p.toFixed(6));
        }

        return d;
    };

    // find word vector
    var findVec = function (word) {
        for (var i in data)
            if (data[i].split(' ')[0] == word)
                return JSON.parse(data[i].split(' ')[1]);
        return null;
    };

    // find cousin
    var findCousin = function (wordVec, size) {
        var sorted = [];
        for (var i in data) {
            if (typeof data[i] == 'function') continue;
            sorted.push({key: data[i].split(' ')[0], dist: dist(wordVec, JSON.parse(data[i].split(' ')[1]))});
            sorted.sort(function (a, b) {
                return b.dist - a.dist;
            });
            if (sorted.length > size + 1) sorted = sorted.splice(0, size + 1);
        }

        sorted = sorted.splice(0, size);
        return sorted;
    };

    this.findVec = findVec;
    this.findCousin = findCousin;
    this.operator = {
        sum: add,
        sub: del,
        dist: dist
    };
    return this;
};

exports = module.exports = m;