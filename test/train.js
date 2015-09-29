var word2vec = require('../index.js');

word2vec.trainer({
    train: './data/text8',
    output: './vector/vector.txt',
    on: function (log) {
        process.stdout.write(log);
    },
    done: function () {
        console.log('finish');
    },
    error: function (err) {
        console.log(err);
    }
});