var AdditionalLayerInfo = require('../AdditionalLayerInfo');

/**
 * @constructor
 */
AdditionalLayerInfo['lrFX'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.version;
  /** @type {number} */
  this.count;
  /** @type {Array.<Object>} */
  this.effect;
};

/**
 * @param {StreamReader} stream
 */
AdditionalLayerInfo['lrFX'].prototype.parse = function(stream) {
  /** @type {string} */
  var signature;
  /** @type {string} */
  var key;
  /** @type {{parse: function(StreamReader)}} */
  var effect;
  /** @type {number} */
  var i;

  this.offset = stream.tell();

  this.version = stream.readUint16();
  this.count = stream.readUint16();
  this.effect = [];

  for (i = 0; i < this.count; ++i) {
    // signature
    signature = stream.readString(4);
    if (signature !== '8BIM') {
      console.log('invalid signature:', signature);
      break;
    }

    this.key = key = stream.readString(4);
    if (typeof AdditionalLayerInfo.EffectsLayer[this.key] === 'function') {
      effect = new (AdditionalLayerInfo.EffectsLayer[this.key])();
      effect.parse(stream);
      this.effect[i] = {
        key: key,
        effect: effect
      };
    } else {
      console.log('detect unknown key:', key);
      break;
    }
  }

  this.length = stream.tell() - this.offset;
};
