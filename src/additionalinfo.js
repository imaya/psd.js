goog.provide('PSD.AdditionalLayerInfo');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {string} */
  this.signature;
  /** @type {string} */
  this.key;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.data;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo.prototype.parse = function(stream) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();
  this.signature = stream.readString(4);
  this.key = stream.readString(4);
  length = stream.readUint32();
  this.length = length + 12;

  this.data = stream.read(length);

  // TODO
  switch (this.key) {
    case 'luni':
    case 'lyid':
    case 'clbl':
    case 'infx':
    case 'knko':
    case 'lspf':
    case 'lclr':
    case 'fxrp':
    case 'lfx2':
      break;
    default:
      //goog.global.console.warn('unknown additional layer info: ' + this.key);
  }
};

// end of scope
});
