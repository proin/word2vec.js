var word2vec = require('../index.js');
var analyzer = word2vec.analyzer('./vectors/vector.txt');

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