var fs = require('fs')
var Parser = require('../src/Parser');

var data = fs.readFileSync(__dirname + '/../testdata/simple.psd');

var parser = new Parser(data);
parser.parse();

var resources = {};
for(var i = 0; i < parser.imageResources.imageResources.length; i++) {
  resources[parser.imageResources.imageResources[i].identifier] = parser.imageResources.imageResources[i];
}
console.log(JSON.stringify(resources['1050'], null, 2));
