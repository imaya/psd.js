goog.provide('PSD.ChannelImage');

goog.scope(function() {

/**
 * @constructor
 */
PSD.ChannelImage = function() {
  /** @type {!(Array.<number>|Uint8Array)} */
  this.channel;
};

/**
 * @param {PSD.StreamReader} stream
 * @param {PSD.LayerRecord} layerRecord
 * @param {number} length
 */
PSD.ChannelImage.prototype.parse = goog.abstractMethod;

// end of scope
});
