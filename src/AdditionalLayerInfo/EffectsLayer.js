var fs = require('fs');
var AdditionalLayerInfo = require('../AdditionalLayerInfo');

AdditionalLayerInfo.EffectsLayer = {};

var layers = fs.readdirSync(__dirname + "/EffectsLayer");
for(var i = 0; i < layers.length; i++) {
  require('./EffectsLayer/' + layers[i]);
}
