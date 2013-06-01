/**
 * @constructor
 */
var ChannelImage = function() {
  /** @type {!(Array.<number>|Uint8Array)} */
  this.channel;
};

/**
 * @param {StreamReader} stream
 * @param {LayerRecord} layerRecord
 * @param {number} length
 */
ChannelImage.prototype.parse = function() { throw("abstract"); };

module.exports = ChannelImage;
