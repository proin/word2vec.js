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
        - output like this
            ```javascript
            [ { key: 'korea', dist: '0.771689' },
              { key: 'beijing', dist: '0.576056' },
              { key: 'seoul', dist: '0.564867' },
              { key: 'korean', dist: '0.562586' },
              { key: 'chungcheong', dist: '0.529448' },
              { key: 'dae', dist: '0.502329' },
              { key: 'vietnamese', dist: '0.497823' },
              { key: 'berlin', dist: '0.487074' },
              { key: 'chung', dist: '0.484467' },
              { key: 'gyeonggi', dist: '0.482213' } ]
              
            ```
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