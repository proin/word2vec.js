# word2vec.js
node.js version of `https://code.google.com/p/word2vec`

## Install
- `npm install word2vec.js`

## Usage

### Training

- training data
    - `http://mattmahoney.net/dc/text8.zip -O text8.gz`
- example
    ```javascript
    var word2vec = require('word2vec.js');
    
    word2vec.trainer({
        train: './data/text8',
        output: 'vector.txt',
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
    ```

### Analysis

- use word2vec.analyzer
    - analyzer.findVec(string)
    - analyzer.operator
        - vector1+vector2: analyzer.operator.sum(vector1, vector2)
        - vector1-vector2: analyzer.operator.sub(vector1, vector2)
        - distance: analyzer.operator.dist(vector1, vector2)
    - analyzer.findCousin(vector, size)
- example
    ```javascript
    var word2vec = require('word2vec.js');
    var analyzer = word2vec.analyzer('./vector.txt');
    
    // Find Word's Vector
    var king = analyzer.findVec('berlin');
    var man = analyzer.findVec('germany');
    var woman = analyzer.findVec('korea');
    
    // Vector Operation
    var op = analyzer.operator.sub(king, man);
    op = analyzer.operator.sum(op, woman);
    
    // Find Cousins
    var cousins = analyzer.findCousin(op, 10);
    console.log(cousins);
    ```