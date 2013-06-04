var fs = require('fs');
var AdditionalLayerInfo = require('../AdditionalLayerInfo');

AdditionalLayerInfo.EffectsLayer = {};

var effectsLayers = fs.readdirSync(__dirname + "/EffectsLayer");
for(var i = 0; i < effectsLayers.length; i++) {
  require('./EffectsLayer/' + effectsLayers[i]);
}
