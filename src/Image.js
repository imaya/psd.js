goog.provide('PSD.Image');

goog.scope(function() {

/**
 * @constructor
 */
PSD.Image = function() {
  /** @type {Array} */
  this.channel;
};

/**
 * @param {PSD.StreamReader} stream
 * @param {PSD.Header} header
 */
PSD.Image.prototype.parse = goog.abstractMethod;

// end of scope
});
