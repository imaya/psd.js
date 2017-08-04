/**
 * @constructor
 */
var Image = function() {
  /** @type {Array} */
  this.channel;
};

/**
 * @param {StreamReader} stream
 * @param {Header} header
 */
Image.prototype.parse = function() { throw("abstract"); };

module.exports = Image;
